import WalkModule from './walk';
import WalkController from './walk.controller';
import WalkComponent from './walk.component';
import WalkTemplate from './walk.html';

describe('Walk', () => {
  let $rootScope, $state, $location, $httpBackend, makeController;
  let $scope;

  beforeEach(window.module(WalkModule));
  beforeEach(inject(($componentController, _$rootScope_, _$location_, _$state_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $scope = {
      $parent: {
        $resolve: {}
      }
    };
    makeController = () => {
      const scope = Object.assign({}, $rootScope.$new(), $scope);
      return $componentController('walk', {
        $scope: scope
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
    it('has an ID set from the route params', () => {
      $scope.$parent.$resolve.id = '42';
      let controller = makeController();
      expect(controller.id).to.eq('42');
    });

    it('has a name set from the route params', () => {
      $scope.$parent.$resolve.name = 'Walk Your Socks Off';
      let controller = makeController();
      expect(controller.name).to.eq('Walk Your Socks Off');
    });

    it('has a snack count (set to 0 initially)', () => {
      let controller = makeController();
      expect(controller.snacks).to.eq(0);
    });

    it('populates the snacks from the server', () => {
      $scope.$parent.$resolve.id = '42';
      let controller = makeController();
      const promise = new Promise((resolve) => {
        controller.$onInit().then(resolve);
      }).then(() => {
        expect(controller.snacks).to.eq(5);
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
