p5.game is a p5.js library for the creation of games and playthings.

This project was forked from [p5.play.js][] and is targeted especially
to beginner javascript programmers.

You can find examples and more information at [boldideainc.github.io/p5.game][].

p5.game provides a Sprite class to manage visual objects in 2D space and
features such as animation support, basic collision detection and
resolution, sprite grouping, helpers for mouse and keyboard
interactions, and a virtual camera. 

p5.game extends [p5.js][], a javascript library (and a community) that
aims to make coding accessible for artists, designers, educators, and
beginners. If you are not familiar with p5.js, you should start at
[p5js.org/tutorials][].

## Development

The following documentation is for *developing* p5.game itself. If you
want to *use* p5.game, please see [boldideainc.github.io/p5.game][].

### Quick Start

First install [node.js][]. Then run:

```
npm install
npm start
```

Your web browser should open to a welcome page. If it doesn't, visit
[localhost:8080][] in your browser.

### Unit Tests

To run the unit tests in your browser, visit [localhost:8080/test][].

To run them from the command-line, use `npm test`.

### Documentation

The docs can be found at [localhost:8080/docs][] or via the "Reference" link on
the quick start welcome page. 

Use `npm run docs` to regenerate the local documentation using [YUIDoc][].

A (mostly current) copy of the docs is also hosted at [boldideainc.github.io/p5.game/docs][].

### Examples

Several example sketches are available at [boldidea.github.io/p5.game/examples][].

You can try these examples against your local copy of p5.game at
[localhost:8080/examples][] or via the "Examples" link on the quick start
welcome page. 

[p5.play.js]: https://github.com/molleindustria/p5.play/
[boldideainc.github.io/p5.game]: https://boldideainc.github.io/p5.game/
[boldideainc.github.io/p5.game/docs]: https://boldideainc.github.io/p5.game/docs/
[boldideainc.github.io/p5.game/examples]: https://boldideainc.github.io/p5.game/examples/
[localhost:8080]: http://localhost:8080/
[localhost:8080/test]: http://localhost:8080/test/
[localhost:8080/docs]: http://localhost:8080/docs/
[localhost:8080/examples]: http://localhost:8080/examples/
[p5.js]: https://p5js.org
[p5js.org/tutorials]: http://p5js.org/tutorials/
[node.js]: https://nodejs.org/en/
[YUIDoc]: http://yui.github.io/yuidoc/
