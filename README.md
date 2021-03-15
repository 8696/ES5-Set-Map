# ES5-Set-Map

#### 项目介绍

- 使用数组模拟 ES6 中的 Set 和 Map 对象，该模拟基本实现了所有原生的 api，仅构造传参部分未实现

#### 测试
- 各文件夹中test.html可见demo


##### Set

```javascript
    var arr = [1, 2];
    var fn = function () {
    };
    var obj = {};
    var set = new Set();
    set.add(arr);
    set.add(fn);
    console.log(set.size); // 2
    console.log(set.has(arr)); // true

    var iterator = set.keys();
    console.log(iterator.next().value); // [1,2]
    console.log(iterator.next().done); // false

    console.log(iterator.next().done); // true
    // 原生Set的keys === values
    console.log(set.keys === set.values); // true

    console.log('-----------');


    var set2 = new Set([arr, arr, obj, obj, fn, fn, fn]);

    console.log(set2.size); // 3
    console.log(set2.delete(arr));  // true
    console.log(set2.delete(fn));  // true
    console.log(set2.has(arr)); // false
    console.log(set2.size); // 1
```

##### WeakSet

```javascript
    var arr = [1, 2];
    var fn = function () {
    };
    var obj = {};

    var weakset = new WeakSet();
    weakset.add(obj);
    console.log(weakset.has(obj));  // true
    weakset.add(fn);
    console.log(weakset.has(fn));   //true
    weakset.delete(fn);
    console.log(weakset.has(fn));   // false
    // weakset.add(213);   // TypeError: Invalid value used in weak set

    console.log('-----------');


    var weakset2 = new WeakSet([
        window, obj, fn
    ]);
    console.log(weakset2.has(window));  //true
    //weakset2.add(null);     //TypeError: Invalid value used in weak set
```

##### Map

```javascript
    var arr = [1, 2];
    var fn = function () {
    };
    var obj = {};


    var map = new Map();

    map.set(arr, 'arr').set(fn, 'fn');
    console.log(map.size); //2
    console.log(map.has(fn)); // true
    map.delete(arr);
    console.log(map.size); //1

    console.log('-----------');

    var map2 = new Map([
        [arr, arr],
        [arr, arr],
        [obj, 'obj'],
        [obj, 'obj'],
        [document.body, 'document.body'],
        [document.body, 'document.body'],
        [document.body, 'document.body'],
        [document.body, 'document.body']
    ]);

    console.log(map2.get(document.body));   // 'document.body'
    console.log(map2.size);     // 3
    // iterator
    var iteratorKeys = map2.keys();
    console.log(iteratorKeys.next());   // {value: Array(2), done: false}
    console.log(iteratorKeys.next());   // {value: {…}, done: false}
    console.log(iteratorKeys.next());   // {value: body, done: false}
    console.log(iteratorKeys.next());   // {value: undefined, done: true}

    var iteratorEntries = map2.entries();
    var iteratorValues = map2.values();
    map2.forEach(function (value, key, map) {
    });
```

##### WeakMap

```javascript
    var arr = [1, 2];
    var fn = function () {
    };
    var obj = {};

    var weakmap = new WeakMap();

    weakmap.set(obj, 'obj');
    console.log(weakmap.has(obj));  // true
    console.log(weakmap.get(obj));  // 'obj'
    weakmap.delete(obj);
    console.log(weakmap.get(obj));  // undefined
    console.log(weakmap.has(obj));  // false

    // weakmap.set('abc', 123);    // TypeError: Invalid value used as weak map key

    console.log('--------------');

    var weakmap2 = new WeakMap([
        [obj, 'obj'],
        [obj, obj],
        [arr, arr],
    ]);

    console.log(weakmap2.has(obj));  // true
    console.log(weakmap2.delete(obj));  // true
    console.log(weakmap2.has(obj));  // false
```
