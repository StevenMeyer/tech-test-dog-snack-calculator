class HomeController {
  get hasWalks() {
    return !this.loaded || this.walks.length > 0;
  }

  constructor(WalkService) {
    this.loaded = false;
    this.walks = [];
    this.walkService = WalkService;
  }

  $onInit() {
    this.walks = this.walkService.query();
    this.walks.$promise.then(() => {
      this.loaded = true;
    }, () => {
      this.loaded = true;
    })
  }
}

export default HomeController;
