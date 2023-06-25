import { BufferGeometry, Float32BufferAttribute, Mesh, MeshNormalMaterial } from 'three';

import { cube } from '../polyhedra/cube'
import { tetrahedron } from '../polyhedra/tetrahedron'
import { octahedron } from '../polyhedra/octahedron'

function triangulate({nodes, faces}) {
    let vertices = []
    for (const face of faces) {
        switch (face.length) {
            case 3:
                vertices.push(...nodes[face[0]]);
                vertices.push(...nodes[face[1]]);
                vertices.push(...nodes[face[2]]);
                break;
            case 4:
                vertices.push(...nodes[face[0]]);
                vertices.push(...nodes[face[1]]);
                vertices.push(...nodes[face[2]]);
                vertices.push(...nodes[face[0]]);
                vertices.push(...nodes[face[2]]);
                vertices.push(...nodes[face[3]]);
                break;
            default:
                console.error("Generic case not yet implemented");
        }
    }

    return vertices;
}

function createPolyhedron() {
    //const material = new MeshStandardMaterial({
    //    color: "purple",
    //});
    const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();

    const positions = triangulate(octahedron);

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();

    const object = new Mesh(geometry, material);

    return object;
}

export { createPolyhedron }