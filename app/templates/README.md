# <%= appname %>
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

<%= scriptDescription %>

See [`src/<%= scriptName %>.coffee`](src/<%= scriptName %>.coffee) for full documentation.

## Installation

In hubot project repo, run:

`npm install <%= appname %> --save`

Then add **<%= appname %>** to your `external-scripts.json`:

```json
["<%= appname %>"]
```

## Sample Interaction

```
user1>> hubot hello
hubot>> hello!
```

[npm-url]: https://npmjs.org/package/<%= appname %>
[npm-image]: http://img.shields.io/npm/v/<%= appname %>.svg?style=flat
[travis-url]: https://travis-ci.org/<%= userName %>/<%= appname %>
[travis-image]: http://img.shields.io/travis/<%= userName %>/<%= appname %>/master.svg?style=flat
[daviddm-url]: https://david-dm.org/<%= userName %>/<%= appname %>.svg?theme=shields.io
[daviddm-image]: http://img.shields.io/david/<%= userName %>/<%= appname %>.svg?style=flat
[coveralls-url]: https://coveralls.io/r/<%= userName %>/<%= appname %>
[coveralls-image]: http://img.shields.io/coveralls/<%= userName %>/<%= appname %>/master.svg?style=flat
