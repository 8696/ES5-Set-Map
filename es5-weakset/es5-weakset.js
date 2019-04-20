(function () {

//
//
//
//
//
//
//
//
//
//
//
//
    if (typeof WeakSet === 'undefined') {

        /**
         * @description 检测一个值是否是原始值
         * @param value {*}
         * @return {Boolean}
         * */
        function testInvalidValue(value) {
            // es5没有symbol
            return ['string', 'number', 'boolean', 'undefined'].indexOf(typeof value) > -1
                ||
                value === null;
        }

        /**
         * @description 仿ES6 WeakSet对象
         * @param constructorData {Array} 初始化数据，由于se6 WeakSet在new时只能传入具有iterator接口的数据结构
         *        所有这里只能传入指定数据结构
         * @return {Array} 直接返回数据，具体查看new Fn显示返回数据的结果
         * */

        function WeakSet(constructorData) {
            !constructorData && (constructorData = []);
            var data = (function () {
                /**
                 * @description ES6原生具备 Iterator 接口的数据结构如下
                 Array
                 Map
                 Set
                 String // 不支持传入
                 TypedArray
                 arguments
                 NodeList
                 * */
                try {
                    return Array.prototype.slice.call(constructorData);
                } catch (e) {
                    return [];
                }
            }());
            data = data.filter(function (item, index, arr) {
                if (testInvalidValue(item)) {
                    throw new TypeError('Invalid value used in weak set');
                }
                return arr.indexOf(item) === index;
            });


            /**
             * @description 往数组添加一项
             * @param value {Object} 只能是引用值,es5没有symbol
             * @return {this}
             * */
            data.add = function (value) {
                if (testInvalidValue(value)) {
                    throw new TypeError('Invalid value used in weak set');
                }
                data.push(value);
                return this;
            };
            /**
             * @description 删除某一个值
             * @param value {*}
             * @return {Boolean}
             * */
            data.delete = function (value) {
                if (data.indexOf(value) === -1) {
                    return false;
                }
                data.splice(data.indexOf(value), 1);
                return true;
            };
            /**
             * @description 判断一个值是否存在于数组
             * @param value {*}
             * @return {Boolean}
             * */
            data.has = function (value) {
                return data.indexOf(value) > -1;
            };
            /**
             * @description 清除数据（废弃）
             * @return {void}
             * */
            /*
            data.clear = function () {
                data.length = 0;
            };
            */
            return data;
        }

        window.WeakSet = WeakSet;

    }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
}());
