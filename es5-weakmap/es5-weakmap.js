(function () {

    //
    //
    //
    //
    //
    //
    //
    //
    if (typeof WeakMap === 'undefined') {
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
         * @description 仿ES6 WeakMap对象
         * @param constructorData {Array} 初始化数据，由于se5 不存在iterator接口，所以这里只能传入数组,并且是二维数组
         * @return {Array} 直接返回数据，具体查看new Fn显示返回数据的结果
         * */

        function WeakMap(constructorData) {
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
                    if (testInvalidValue(item[0])) {
                        throw new TypeError('Invalid value used as weak map key');
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

            /**
             * @description 设置map对象一个值
             * @param key {*}
             * @param value {*}
             * @return {this}
             * */
            data.set = function (key, value) {
                if (testInvalidValue(key)) {
                    throw new TypeError('Invalid value used as weak map key');
                }
                data.delete(key);
                data.push({
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
                        res = true;
                        break;
                    }
                }
                return res;
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

        window.WeakMap = WeakMap;

    }

    //
    //
    //
    //
    //
    //
    //
    //
}());
