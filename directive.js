/**
 * 根据用户的定义 建立一个个指令对象
 * 
 * 我们真正用来监听属性变化后，操作的是 watch，但是watch具体是要
 * 
 * 执行什么操作，我们可以利用指令给watch指定 (当然也可以直接写在vue的wathc里面)
 * 
 * 这就是watch和directive的关系 即 指令的 update函数即为watch的update函数
 * 
 */

var onDirective = require('./directives/on');
var textDirective = require('./directives/text');

function Directive(descriptor, vue) {
  if (descriptor.name === 'on') {
    onDirective.bind(descriptor, vue);
  }

  if (descriptor.name === 'text') {
    var update = textDirective.update(descriptor);
    update(vue[descriptor.value]);
    vue.Watch(descriptor.value, textDirective.update(descriptor));
  }
}

module.exports = Directive;