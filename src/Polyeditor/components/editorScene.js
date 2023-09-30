import { Color, Scene } from 'three';

function createScene() {
    const scene = new Scene();

    scene.background = new Color(0xdddddd);

    return scene;
}

export { createScene }