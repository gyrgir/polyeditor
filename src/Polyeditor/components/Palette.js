import { Color } from 'three';

class Palette {

    #colors;

    constructor(colors = []) {
        // TODO: this does not work for hex colors (unlike setColor)
        this.#colors = colors.map((value) => new Color(...value));
    }

    setColor(index, value) {
        this.#extendColors(index + 1);
        this.#colors[index] = new Color(value);
    }

    getColor(index) {
        this.#extendColors(index + 1);
        return this.#colors[index];
    }

    #extendColors(totalLength) {
        while (this.#colors.length < totalLength) {
            this.#colors.push(new Color(Math.random(), Math.random(), Math.random()));
        }
    }
}

export { Palette }