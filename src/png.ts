import { encode } from 'upng-js';
import { createWriteStream } from 'fs';

const GeneratePNG = (w: number, h: number) => {
  const pixelsSize: number = w * h * 4;
  const pixels: Uint8Array = new Uint8Array(pixelsSize);
  for (let i = 0; i < pixelsSize; i++) {
    if ((i + 1) % 4 !== 0) { pixels[i] = 0; } else { pixels[i] = 255; }
  }

  const png: ArrayBuffer = encode([pixels.buffer], w, h, 0);

  createWriteStream('./static/sample.png').write(new Uint8Array(png));
};

export default GeneratePNG;
