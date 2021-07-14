import { encode } from 'upng-js';
import { createWriteStream } from 'fs';

const GeneratePNG = (w, h) => {
  const pixelsSize = w * h * 4;
  const pixels = new Uint8Array(pixelsSize);
  for (let i = 0; i < pixelsSize; i++) {
    if ((i + 1) % 4 !== 0) { pixels[i] = 0; } else { pixels[i] = 255; }
  }

  const png = encode([pixels.buffer], w, h, 0);

  createWriteStream('./static/sample.png').write(new Uint8Array(png));
};

export default GeneratePNG;
