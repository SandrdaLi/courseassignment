(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ShoppingListBuyController', ShoppingListBuyController)
        .controller('ShoppingListBoughtController', ShoppingListBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ShoppingListBuyController.$inject = ['ShoppingListCheckOffService'];

    function ShoppingListBuyController(ShoppingListCheckOffService) {
        var ToBuyController = this;
        ToBuyController.items = ShoppingListCheckOffService.getShoppingList();

        ToBuyController.buyItem = function(itemIndex) {
            console.log("itemIndex: ", itemIndex);
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    ShoppingListBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ShoppingListBoughtController(ShoppingListCheckOffService) {
        var AlreadyBoughtController = this;
        AlreadyBoughtController.items = ShoppingListCheckOffService.getShoppedList();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of to buy items
        var shoppingList = [{
            name: "Cookies",
            quantity: 10
        }, {
            name: "Cake",
            quantity: 1
        }, {
            name: "Donuts",
            quantity: 12
        }, {
            name: "Eggs",
            quantity: 24
        }, {
            name: "Tomatos",
            quantity: 5
        }, {
            name: "Butter",
            quantity: 2
        }];
        // List of bought items
        var shoppedList = [];

        service.buyItem = function(itemIdex) {
            console.log("itemIdex: ", itemIdex);
            shoppedList.push(shoppingList[itemIdex]);
            shoppingList.splice(itemIdex, 1);
        };

        service.getShoppingList = function() {
            return shoppingList;
        };

        service.getShoppedList = function() {
            return shoppedList;
        };
    }

})();
