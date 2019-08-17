import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Walk from './walk/walk';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Walk
])

.name;

export default componentModule;
