const parseJson = require('json-to-ast')

const visit = (node) => {
  switch (node && node.type) {
    case 'Object':
      node.type = 'ObjectExpression'
      node.properties = node.children.map(visit)
      delete node.children
      break
    case 'Property':
      node.kind = 'init'
      visit(node.key)
      visit(node.value)
      break
    case 'Identifier':
      node.name = node.value
      delete node.value
      break
    case 'Array':
      node.type = 'ArrayExpression'
      node.elements = node.children.map(visit)
      delete node.children
      break
  }
  if (node && node.loc) {
    const { start, end } = node.loc
    start.column = start.offset
    end.column = end.offset
    delete start.offset
    delete end.offset
  }
  return node
}

module.exports = {
  parse(source, options) {
    const ast = parseJson(source, options)
    return {
      type: 'Program',
      body: [visit(ast)],
      loc: ast.loc
    }
  }
}
