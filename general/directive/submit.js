"use strict"

define(function (require, exports, module) {
    var app = require("app")
    var system = require("public/local/system")
    app.directive("validSubmit", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem)
                $elem.on("submit", function () {
                    if (scope[attrs.name].$valid) {
                        scope.$eval(attrs.validSubmit)
                    }
                })
            }
        }
    })
})