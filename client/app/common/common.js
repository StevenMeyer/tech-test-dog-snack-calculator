import angular from 'angular';
import Navbar from './navbar/navbar';
import walkModule from './walk/walk.service';

let commonModule = angular.module('app.common', [
  Navbar,
  walkModule
])

.name;

export default commonModule;
