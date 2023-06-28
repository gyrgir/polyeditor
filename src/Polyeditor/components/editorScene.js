import { Color, Scene } from 'three';

import { createLights } from './lights';

function createScene() {
    const scene = new Scene();

    const { mainLight, secondaryLight } = createLights();
    scene.add(mainLight, secondaryLight);

    scene.background = new Color("skyblue");

    return scene;
}

export { createScene }