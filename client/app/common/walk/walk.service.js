import ngResource from 'angular-resource';

const walkModule = angular.module('common.walk', [ngResource]).

factory('WalkService', ['$resource',
  function($resource) {
    return $resource(
      'https://infinite-lake-80504.herokuapp.com/api/routes/:id',
       {},
       {
        query: {
          method: 'GET',
          params: {id: ''},
          isArray: true
        }
      }
    );
  }
]).

name;

export default walkModule;
