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
    if (typeof Map === 'undefined') {
        if (typeof Object.is === 'undefined') {
            /**
             * @description Object.is
             * @param value1 {*} 需要比较的值
             * @param value2 {*} 需要比较的值
             * @return {Boolean}
             * */
            Object.is = function (value1, value2) {
                if (value1 === value2) {
                    return value1 !== 0 || 1 / value1 === 1 / value1;
                } else {
                    return value1 !== value1 && value2 !== value2;
                }
            };
        }

        /**
         * @description 仿ES6 Map对象
         * @param constructorData {Array} 初始化数据，由于se5 不存在iterator接口，所以这里只能传入数组,并且是二维数组
         * @return {Array} 直接返回数据，具体查看new Fn显示返回数据的结果
         * */
        function Map(constructorData) {
            // 简单处理构造函数不能被直接调用
            if (this === window) {
                throw new TypeError('Constructor Set requires \'new\'');
            }

            !constructorData && (constructorData = []);
            var data = (function () {
                var toString = Object.prototype.toString,
                    data = [];
                if (toString.call(constructorData) !== '[object Array]') {
                    throw new TypeError('Iterator value s is not an entry object');
                }
                constructorData.forEach(function (item) {
                    if (toString.call(item) !== '[object Array]') {
                        throw new TypeError('Iterator value s is not an entry object');
                    }
                    var res = false,
                        i = 0,
                        length = data.length;
                    for (; i < length; i++) {
                        if (Object.is(item[0], data[i].key)) {
                            res = true;
                            break;
                        }
                    }
                    if (!res) {
                        data.push({
                            key: item[0],
                            value: item[1]
                        });
                    }

                });
                return data;
            }());

            data.size = data.length;
            /**
             * @description 设置map对象一个值
             * @param key {*}
             * @param value {*}
             * @return {this}
             * */
            data.set = function (key, value) {
                data.delete(key);
                data.size = data.push({
                    key: key,
                    value: value
                });

                return this;
            };
            /**
             * @description 根据key获取一直值
             * @param key {*}
             * @return {*}
             * */
            data.get = function (key) {
                var value = undefined,
                    i = 0,
                    length = data.length;
                for (; i < length; i++) {
                    if (Object.is(key, data[i].key)) {
                        value = data[i].value;
                        break;
                    }
                }
                return value;
            };
            /**
             * @description 判断一个值是否存在于map对象key中
             * @param key {*}
             * @return {Boolean}
             * */
            data.has = function (key) {
                var res = false,
                    i = 0,
                    length = data.length;
                for (; i < length; i++) {
                    if (Object.is(key, data[i].key)) {
                        res = true;
                        break;
                    }
                }
                return res;
            };
            /**
             * @description 移除map所有数据
             * @return {void}
             * */
            data.clear = function () {
                data.length = 0;
            };
            /**
             * @description 从map对象中删除指定key
             * @param key {*}
             * @return {Boolean}
             * */
            data.delete = function (key) {
                var res = false,
                    i = 0,
                    length = data.length;
                for (; i < length; i++) {
                    if (Object.is(key, data[i].key)) {
                        data.splice(i, 1);
                        data.size = data.length;
                        res = true;
                        break;
                    }
                }
                return res;
            };
            /**
             * @description 获取仿map对象的迭代器
             * @return {Object}
             * */
            data.keys = function () {
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
                            value: data[index++].key,
                            done: false
                        };
                    }
                };
            };
            /**
             * @description 获取仿map对象的迭代器
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
                            value: data[index++].value,
                            done: false
                        };
                    }
                };
            };
            /**
             * @description 获取仿map对象的迭代器
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
                            value: [data[index].key, data[index++].value],
                            done: false
                        };
                    }
                };
            };

            /**
             * @description 循环map对象
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
                    callback.call(context, data[i].value, data[i].key, data);
                }
            };

            return data;
        }

        window.Map = Map;

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
