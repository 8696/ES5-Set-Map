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
    if (typeof Set === 'undefined') {
        /**
         * @description 仿ES6 Set对象
         * @param constructorData {Array|String} 初始化数据，由于se6 Set在new时只能传入具有iterator接口的数据结构
         *        所有这里只能传入指定数据结构
         * @return 直接返回数据，具体查看new Fn显示返回数据的结果
         * */
        function Set(constructorData) {
            !constructorData && (constructorData = []);
            var data = (function () {
                /**
                 * @description ES6原生具备 Iterator 接口的数据结构如下
                 Array
                 Map
                 Set
                 String
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
                return arr.indexOf(item) === index;
            });
            data.size = data.length;
            /**
             * @description 往数组添加一项
             * @param value {*}
             * @return {this}
             * */
            data.add = function (value) {
                if (data.indexOf(value) === -1) {
                    data.size = data.push(value);
                }
            };
            /**
             * @description 清除数组数据
             * @return ｛void｝
             * */
            data.clear = function () {
                data.size = data.length = 0;
            };
            /**
             * @description 从set对象中删除某一个值
             * @param value {*}
             * @return {Boolean}
             * */
            data.delete = function (value) {
                if (data.indexOf(value) === -1) {
                    return false;
                }
                data.splice(data.indexOf(value), 1);
                data.size = data.length;
                return true;
            };

            /**
             * @description 循环set对象
             * @param callback {Function} 遍历的回调函数
             * @param _this {Object|Array} 遍历回调函数的this指针
             * @return {void}
             * */
            data.forEach = function (callback, _this) {
                var i = 0,
                    length = data.length,
                    context = (function () {
                        if (_this === null || _this === undefined) {
                            return data;
                        }
                        return typeof _this === 'object' ? _this : data;
                    }());
                for (; i < length; i++) {
                    callback.call(context, data[i], data[i], data);
                }
            };
            /**
             * @description 判断一个值是否存在于数组中
             * @param value {*}
             * @return {Boolean}
             * */
            data.has = function (value) {
                return data.indexOf(value) > -1;
            };
            /**
             * @description 获取一个仿set迭代器
             * @return {Object}
             * */
            data.values = function () {
                var index = 0;
                return {
                    next: function () {
                        if (data.length === 0 || data[index] === undefined) {
                            return {
                                value: undefined,
                                done: true
                            };
                        }
                        return {
                            value: data[index++],
                            done: false
                        };
                    }
                };
            };
            /**
             * @description 获取仿set迭代器
             * @return {Object}
             * */
            data.entries = function () {
                var index = 0;
                return {
                    next: function () {
                        if (data.length === 0 || data[index] === undefined) {
                            return {
                                value: undefined,
                                done: true
                            };
                        }
                        return {
                            value: [data[index], data[index++]],
                            done: false
                        };
                    }
                };
            };
            /**
             * @description 原生Set的keys === values
             * */
            data.keys = data.values;

            return data;
        }

        window.Set = Set;

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
//

}());
