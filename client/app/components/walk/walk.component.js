import template from './walk.html';
import controller from './walk.controller';
import './walk.scss';

let walkComponent = {
  bindings: {
    id: '@',
    name: '@'
  },
  template,
  controller: ['WalkService', 'NgMap', controller]
};

export default walkComponent;
