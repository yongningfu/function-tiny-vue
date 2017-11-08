module.exports = {
  update (descriptor) {
    // 这个value就是每次数据变化后的新值
    return function(value) {
      descriptor.domNode.innerHTML = value;
    }
  }
}