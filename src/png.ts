import { encode } from 'upng-js';

const GeneratePNG = (w: number, h: number): Uint8Array => {
  const pixelsSize: number = w * h * 4;
  const pixels: Uint8Array = new Uint8Array(pixelsSize);
  for (let i = 0; i < pixelsSize; i++) {
    if ((i + 1) % 4 !== 0) { pixels[i] = 0; } else { pixels[i] = 255; }
  }

  return new Uint8Array(encode([pixels.buffer], w, h, 0));
};

export default GeneratePNG;
