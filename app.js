(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('menuList', MenuListDirective);

    function MenuListDirective() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: MenuListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }


    function MenuListDirectiveController() {
        var list = this;
        list.nothingFound = function() {
            if (!list.items) {
                return false;
            } else if (list.items.length === 0) {
                return true;
            }
            return false;
        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrowCtl = this;

        narrowCtl.getFoundItems = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function(data) {
                    narrowCtl.foundItems = data;
                });
        };

        narrowCtl.removeItem = function(itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                var menuItems = result.data.menu_items;
                var item;
                foundItems = [];
                if (searchTerm) {
                    for (var index = 0; index < menuItems.length; ++index) {
                        item = menuItems[index];
                        if (item.description.indexOf(searchTerm) >= 0) {
                            foundItems.push(item);
                        }
                    }
                }
                return foundItems;
            });
        };

        service.removeItem = function(itemIdex) {
            if (foundItems) {
                foundItems.splice(itemIdex, 1);
            }
        };
    }


})();
