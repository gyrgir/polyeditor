import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { resize } from "./resize";

class ControlLoop {
    #camera;
    #clock;
    #controls;
    #renderer;
    #scene;

    constructor(camera, scene, renderer) {
        this.#clock = new Clock();
        this.#camera = camera;
        this.#scene = scene;
        this.#renderer = renderer;

        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
        this.#controls.listenToKeyEvents(window);

        window.addEventListener('resize', () => {
            //TODO: think about throttling
            resize(this.#renderer.domElement, this.#camera, this.#renderer);
            this.#renderer.render(this.#scene, this.#camera);
        });
    }

    tick(delta) {}

    start() {
        this.#renderer.setAnimationLoop(() => {
            const delta = this.#clock.getDelta();

            this.tick(delta);

            this.#controls.update();

            this.#renderer.render(this.#scene, this.#camera);
        });
    }

    stop() {
        this.#renderer.setAnimationLoop(null);
    }
}

export { ControlLoop }