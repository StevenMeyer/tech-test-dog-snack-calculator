class WalkController {
  constructor($scope) {
    // using $scope like this doesn't seem right and given more time I'd figure
    // out the proper way to do this
    // TODO: get these $resolve properties without reaching out of our isolated
    //  scope
    this.id = $scope.$parent.$resolve.id;
    this.name = $scope.$parent.$resolve.name;
    this.locations = [
      {
        altitude: 10,
        latitude: 51.51973438454002,
        longitude: -0.1222349703313059
      },
      {
        altitude: 0,
        latitude: 51.51975093879879,
        longitude: -0.1222902908922381
      },
      {
        altitude: 6,
        latitude: 51.51968937371999,
        longitude: -0.1225241459907242
      },
      {
        altitude: 15,
        latitude: 51.51955128186523,
        longitude: -0.1227341126651715
      },
      {
        altitude: 8,
        latitude: 51.51940237735539,
        longitude: -0.1229298301042271
      }
    ];
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
}

export default WalkController;
