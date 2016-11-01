(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrowCtl = this;
        narrowCtl.getFoundItems = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function(data) {
                    narrowCtl.foundItems = data;
                }).catch(function(error) {
                });
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        return {
            getMatchedMenuItems: function(searchTerm) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                }).then(function(result) {
                    var menuItems = result.data.menu_items;
                    var foundItems = [];
                    var item;
                    for (var index = 0; index < menuItems.length; ++index) {
                        item = menuItems[index];
                        if (item.description.indexOf(searchTerm) >= 0) {
                            foundItems.push(item);
                        }
                    }
                  return foundItems;
                });
            }
        }
    }

})();
