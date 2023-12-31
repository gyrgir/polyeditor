import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { resize } from "./resize";

class ControlLoop {
    #camera;
    #clock;
    #controls;
    #renderer;
    #scene;
    #container;

    callbacks = [];

    constructor(camera, scene, renderer, container, minDistance = 3, maxDistance = 20) {
        this.#clock = new Clock();
        this.#camera = camera;
        this.#scene = scene;
        this.#renderer = renderer;
        this.#container = container;

        this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
        this.#controls.listenToKeyEvents(window);
        this.#controls.minDistance = minDistance;
        this.#controls.maxDistance = maxDistance
        this.#controls.enablePan = false;

        window.addEventListener('resize', () => {
            //TODO: think about throttling
            resize(this.#container, this.#camera, this.#renderer);
            this.#renderer.render(this.#scene, this.#camera);
        });
    }

    tick(delta) {
        for (const callback of this.callbacks) callback(delta);
    }

    start() {
        resize(this.#container, this.#camera, this.#renderer);
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