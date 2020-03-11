import {encode} from "upng-js";
import {createWriteStream} from "fs";

export const GeneratePNG = (w, h) => {
    const pixels_size = w * h * 4;
    let pixels = new Uint8Array(pixels_size);
    for (let i = 0; i < pixels_size; i++) {
        if ((i + 1) % 4 !== 0)
            pixels[i] = 0;
        else
            pixels[i] = 255;
    }

    const png = encode([pixels.buffer], w, h, 0);

    createWriteStream("./static/sample.png").write(new Uint8Array(png));
};
