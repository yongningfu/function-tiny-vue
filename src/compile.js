/**
 * 这个方法给出根据dom selector得出指令描述对象数组
 * 
 * directiveDescription
 * {
 *  domNode: 对应的domNode
 *  name: 指令名称
 *  arg：指令参数
 *  value: 指令值
 * }
 * 
 * 知道vaule后，就可以利用watch建立指令值和数据的关系
 * 知道domNode, 就对对应的dom节点进行操作
 *
 */


const directiveNameReg = /^v-([^:]+)(?:$|:(.*)$)/;

function compile(rootNode) {
  
  var directiveDescriptions = [];
  var attributes = rootNode.attributes;

  for (var i = 0; i < attributes.length; i++) {
    var matches = attributes[i].name.match(directiveNameReg);
    if (matches) {
      var name = matches[1];
      // 这个可能没有？
      var arg = matches[2];
      var value = attributes[i].value;
      directiveDescriptions.push({
        domNode: rootNode,
        name,
        arg,
        value
      });
    }
  }

  if (rootNode.hasChildNodes()) {
    var childNodesList = rootNode.childNodes;
    var node;
    for (var i = 0; i < childNodesList.length; i++) {
      node = childNodesList[i];
      if (node.nodeType === 1) {
        directiveDescriptions = directiveDescriptions.concat(compile(node));
      }
    }
  }

  return directiveDescriptions;
}

module.exports = compile;