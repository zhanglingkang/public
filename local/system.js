"use strict"

define(function (require, exports, module) {
    var ROOT_DIR = seajs.data.cwd + "tpl/"
    return {
        /**
         * @param path {String} tpl相对路径
         * @returns {string} 模板文件在服务器的绝对路径 如：http://{{document.domain}}/tpl/{{path}}
         */
        getTplAbsolutePath: function (path) {
            if (/^\//.test(path)) {
                path = path.substring(1)
            }
            if (/^tpl/.test(path)) {
                path = path.substring(3)
            }
            return ROOT_DIR + path
        }
    }
})