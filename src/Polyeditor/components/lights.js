import {
    DirectionalLight,
    HemisphereLight
} from 'three';

function createLights() {
    const mainLight = new DirectionalLight(0xffffff, 1);

    const secondaryLight = new HemisphereLight(0xa0a0a0, 0x808080, 1);

    return { mainLight, secondaryLight };
}

export { createLights };