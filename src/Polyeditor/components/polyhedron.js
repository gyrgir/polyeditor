import { BufferGeometry, Float32BufferAttribute, Mesh, MeshNormalMaterial } from 'three';

import { cube } from '../polyhedra/cube'
import { tetrahedron } from '../polyhedra/tetrahedron'
import { octahedron } from '../polyhedra/octahedron'
import { icosahedron } from '../polyhedra/icosahedron'
import { dodecahedron } from '../polyhedra/dodecahedron'

import { addNodeLabels } from './nodeLabels';

function centerNode(face, nodes) {
    let center = face.reduce(
        (prev, i) => {
            const val = nodes[i];
            return [prev[0]+val[0], prev[1]+val[1], prev[2]+val[2]];
        },
        [0.0, 0.0, 0.0]);
    let w = 1.0 / face.length;
    return [w*center[0], w*center[1], w*center[2]];
}

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
                const center = centerNode(face, nodes);
                const last = face.length - 1;
                vertices.push(...center);
                vertices.push(...nodes[face[last]]);
                vertices.push(...nodes[face[0]]);
                for (let i = 0; i < last; i += 1) {
                    vertices.push(...center);
                    vertices.push(...nodes[face[i]]);
                    vertices.push(...nodes[face[i+1]]);
                }
                break;
        }
    }

    return vertices;
}

function addPolyhedron(scene) {
    //const material = new MeshStandardMaterial({
    //    color: "purple",
    //});
    const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();

    const positions = triangulate(dodecahedron);

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();

    const object = new Mesh(geometry, material);

    scene.add(object);
    addNodeLabels(dodecahedron, scene);
    //return object;
}

export { addPolyhedron }