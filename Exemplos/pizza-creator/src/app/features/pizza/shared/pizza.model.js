'use strict';

var pizzaTypes = {
    big: 'big',
    medium: 'medium',
    small: 'small',
};

var pizzaToppings = {
    bacon: 'bacon',
    tomato: 'tomato',
    pepperoni: 'pepperoni',
    onion: 'onion',
    chili: 'chili',
    olive: 'olive',
    sweetcorn: 'sweetcorn',
    pepper: 'pepper',
};

var pizzaToppingsUnitPrices = {
    small: 0.69,
    medium: 0.99,
    big: 1.99,
};

var pizzaPrices = {
    small: 9.99,
    medium: 12.99,
    big: 16.99,
};

function Pizza() {
    var self = this;

    initialize();

    function initialize() {
        self.type = pizzaTypes.small;
        self.toppings = [];
        self.total = 0;
        self.customer = null;
    }

    self.calculateTotal = function () {
        var toppingsUnitPrice = self.getToppingsUnitPrice();
        var pizzaSizePrice = self.getPizzaSizePrice();
        self.total = pizzaSizePrice + (toppingsUnitPrice * self.toppings.length);
        self.total = self.total.toFixed(2);
        return self.total;
    }

    self.getToppingsUnitPrice = function () {
        switch (self.type) {
            case pizzaTypes.small:
                return pizzaToppingsUnitPrices.small;
            case pizzaTypes.medium:
                return pizzaToppingsUnitPrices.medium;
            case pizzaTypes.big:
                return pizzaToppingsUnitPrices.big;
        }
    }

    self.getPizzaSizePrice = function () {
        switch (self.type) {
            case pizzaTypes.small:
                return pizzaPrices.small;
            case pizzaTypes.medium:
                return pizzaPrices.medium;
            case pizzaTypes.big:
                return pizzaPrices.big;
        }
    }
};