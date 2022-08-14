# PixiAscii
Cool PixiJS ascii art filter.

An adapted version of [Lea Rosema](https://github.com/learosema)'s [ascii shader](https://codepen.io/learosema/pen/abveWaY) as a Pixi JS filter. Check it out!

<p align="center">
<img src="https://github.com/le4onardo/PixiAscii/blob/gif-test/earth%20zoom.gif" width="700" />
</p>


# Installation

```
npm i pixi-ascii
```

# Usage

You can use it as any other Pixi filter

```
import AsciiFilter from 'pixi-filter';

...
const texture = Texture.from('some media');
const sprite = new Sprite(texture);
const container = new Container();

const ascii = new AsciiFilter();
sprite.filters = [ascii];

container.addChild(sprite);
...

```
___

# ToDo
- Small offset/glitch in odd screen heights

- Smoothness chars loss when zoom larger than 2.









