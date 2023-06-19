import { createCamera } from "./components/camera";
import { createRenderer } from "./components/renderer";
import { createScene } from "./components/editorScene";
import { resize } from "./components/resize";

class Polyeditor {

    #camera;
    #renderer;
    #scene;

    constructor(container) {
        this.#camera = createCamera();
        this.#scene = createScene();
        this.#renderer = createRenderer();

        container.append(this.#renderer.domElement);

        window.addEventListener('resize', () => {
            resize(container, this.#camera, this.#renderer);
            this.render();
        });
    }

    render() {
        this.#renderer.render(this.#scene, this.#camera);
    }

}

export { Polyeditor }