import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createRenderer } from "./components/createRenderer";
import { createScene } from "./components/editorScene";
import { createVertexLabels, createFaceLabels } from "./components/helpers"
import { drawPolyhedron } from "./components/drawPolyhedron";
import { drawWireframe } from "./components/drawWireframe";
import { faceColors } from "./components/faceColors";
import { ControlLoop } from "./components/ControlLoop";
import { Palette } from "./components/Palette";

import { getName } from "./polyhedra/namedShapes";
import { parseConway } from "./polyhedra/parseConway";

class Polyeditor {

    #camera;
    #loop;
    #renderer;
    #scene;
    #polyhedron;
    #baseShape;
    #shape;

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

    #colorPalette;

    get colorPalette() {
        return this.#colorPalette
    }

    constructor(container) {
        this.#camera = createCamera();
        this.#scene = createScene();
        this.#renderer = createRenderer();

        let {mainLight, secondaryLight} = createLights();
        this.#camera.add(mainLight);
        mainLight.position.set(-5, 10, 0);

        this.#scene.add(this.#camera);
        this.#scene.add(secondaryLight);

        container.append(this.#renderer.domElement);

        this.#loop = new ControlLoop(this.#camera, this.#scene, this.#renderer, container);

        this.#colorPalette = new Palette([
            [1.0, 0.455, 0.0],
            [0.075, 0.275, 0.741],
            [0.0, 0.843, 0.0],
            [1.0, 0.114, 0.09]
        ]);
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

        this.#polyhedron = drawPolyhedron(this.#shape, this.#smoothNormals, this.#colorPalette);

        this.#scene.add(this.#polyhedron);

        this.updateVertexLabels(this.#vertexLabels);
        this.updateFaceLabels(this.#faceLabels);
        this.updateWireframe(this.#wireframe);
    }

    recolor() {
        this.#polyhedron.geometry.setAttribute(
            'color',
            faceColors(this.#shape, this.#smoothNormals, this.#colorPalette));
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

    setFaceColor(index, color) {
        this.#colorPalette.setColor(index, color);
        this.recolor();
    }

    get numberOfColors() {
        const labels = new Set(this.#shape.faceLabels);
        return labels.size;
    }

}

export { Polyeditor }