import { BufferGeometry, Float32BufferAttribute, Mesh, MeshNormalMaterial } from 'three';

import { addNodeLabels } from './labels';

function triangulateFaces(polyhedron) {
    let vertices = []
    let faceIndex = 0;
    for (const face of polyhedron.faces) {
        switch (face.length) {
            case 3:
                vertices.push(...polyhedron.nodes[face[0]]);
                vertices.push(...polyhedron.nodes[face[1]]);
                vertices.push(...polyhedron.nodes[face[2]]);
                break;
            case 4:
                vertices.push(...polyhedron.nodes[face[0]]);
                vertices.push(...polyhedron.nodes[face[1]]);
                vertices.push(...polyhedron.nodes[face[2]]);
                vertices.push(...polyhedron.nodes[face[0]]);
                vertices.push(...polyhedron.nodes[face[2]]);
                vertices.push(...polyhedron.nodes[face[3]]);
                break;
            default:
                const center = polyhedron.getCenter(faceIndex);
                const last = face.length - 1;
                vertices.push(...center);
                vertices.push(...polyhedron.nodes[face[last]]);
                vertices.push(...polyhedron.nodes[face[0]]);
                for (let i = 0; i < last; i += 1) {
                    vertices.push(...center);
                    vertices.push(...polyhedron.nodes[face[i]]);
                    vertices.push(...polyhedron.nodes[face[i+1]]);
                }
                break;
        }
        faceIndex += 1;
    }

    return vertices;
}


function drawPolyhedron(polyhedron) {
    //const material = new MeshStandardMaterial({
    //    color: "purple",
    //});
    const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();

    const positions = triangulateFaces(polyhedron);

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();

    const object = new Mesh(geometry, material);

    addNodeLabels(polyhedron, object);

    return object;
}

export { drawPolyhedron }