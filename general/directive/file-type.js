"use strict";

define(function (require, exports, module) {
    var app = require("app");
    app.directive("fileType", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelController) {
                var $elem = $(elem);
                scope.$watch(attrs.ngModel, function (file) {
                    if (file) {
                        if (file.type.indexOf(attrs.fileType) === -1) {
                            ngModelController.$setValidity("fileType", false);
                        } else {
                            ngModelController.$setValidity("fileType", true);
                        }
                    } else {
                        ngModelController.$setValidity("fileType", true);
                    }
                });
            }
        };
    });
});