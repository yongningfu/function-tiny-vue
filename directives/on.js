module.exports =  {
  bind (descriptor, vue) {
    if (descriptor.arg === 'click') {
      descriptor.domNode.addEventListener('click', vue[descriptor.value].bind(vue))
    }
  }
}