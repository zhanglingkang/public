"use strict";

define(function (require, exports, module) {
    var app = require("app");
    var util = require("public/general/util");
    app.directive("ngModel", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem);
                if ($elem[0].nodeName === "INPUT" && $elem.attr("type") === "file") {
                    $elem.bind("change", function () {
                        scope.$apply(function () {
                            var value = $elem[0].multiple ? $elem[0].files : $elem[0].files[0];
                            util.setPropertyValue(scope, attrs.ngModel, value);
                        });
                    });
                    scope.$watch(attrs.ngModel, function (file) {
                        if (!file) {
                            var form = document.createElement('form');
                            document.body.appendChild(form);
                            //记住file在旧表单中的的位置
                            var pos = $elem[0].nextSibling;
                            form.appendChild($elem[0]);
                            form.reset();
                            pos.parentNode.insertBefore($elem[0], pos);
                            document.body.removeChild(form);
                        }
                    })
                }
            }
        };
    });
});