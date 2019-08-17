import angular from 'angular';
import uiRouter from 'angular-ui-router';
import walkComponent from './walk.component';
import walkServiceModule from '../../common/walk/walk.service';

let walkModule = angular.module('walk', [
  uiRouter,
  walkServiceModule
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');
  $stateProvider.state('walk', {
    bindings: {
      id: '@',
      name: '@'
    },
    component: 'walk',
    params: {
      name: ''
    },
    resolve: {
      id: ($transition$) => {
        return $transition$.params().id;
      },
      name: ($transition$, id) => {
        const params = $transition$.params();
        return params.name || `Walk ${id}`;
      }
    },
    url: '/walk/{id}'
  })
})

.component('walk', walkComponent)

.name;

export default walkModule;
