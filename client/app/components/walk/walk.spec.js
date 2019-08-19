import WalkModule from './walk';
import WalkController from './walk.controller';
import WalkComponent from './walk.component';
import WalkTemplate from './walk.html';

describe('Walk', () => {
  let $rootScope, $state, $location, $httpBackend, makeController;

  beforeEach(window.module(WalkModule, function ($provide) {
    $provide.provider('MockNgMap', function () {
      this.$get = function () {
        return {
          getMap: () => {
            return new Promise.resolve();
          }
        }
      }
    });

    $provide.provider('NgMap', function () {
      this.$get = function (MockNgMap) {
        return {
          getMap: () => {
            return MockNgMap.getMap();
          }
        }
      }
    })
  }));
  beforeEach(inject(($componentController, _$rootScope_, _$location_, _$state_, _$httpBackend_, NgMap) => {
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    makeController = () => {
      return $componentController('walk', {
        $scope: $rootScope.$new(),
        NgMap
      });
    };

    $httpBackend.expectGET('https://infinite-lake-80504.herokuapp.com/api/routes/42')
        .respond({
          id: 42,
          name: "Walk A",
          locations: [
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
          ]
        });
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be the walk component', () => {
      $location.url('/walk/1');
      $rootScope.$digest();
      expect($state.current.component).to.eq('walk');
    });
  });

  describe('Controller', () => {
    // controller specs
    it('has a snack count (set to 0 initially)', () => {
      let controller = makeController();
      expect(controller.snacks).to.eq(0);
    });

    it('populates the walk name from the server', () => {
      let controller = makeController();
      controller.id = '42';
      const promise = new Promise((resolve) => {
        controller.$onInit().then(resolve);
      }).then(() => {
        expect(controller.name).to.eq('Walk A');
      });
      $httpBackend.flush();
      return promise;
    });

    it('populates the snacks from the server', () => {
      let controller = makeController();
      controller.id = '42';
      const promise = new Promise((resolve) => {
        controller.$onInit().then(resolve);
      }).then(() => {
        expect(controller.snacks).to.eq(5);
      });
      $httpBackend.flush();
      return promise;
    });

    it('populates the waypoints from the server', () => {
      let controller = makeController();
      controller.id = '42';
      const promise = new Promise((resolve) => {
        controller.$onInit().then(resolve);
      }).then(() => {
        expect(controller.waypoints.length).to.eq(5);
        expect(controller.waypoints).to.have.deep.property('[0].lat', 51.51973438454002);
        expect(controller.waypoints).to.have.deep.property('[0].lng', -0.1222349703313059);
      });
      $httpBackend.flush();
      return promise;
    });

    describe('calculateSnacks', () => {
      /**
       * @param {number[]} altitudes
       */
      function makeRoute(altitudes) {
        return altitudes.map((altitude) => {
          return {altitude};
        });
      }
      it('calculates the difference between the start altitude and the highest altitude', () => {
        let route = makeRoute([10, 5, 9, 15, 11, 16]);
        let snacks = WalkController.calculateSnacks(route);
        expect(snacks).to.eq(6);

        route = makeRoute([10, 5, 9, 15, 11, 0]);
        snacks = WalkController.calculateSnacks(route);
        expect(snacks).to.eq(5);

        route = makeRoute([10, 5, 9, 8, 0, 10]);
        snacks = WalkController.calculateSnacks(route);
        expect(snacks).to.eq(0);
      });

      it('returns zero when the start altitude is the highest altitude (no negative snacks)', () => {
        let route = makeRoute([10, 5, 9, 6]);
        let snacks = WalkController.calculateSnacks(route);
        expect(snacks).to.eq(0);
      });

      it('works with negative altitudes', () => {
        let route = makeRoute([-1, 5, 9, -3]);
        let snacks = WalkController.calculateSnacks(route);
        expect(snacks).to.eq(10);
      });
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has walk name in template', () => {
      expect(WalkTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });

    it('has the snack count in the template', () => {
      expect(WalkTemplate).to.match(/{{\s?\$ctrl\.snacks\s?/g)
    })
  });

  describe('Component', () => {
    // component/directive specs
    let component = WalkComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(WalkTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.contain(WalkController);
    });
  });
});
