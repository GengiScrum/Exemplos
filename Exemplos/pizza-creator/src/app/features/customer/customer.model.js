'use strict';
function Customer() {
    var self = this;

    initialize();
    function initialize() {
        self.name = '';
        self.email = '';
        self.address = '';
        self.postalCode = '';
        self.contactNumber = '';
    }

    self.validate = function () {
        if (!self.name)
            return false;
        if (!self.email)
            return false;
        if (!self.address)
            return false;
        if (!self.postalCode)
            return false;
        if (!self.contactNumber)
            return false;
        return true;
    }
}