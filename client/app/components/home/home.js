import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import walkModule from '../../common/walk/walk.service';

let homeModule = angular.module('home', [
  uiRouter,
  walkModule
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', homeComponent)

.name;

export default homeModule;
