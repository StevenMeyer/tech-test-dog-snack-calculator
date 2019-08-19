import angular from 'angular';
import Home from './home/home';
import Walk from './walk/walk';

let componentModule = angular.module('app.components', [
  Home,
  Walk
])

.name;

export default componentModule;
