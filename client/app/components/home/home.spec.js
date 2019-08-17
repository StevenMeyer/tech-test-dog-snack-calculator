import HomeModule from './home'

describe('Home', () => {
  let $httpBackend, $rootScope, $state, $location, ctrl, $compile;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($componentController, _$rootScope_, _$state_, _$location_, _$compile_, _$httpBackend_) => {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    ctrl = $componentController;
    $state = _$state_;
    $location = _$location_;
    $compile = _$compile_;

    $httpBackend.expectGET('https://infinite-lake-80504.herokuapp.com/api/routes')
        .respond([
          {
            id: 1,
            name: "Walk A"
          },
          {
            id: 2,
            name: "Walk B"
          },
          {
            id: 3,
            name: "Walk C"
          }
        ]);
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).to.eq('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = ctrl('home', {
        $scope: $rootScope.$new()
      });
    });

    it('has a walks property', () => {
      expect(controller.walks).to.eql([]);
    });

    it('populates the walks from the server', () => {
      controller.$onInit();
      $httpBackend.flush();
      expect(controller.walks).to.have.deep.property('[0].id', 1);
      expect(controller.walks).to.have.deep.property('[0].name', 'Walk A');
      expect(controller.walks).to.have.deep.property('[1].id', 2);
      expect(controller.walks).to.have.deep.property('[1].name', 'Walk B');
      expect(controller.walks).to.have.deep.property('[2].id', 3);
      expect(controller.walks).to.have.deep.property('[2].name', 'Walk C');
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<home></home>')(scope);
      $httpBackend.flush();
      scope.$digest();
    });

    it('has title in template', () => {
      expect(template.find('h1').html()).to.eq('Dog Snack Calculator');
    });

    it('has a list of walks', () => {
      expect(template.find('li').length).to.eq(3);
    });
  });
});
