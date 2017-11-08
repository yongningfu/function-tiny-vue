/**
 * 
 * Vue的函数式编程实现
 * @param options | {
 *  el
 *  data
 *  method
 *  watch
 *  }
 * 
 * 
 */

var TEST = true;

var Dep = require('./dep');

function Vue(options) {

  // 导出的vue实例 去除this的影响
  var instance = {};

  var _el = options.el;
  var _data = options.data;
  var _methods = options.methods || {};
  var _watch = options.watch || {};
  var __WATCH__ = null; // 记录全局的wathc 用来在监听get的时候 加入watch依赖


  // 属性可能 xx.xx.xx
  function Watch(props, cb) {
    function update(value) {
      cb(value);
    }
    var instance = {update};

    // 每当一个watch创建的时候 自动加入到它的依赖中
    __WATCH__ = instance;
    // 执行这个的时候 回调用 vue instance 上面的get 方法 从而注入回调
    injectDependentWatch(props);
    __WATCH__ = null;
  }

  function injectDependentWatch(props) {
    var keys = props.split('.');
    var length = keys.length;
    var temp = instance;
    for (var i = 0; i <length; i++) {
      if (temp[keys[i]]) {
        temp = temp[keys[i]]
      } else {
        break;
      }
    }
  }


  /**
  * 模版作用域沙盒实现
  * 把options.data 上面的key全部代理到 vue instance，模版沙盒上面的解析用
  * vue instance上面的数据
  * 
  * 但 实际vue instance 实际调用的是 _data 里面的数据
  */

  for (let key in _data) {
    if (_data.hasOwnProperty(key)) {
      Object.defineProperty(instance, key, {
        configurable: true,
        enumerable: true,
        get: function() {
          return _data[key];
        },
        set: function(newValue) {
          _data[key] = newValue;
        }
      });
    }
  }

  // method 直接放在instance上面
  Object.keys(_methods).forEach(function(key) {
    instance[key] = _methods[key];
  });

  /**
   * 定义响应式属性
   * 给每个受监控的属性添加一个订阅依赖
   */

  function defineReactive(data, key) {

    var propertyDescriptor = Object.getOwnPropertyDescriptor(data, key);
    if (propertyDescriptor && propertyDescriptor.configurable === false) return;

    var currentValue = data[key];

    // 每个属性代理给一个依赖订阅对象 
    var dep = Dep();
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        if (__WATCH__) {
          dep.addSub(__WATCH__);
        }
        return currentValue;

      },
      set: function(newValue) {
        currentValue = newValue;
        dep.notify(currentValue);
      }
    });
  }
  
  /**
   * 对数据属性变化进行监控 
   */
  function observe(data) {
    Object.keys(data).forEach(function(key) {
      defineReactive(data, key);
      if (typeof data[key] === 'object') {
        observe(data[key]);
      }
    });
  }

  // 启动监听
  observe(_data);

  for (let key in _watch) {
    Watch(key, _watch[key]);
  }

  return instance;
}

module.exports = Vue;

