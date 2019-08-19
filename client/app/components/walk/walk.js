import angular from 'angular';
import uiRouter from 'angular-ui-router';
import walkComponent from './walk.component';
import walkServiceModule from '../../common/walk/walk.service';
import ngMap from 'ngMap';

let walkModule = angular.module('walk', [
  uiRouter,
  walkServiceModule,
  ngMap
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');
  $stateProvider.state('walk', {
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
