import { Color, Scene } from 'three';

import { createLights } from './lights';
import { createPolyhedron } from './polyhedron';

function createScene() {
    const scene = new Scene();

    const { mainLight, secondaryLight } = createLights();
    const polyhedron = createPolyhedron();
    scene.add(mainLight, secondaryLight, polyhedron);

    scene.background = new Color("skyblue");

    return scene;
}

export { createScene }