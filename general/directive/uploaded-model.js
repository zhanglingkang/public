"use strict"

define(function (require, exports, module) {
    var app = require("app")
    var util = require("public/general/util")
    /**
     * uploadOptions可配置项
     *  url 必填
     *  uploadName 可选，上传时的参数名，如果没有提供，则取name属性的值
     *  onFileUploadStart 可选，传递参数为选择的文件，如果返回值为false，取消上传行为
     *  onFileUploadComplete 可选 返回值赋给uploadedModel绑定的模型上
     *  onError 可选
     */
    app.directive("uploadedModel", ["$http", function ($http) {
        return {
            restrict: "A",
            link: function ($scope, $elem, attrs) {
                var uploadOptions = $scope[attrs.uploadOptions]
                if (!angular.isObject(uploadOptions)) {
                    throw "必须配置uploadOptions，并且类型为Object"
                }
                if (!uploadOptions.url) {
                    throw "必须提供上传地址"
                }
                uploadOptions.uploadName = uploadOptions.uploadName || attrs.name
                uploadOptions.onFileUploadStart = uploadOptions.onFileUploadStart || angular.noop
                uploadOptions.onFileUploadComplete = uploadOptions.onFileUploadComplete || angular.identity
                uploadOptions.onError = uploadOptions.onError || angular.noop
                $elem.bind("change", function () {
                    if ($elem[0].files.length > 0) {
                        var continueUpload = uploadOptions.onFileUploadStart($elem[0].multiple ? $elem[0].files : $elem[0].files[0])
                        if (continueUpload !== false) {
                            var formData = new FormData()
                            formData.append(uploadOptions.uploadName, $elem[0].files[0])
                            $http.post(uploadOptions.url, formData, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }
                            }).success(function (response) {
                                var returnedValue = uploadOptions.onFileUploadComplete(response)
                                util.setPropertyValue($scope, attrs.uploadedModel, returnedValue)
                            }).error(function (response) {
                                uploadOptions.onError(response)
                            })
                        }
                    }
                })
            }
        }
    }])

})