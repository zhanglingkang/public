"use strict";

define(function (require, exports, module) {
    var app = require("app");
    var validationUtil = require("public/general/form-validation");
    app.directive("fileRequired", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelController) {
                var $elem = $(elem);
                scope.$watch(attrs.ngModel, function (file) {
                    if (file) {
                        ngModelController.$setValidity("required", true);
                    } else {
                        ngModelController.$setValidity("required", false);
                    }
                });
            }
        };
    });
});