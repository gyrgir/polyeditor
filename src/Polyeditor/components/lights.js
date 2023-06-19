import {
    DirectionalLight,
    HemisphereLight
} from 'three';

function createLights() {
    const mainLight = new DirectionalLight('white', 3);
    mainLight.position.set(0, 0, 50);

    const secondaryLight = new HemisphereLight('white', 'skyblue', 2);

    return { mainLight, secondaryLight };
}

export { createLights };