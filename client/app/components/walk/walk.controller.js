class WalkController {
  get hasData() {
    return this.locations.length > 0;
  }

  constructor($scope, walkService) {
    // using $scope like this doesn't seem right and given more time I'd figure
    // out the proper way to do this
    // TODO: get these $resolve properties without reaching out of our isolated
    //  scope
    this.id = $scope.$parent.$resolve.id;
    this.name = $scope.$parent.$resolve.name;
    this.loaded = false;
    this.walkService = walkService;
    this.locations = [];
    this.snacks = WalkController.calculateSnacks(this.locations);
  }

  static calculateSnacks(locations) {
    // since Newton can store the energy he uses when going downhill to go
    // uphill, and moving along level ground consumes no energy, the only energy
    // that must be put into the system (Newton) is for the climb difference
    // between the starting point and the highest point on the walk
    if (locations.length > 0) {
      const startAltitude = locations[0].altitude;
      const greatestAltitude = locations.reduce((max, currentWayPoint) => {
        return currentWayPoint.altitude > max ? currentWayPoint.altitude : max;
      }, 0);
      const maxHeightAboveStart = greatestAltitude - startAltitude;
      return maxHeightAboveStart > 0 ? maxHeightAboveStart : 0;
    } else {
      return 0;
    }
  }

  $onInit() {
    return this.walkService.get({
      id: this.id
    }).$promise.then((result) => {
      this.name = result.name;
      this.locations = result.locations;
      this.snacks = WalkController.calculateSnacks(this.locations);
      this.loaded = true;
    }).catch(() => {
      this.loaded = true;
    });
  }
}

export default WalkController;
