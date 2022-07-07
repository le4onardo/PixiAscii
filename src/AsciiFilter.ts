import { Filter } from '@pixi/core';
import { Texture } from 'pixi.js';
import fontMap from 'Ascii/fontMap.png';

// TODO (cengler) - The Y is flipped in this shader for some reason.

// @author Vico @vicocotea
// original shader : https://www.shadertoy.com/view/lssGDj by @movAX13h

/**
 * An ASCII filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/ascii.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-ascii|@pixi/filter-ascii}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 */

const fragment = `
precision highp float;
precision highp int;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D fontTexture;
uniform vec4 inputPixel;
uniform int charIndexes[16];
uniform int size;

float scale = float(size) * 8.0;

vec2 mapCoord(vec2 coord) {
  coord *= inputPixel.xy;
  return coord;
}

vec2 unmapCoord(vec2 coord) {
  coord *= inputPixel.zw;
  return coord;
}

vec2 getFontCoord(int i, vec2 coord) {
  float chX = mod(float(i), 16.);
  float chY = floor(float(i) / 16.);
  
  vec2 fontCoord = vec2(
    (chX * 8. + mod(coord.x / float(size), 8.)) / 128.,
    (chY * 8. + mod(coord.y / float(size), 8.)) / 128.
  );
  return fontCoord;
}

float averageBlockColor(vec2 coord) {
  vec2 topLeftCoord = unmapCoord(floor(coord / scale) * scale);
  vec4 topLeftColor = texture2D(uSampler, topLeftCoord);
  float charIndex = floor(((topLeftColor.x + topLeftColor.y + topLeftColor.z) / 3.0) * 15.0);

  int minIdx = charIndexes[0];
  if (charIndex == 1.0) minIdx = charIndexes[1];
  if (charIndex == 2.0) minIdx = charIndexes[2];
  if (charIndex == 3.0) minIdx = charIndexes[3];
  if (charIndex == 4.0) minIdx = charIndexes[4];
  if (charIndex == 5.0) minIdx = charIndexes[5];
  if (charIndex == 6.0) minIdx = charIndexes[6];
  if (charIndex == 7.0) minIdx = charIndexes[7];
  if (charIndex == 8.0) minIdx = charIndexes[8];
  if (charIndex == 9.0) minIdx = charIndexes[9];
  if (charIndex == 10.0) minIdx = charIndexes[10];
  if (charIndex == 11.0) minIdx = charIndexes[11];
  if (charIndex == 12.0) minIdx = charIndexes[12];
  if (charIndex == 13.0) minIdx = charIndexes[13];
  if (charIndex == 14.0) minIdx = charIndexes[14];
  if (charIndex == 15.0) minIdx = charIndexes[15];

  vec2 fontCoord = getFontCoord(minIdx, coord);
  vec4 fontColors = texture2D(fontTexture, fontCoord);
  if ((fontColors.x + fontColors.y + fontColors.z) / 3.0 < 0.5) return 0.0;
  return 1.0; 
}

void main() {
  vec2 coord = mapCoord(vTextureCoord);
  float averageColor = averageBlockColor(coord);
  if(averageColor > 0.0) gl_FragColor = averageColor * texture2D(uSampler, vTextureCoord);
  else gl_FragColor = vec4(0,0,0, 1.0);
}`;

export default class AsciiFilter extends Filter {
  constructor() {
    super(null, fragment);
    this.fontTexture = Texture.from(fontMap);
    // ascii values: -'"^\]on3b&HAB@0
    this.charIndexes = [
      45, 96, 34, 94, 92, 93, 111, 110, 51, 98, 38, 72, 65, 66, 64, 48
    ];
    this.size = 1;
  }

  get fontTexture() {
    return this.uniforms.fontTexture;
  }

  set fontTexture(value: Texture) {
    this.uniforms.fontTexture = value;
  }

  set charIndexes(value: number[]) {
    this.uniforms.charIndexes = value;
  }

  set size(value: number) {
    this.uniforms.size = value;
  }
}
