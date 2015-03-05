"use strict";

define(function (require, exports, module) {
    var app = require("app");
    app.directive("submitting", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem);
                //提交状态的提示
                var hint = attrs.submittingHint || "提交中...";
                //正常情况下的提示
                var normalHint = $elem.val() || $elem.html();
                var method;
                if ($elem[0].nodeName === "INPUT") {
                    method = "val";
                } else {
                    method = "html";
                }

                scope.$watch(attrs.submitting, function (newValue) {
                    if (newValue) {
                        $elem[method](hint);
                        $elem.attr("disabled", "disabled");
                    } else {
                        $elem[method](normalHint);
                        $elem.removeAttr("disabled");
                    }
                });
            }
        };
    });
})