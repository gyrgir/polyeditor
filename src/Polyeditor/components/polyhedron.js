import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

function createPolyhedron() {
    const material = new MeshStandardMaterial({
        color: "purple",
    });
    const geometry = new BoxGeometry(2, 2, 2);

    const cube = new Mesh(geometry, material);

    return cube;
}

export { createPolyhedron }