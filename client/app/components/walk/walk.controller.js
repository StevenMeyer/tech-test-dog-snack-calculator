class WalkController {
  get hasData() {
    return this.locations.length > 0;
  }

  constructor(walkService, NgMap) {
    // id and name will be set automatically from the bindings by the time
    // $onInit() is called
    this.id = undefined;
    this.name = undefined;
    this.centre = {
      latitude: 51.5174521,
      longitude: -0.121618
    };
    this.googleMapsURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBp7-48qKl3mat1o4U5zDMP_oLwY2alq8M';
    this.loaded = false;
    this.walkService = walkService;
    this.ngMapProvider = NgMap;
    this.locations = [];
    this.waypoints = [];
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
      const makeLocation = (location) => {
        return {
          lat: location.latitude,
          lng: location.longitude
        }
      };
      this.name = result.name;
      this.locations = result.locations;
      this.snacks = WalkController.calculateSnacks(this.locations);
      if (this.locations.length > 0) {
        this.waypoints = this.locations.map((location) => {
          return makeLocation(location);
        });
      }
      return this.ngMapProvider.getMap();
    }).then((map) => {
      const bounds = new google.maps.LatLngBounds();
      this.waypoints.forEach((waypoint) => {
        bounds.extend(waypoint);
      });
      // this is hard to test. Given more time I'd find the right hook
      setTimeout(() => {
        map.fitBounds(bounds);
      });
      this.loaded = true;
    }).catch(() => {
      this.loaded = true;
    });
  }
}

export default WalkController;
