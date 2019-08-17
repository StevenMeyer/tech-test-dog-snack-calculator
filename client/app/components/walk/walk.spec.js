import WalkModule from './walk';
import WalkController from './walk.controller';
import WalkComponent from './walk.component';
import WalkTemplate from './walk.html';

describe('Walk', () => {
  let $rootScope, $state, $location, makeController;
  let $scope;

  beforeEach(window.module(WalkModule));
  beforeEach(inject(($injector) => {
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    $scope = {
      $parent: {
        $resolve: {}
      }
    };
    makeController = () => {
      return new WalkController($scope);
    };
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
