import { createCamera } from "./components/camera";
import { createRenderer } from "./components/renderer";
import { createScene } from "./components/editorScene";
import { drawPolyhedron } from "./components/drawPolyhedron";
import { ControlLoop } from "./components/ControlLoop";

import { parseConway } from "./polyhedra/parseConway";

class Polyeditor {

    #camera;
    #loop;
    #renderer;
    #scene;
    #polyhedron;

    constructor(container) {
        this.#camera = createCamera();
        this.#scene = createScene();
        this.#renderer = createRenderer();

        container.append(this.#renderer.domElement);

        this.#loop = new ControlLoop(this.#camera, this.#scene, this.#renderer);
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }

    generate(input) {
        if (this.#polyhedron) {
            this.#scene.remove(this.#polyhedron);
        }
        const polyhedron = parseConway(input);
        this.#polyhedron = drawPolyhedron(polyhedron);
        this.#scene.add(this.#polyhedron);
    }
}

export { Polyeditor }