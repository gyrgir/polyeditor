import { WebGLRenderer } from 'three';

function createRenderer() {
    return new WebGLRenderer({antialias: true});
}

export { createRenderer }