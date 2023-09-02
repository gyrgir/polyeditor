import { PerspectiveCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000);
    camera.position.set(3, 4, 6);

    return camera;
}

export { createCamera }