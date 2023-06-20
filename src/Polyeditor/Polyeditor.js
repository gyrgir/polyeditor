import { createCamera } from "./components/camera";
import { createRenderer } from "./components/renderer";
import { createScene } from "./components/editorScene";
import { ControlLoop } from "./components/ControlLoop";

class Polyeditor {

    #camera;
    #loop;
    #renderer;
    #scene;

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
}

export { Polyeditor }