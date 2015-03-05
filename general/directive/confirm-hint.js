"use strict"

define(function (require, exports, module) {
    var app = require("app")
    var system = require("public/local/system")
    app.directive("confirmHint", ["$modal", function ($modal) {
        return {
            restrict: "A",
            link: function ($scope, elem, attrs) {
                var $elem = $(elem)
                var confirmed = false
                $scope.title = attrs.modalTitle
                $scope.content = attrs.modalContent
                document.addEventListener("click", function (event) {
                    if ($elem[0] === event.target) {
                        if (!confirmed) {
                            event.stopPropagation()
                            var modalInstance = $modal.open({
                                templateUrl: system.getTplAbsolutePath("public/confirm-hint.html"),
                                controller: "confirmHintCtrl",
                                backdrop: true,
                                scope: $scope
                            })
                            modalInstance.result.then(function () {
                                confirmed = true
                                setTimeout(function () {
                                    event.target.click()
                                    confirmed = false
                                })
                            }, function () {
                                confirmed = false
                            })
                        }
                    }
                }, true)
            }
        }
    }])
    app.controller('confirmHintCtrl', ["$scope", "$modalInstance", function ($scope, $modalInstance) {

        $scope.ok = function () {
            console.log("click")
            $modalInstance.close()
        }

        $scope.cancel = function () {
            console.log("cancel")
            $modalInstance.dismiss()
        };
    }]);
})