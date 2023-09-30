import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createRenderer } from "./components/createRenderer";
import { createScene } from "./components/editorScene";
import { createVertexLabels, createFaceLabels } from "./components/helpers"
import { drawPolyhedron } from "./components/drawPolyhedron";
import { drawWireframe } from "./components/drawWireframe";
import { ControlLoop } from "./components/ControlLoop";

import { getName } from "./polyhedra/namedShapes";
import { parseConway } from "./polyhedra/parseConway";
import { Group } from "three";

class Polyeditor {

    #camera;
    #loop;
    #renderer;
    #scene;
    #polyhedron;
    #baseShape;
    #shape;
    #mainLightRig;

    #vertexLabels;
    #faceLabels;
    #wireframe;
    #label;

    #verticesOnSphere;

    set verticesOnSphere(toggle) {
        this.#verticesOnSphere = toggle;
        this.draw();
    }
    get verticesOnSphere() {
        return this.#verticesOnSphere;
    }

    #smoothNormals;

    set smoothNormals(toggle) {
        this.#smoothNormals = toggle;
        this.draw();
    }
    get smoothNormals() {
        return this.#smoothNormals;
    }

    constructor(container) {
        this.#camera = createCamera();
        this.#scene = createScene();
        this.#renderer = createRenderer();

        let {mainLight, secondaryLight} = createLights();
        this.#mainLightRig = new Group();
        this.#mainLightRig.position.copy(this.#camera.position);
        this.#mainLightRig.add(mainLight);
        mainLight.position.set(0, 5, 2);

        this.#scene.add(this.#mainLightRig);
        this.#scene.add(secondaryLight);

        container.append(this.#renderer.domElement);

        this.#loop = new ControlLoop(this.#camera, this.#scene, this.#renderer, container);
        this.#loop.callbacks.push(() => {
            this.#mainLightRig.position.copy(this.#camera.position);
        })
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }

    generate(input) {
        [this.#baseShape, this.#label] = parseConway(input);
        this.draw();
    }

    draw() {
        if (!this.#baseShape) return;

        const radius = 2.0;
        this.#shape = this.#verticesOnSphere ? this.#baseShape.verticesToSphere(radius) : this.#baseShape.scaleToRadius(radius);

        if (this.#polyhedron) {
            this.#scene.remove(this.#polyhedron);
        }

        this.#polyhedron = drawPolyhedron(this.#shape, this.#smoothNormals);

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
            this.#vertexLabels = createVertexLabels(this.#shape);
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
            this.#faceLabels = createFaceLabels(this.#shape);
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
            this.#wireframe = drawWireframe(this.#shape);
            this.#scene.add(this.#wireframe);
        }
        else {
            this.#wireframe = null;
        }
    }

    get shapeStats() {
        const name = getName(this.#label)
        return {
            label: name ? `${name} (${this.#label})` : this.#label,
            numVertices: this.#shape.vertices.length,
            numFaces: this.#shape.faces.length,
            numEdges: this.#shape.edgeData.numEdges()
        }
    }
}

export { Polyeditor }