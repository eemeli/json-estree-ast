# ESTree-compatible JSON AST parser

A small wrapper around [json-to-ast] that translates its output to the [ESTree Spec], which makes it usable for example as a [jscodeshift] parser.

[json-to-ast]: https://www.npmjs.com/package/json-to-ast
[ESTree Spec]: https://github.com/estree/estree
[jscodeshift]: https://www.npmjs.com/package/jscodeshift

## Installation
```
npm install json-estree-ast
```

## Usage

```js
const { parse } = require('json-estree-ast');

const options = {
  loc: true,  // include source location information. Default `true`
  source: 'data.json'  // include source information. Default `null`
};

parse('{"a": 1}', options);
```

Output
```js
{
  type: 'Program',
  body: [
    {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: 'a',
            raw: '"a"',
            loc: {
              start: { line: 1, column: 1 },
              end: { line: 1, column: 4 },
              source: 'data.json'
            }
          },
          kind: 'init',
          value: {
            type: 'Literal',
            value: 1,
            raw: '1',
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 7 },
              source: 'data.json'
            }
          },
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 7 },
            source: 'data.json'
          }
        }
      ],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 8 },
        source: 'data.json'
      }
    }
  ],
  loc: {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 8 },
    source: 'data.json'
  }
}
```

## Node types

#### ObjectExpression
```js
{
  type: 'ObjectExpression',
  properties: Property[],
  loc?: SourceLocation
}
```

#### Property
```js
{
  type: 'Property',
  key: Identifier,
  kind: 'init',
  value: ObjectExpression | ArrayExpression | Literal,
  loc?: SourceLocation
}
```

#### Identifier
```js
{
  type: 'Identifier',
  name: string,
  raw: string,
  loc?: SourceLocation
}
```

#### ArrayExpression
```js
{
  type: 'ArrayExpression',
  children: (ObjectExpression | ArrayExpression | Literal)[],
  loc?: SourceLocation
}
```

#### Literal
```js
{
  type: 'Literal',
  value: string | number | boolean | null,
  raw: string,
  loc?: SourceLocation
}
```

#### SourceLocation
```js
{
  source?: string,
  start: SourcePosition,
  end: SourcePosition
}
```

#### SourcePosition
```js
{
  line: number,
  column: number
}
```

## License
MIT
