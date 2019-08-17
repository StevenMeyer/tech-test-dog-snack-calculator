import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import walkModule from './walk/walk.service';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User,
  walkModule
])

.name;

export default commonModule;
