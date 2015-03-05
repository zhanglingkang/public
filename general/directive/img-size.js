"use strict";

define(function (require, exports, module) {
    var app = require("app");
    var validationUtil = require("public/general/form-validation");
    app.directive("imgSize", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, elem, attrs, ngModelController) {
                var $elem = $(elem);
                scope.$watch(attrs.ngModel, function (file) {
                    if (file) {
                        if (file.type.indexOf("image") !== -1) {
                            var image = new Image();
                            var reader = new FileReader();
                            image.onload = function () {
                                var imgWidth = image.naturalWidth;
                                var imgHeight = image.naturalHeight;
                                var realImgSize = imgWidth + "*" + imgHeight;
                                scope.$apply(function () {
                                    if (realImgSize !== attrs["imgSize"].trim()) {
                                        ngModelController.$setValidity("imgSize", false);
                                    } else {
                                        ngModelController.$setValidity("imgSize", true);
                                    }
                                });
                            };
                            reader.addEventListener('load', function (evt) {
                                image.src = evt.target.result;
                            });
                            reader.readAsDataURL(file);
                        }
                    } else {
                        ngModelController.$setValidity("imgSize", true);
                    }
                });
            }
        };
    });
});