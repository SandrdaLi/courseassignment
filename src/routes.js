(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.template.html'
        })

        // Categories
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categoriesList.template.html',
            controller: 'CategoriesController',
            controllerAs: "categories",
            resolve: {
                items: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('categories.itemDetail', {
            url: '/item-detail/{itemId}',
            templateUrl: 'src/templates/items.template.html',
            controller: "ItemDetailController as itemDetail",
            resolve: {
                items: ['$stateParams', 'MenuDataService',
                    function($stateParams, MenuDataService) {
                      return MenuDataService.getItemsForCategory($stateParams.itemId);
                    }
                ]
            }
        });
    }

})();
