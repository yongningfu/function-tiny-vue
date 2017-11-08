/**
 * 事件订阅触发机制
 * 
 * 每个订阅者为一个 watch 对象，外部调用它的 update 方法更新
 * 
 */

function Dep() {
  var subs = [];
  function addSub(sub) {
    if (subs.indexOf(sub) < 0) {
      subs.push(sub);
    }
  }
  function notify(value) {
    for (let i = 0; i < subs.length; i++) {
      subs[i].update(value);
    }
  }
  return {
    addSub,
    notify
  }
}

module.exports = Dep;