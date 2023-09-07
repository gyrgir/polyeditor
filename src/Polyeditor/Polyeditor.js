import { createCamera } from "./components/camera";
import { createRenderer } from "./components/createRenderer";
import { createScene } from "./components/editorScene";
import { createVertexLabels, createFaceLabels, createWireframe } from "./components/helpers"
import { drawPolyhedron } from "./components/drawPolyhedron";
import { ControlLoop } from "./components/ControlLoop";

import { parseConway } from "./polyhedra/parseConway";

class Polyeditor {

    #camera;
    #loop;
    #renderer;
    #scene;
    #polyhedron;
    #polyhedronData;

    #vertexLabels
    #faceLabels
    #wireframe

    constructor(container) {
        this.#camera = createCamera();
        this.#scene = createScene();
        this.#renderer = createRenderer();

        container.append(this.#renderer.domElement);

        this.#loop = new ControlLoop(this.#camera, this.#scene, this.#renderer, container);
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }

    generate(input, nodesToSphere = false) {
        const baseRadius = 2.0;
        if (this.#polyhedron) {
            this.#scene.remove(this.#polyhedron);
        }
        this.#polyhedronData = parseConway(input);
        if (nodesToSphere) {
            this.#polyhedronData.verticesToSphere(baseRadius);
        } else {
            this.#polyhedronData.setRadius(baseRadius);
        }
        this.#polyhedron = drawPolyhedron(this.#polyhedronData);
        this.#scene.add(this.#polyhedron);

        this.updateVertexLabels(this.#vertexLabels);
        this.updateFaceLabels(this.#faceLabels);
        this.updateWireframe(this.#wireframe);
    }

    updateVertexLabels(enabled) {
        if (this.#vertexLabels) {
            this.#scene.remove(this.#vertexLabels);
        }

        if (enabled) {
            this.#vertexLabels = createVertexLabels(this.#polyhedronData);
            this.#scene.add(this.#vertexLabels);
        }
        else {
            this.#vertexLabels = null;
        }
    }

    updateFaceLabels(enabled) {
        if (this.#faceLabels) {
            this.#scene.remove(this.#faceLabels);
        }

        if (enabled) {
            this.#faceLabels = createFaceLabels(this.#polyhedronData);
            this.#scene.add(this.#faceLabels);
        }
        else {
            this.#faceLabels = null;
        }
    }

    updateWireframe(enabled) {
        if (this.#wireframe) {
            this.#scene.remove(this.#wireframe);
        }

        if (enabled) {
            this.#wireframe = createWireframe(this.#polyhedron.geometry);
            this.#scene.add(this.#wireframe);
        }
        else {
            this.#wireframe = null;
        }
    }
}

export { Polyeditor }