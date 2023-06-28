import { createCamera } from "./components/camera";
import { createPolyhedron } from "./components/polyhedron";
import { createRenderer } from "./components/renderer";
import { createScene } from "./components/editorScene";
import { ControlLoop } from "./components/ControlLoop";

import { getBaseShape } from "./polyhedra/baseShapes";

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
        const graph = getBaseShape(input);
        this.#polyhedron = createPolyhedron(graph);
        this.#scene.add(this.#polyhedron);
    }
}

export { Polyeditor }