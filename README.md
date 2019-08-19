# AngularJS Technical Test

See the test running at the project's [GitHub pages](https://stevenmeyer.github.io/tech-test-dog-snack-calculator/)

## Table of Contents
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Issues](#issues)
- [Running the Solution / Getting Started](#running-the-solution--getting-started)
  - [Dependencies](#dependencies)
  - [Installing](#installing)
  - [Running](#running-the-app)
    - [Testing](#testing)

## The Problem
You're a developer at an awesome pet startup and the CEO has asked you to help him build a program that will calculate how many dog snacks he needs to take with him when walking his dog, Newton, around London. 

Newton is very snack driven, so for every metre you go uphill, he must be given one snack. However, for every metre you go downhill, the dog can store that momentum to eventually walk back up one metre uphill. Walking on even ground requires no snacks because he just kinda glides along. (Newton is a bit weird and defies some laws of physics.) You can assume that the dog starts immediately at the first point in the route and that no snacks are required to bring the dog to the starting point.

To complete this test, we are providing the following REST endpoints:

- retrieve a list of walking routes

- retrieve the detailed walking route specifying the ID

Each 3D point is an object of 3 items, with the following values: "latitude, longitude and altitude". Every route is guaranteed to have at least one point and can contain up to 100.

Also, to simplify the test, the altitude will always be an integer.

Given walking routes as an array of 3D points, build a mini-site (preferably in AngularJS v1) that:

- on the home view, displays a list of walking routes that link to a specific walk route view

- calculates and displays how many dog snacks are needed on the specific walk route view

- displays the dog walk route using google maps on the specific walk route view

- allows users to directly view a specific walking route via a URL

## The Solution
### Bootstrapping
I used an AngularJS starter from [NG6 Starter](https://github.com/PatrickJS/NG6-starter) by PatrickJS to give me a build environment ready to go with ES6, testing, SASS, component generation and a file structure.

I've additionally included angular-resource and [ngMap](https://github.com/allenhwkim/angularjs-google-maps).

### Snacks
To solve the snack problem, it is clear that Newton only needs a snack for every unit of altitude that he ascends above his starting altitude. Therefore, the number of snacks is equal to the difference between the starting altitude and the highest altitude on the route. Calculating the snacks in this way means that we don't have to "walk" the route in the code, keeping track of Newtons potential energy.

### Routing
The NG6 Starter includes angular-ui-router, so I've used that. When navigating from the list of walks to a specific walk, the walk name is passed though the routing to be used on the specific walk view so as not to be dependent on downloading the walk information. If the specific walk view is accessed directly via its URL, it will display `Walk {walkID}` whilst it fetches the actual name from the API.

The files relevant to the test are in the `client\app` folder. Much of the remaining files are bootstrapping.

## Issues
The map usually shows the error
> This page can't load Google Maps correctly

I don't know whether the account associated with the supplied API key has exceeded it's request quota (as the error would suggest) or whether the API key is not being used correctly. The key is being sent with the request.

## Running the Solution / Getting Started
###Dependencies
Tools needed to run this app:
- `node` and `npm`

The node version used for development is `lts/carbon (v8.16.1)`. The version is recorded in the `.nvmrc` file.

### Installing
- `npm install`

### Running the App
#### Tasks
- `npm start`


#### Testing
Yes, it is unit tested!
- `npm test`

