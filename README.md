# PixiAscii
Cool PixiJS ascii art filter.

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

# Properties

### charIndexes
A 16 sized array with ascii numbers corresponding the characters to be displayed by the filter. Darker areas will show the first characteres, brighter areas will use latest chars.
Default chars are: 
```
// -'"^\]on3b&HAB@0
this.charIndexes = [45, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48] 
```
### size
The characters size displayed by the filter.
Defaults to 1

### backgroundColor
A 4 sized array with numbers representing normalized (i.e. from 0 to 1) RGBA values for the background color
Default is black
```
this.backgroundColor = [0.0, 0.0, 0.0, 1.0];
```

# ToDo
- Small offset/glitch in odd screen heights

- Smoothness chars loss when zoom larger than 2.


# Credits

- [Lea Rosema](https://github.com/learosema) for the original [ascii shader](https://codepen.io/learosema/pen/abveWaY) 





