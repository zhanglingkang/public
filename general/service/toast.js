"use strict";

define(function (require, exports, module) {
    var app = require("app")
    app.service("toast", ["$document", function ($document) {
        return {
            /**
             *
             * @param {Object} options
             * @param {string} options.content
             * @param {number} options.hideDelay单位为ms 默认为3000
             * @param {string} options.position为left、right、top、bottom的组合,以空格隔开，默认right bottom
             */
            show: function (options) {
                options.hideDelay = options.hideDelay || 3000
                options.position = options.position || "right bottom"
                var $toast = $([
                    '<div class="toast">',
                    '<span class="content">',
                    '</span>',
                    '</div>'
                ].join(""))
                $toast.find(".content").text(options.content)
                $toast.addClass(options.position)
                $("body").append($toast)
                setTimeout(function () {
                    $toast.remove()
                }, options.hideDelay)
            }
        }
    }])
})