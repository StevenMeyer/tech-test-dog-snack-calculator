import template from './walk.html';
import controller from './walk.controller';
import './walk.scss';

let walkComponent = {
  bindings: {},
  template,
  controller: ['$scope', controller]
};

export default walkComponent;
