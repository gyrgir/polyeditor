import { Color, Scene } from 'three';

import { createLights } from './lights';
import { addPolyhedron } from './polyhedron';

function createScene() {
    const scene = new Scene();

    const { mainLight, secondaryLight } = createLights();
    //const polyhedron = createPolyhedron();
    scene.add(mainLight, secondaryLight);//, polyhedron);
    addPolyhedron(scene);

    scene.background = new Color("skyblue");

    return scene;
}

export { createScene }