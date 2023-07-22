import { BufferGeometry, Float32BufferAttribute, Mesh, MeshNormalMaterial } from 'three';

import { addVertexLabels, addFaceLabels, drawWireframe } from './helpers';

function triangulateFaces(polyhedron) {
    let vertices = []
    for (const [faceIndex, face] of polyhedron.faces.entries()) {
        switch (face.length) {
            case 3:
                vertices.push(...polyhedron.vertices[face[0]]);
                vertices.push(...polyhedron.vertices[face[1]]);
                vertices.push(...polyhedron.vertices[face[2]]);
                break;
            case 4:
                vertices.push(...polyhedron.vertices[face[0]]);
                vertices.push(...polyhedron.vertices[face[1]]);
                vertices.push(...polyhedron.vertices[face[2]]);
                vertices.push(...polyhedron.vertices[face[0]]);
                vertices.push(...polyhedron.vertices[face[2]]);
                vertices.push(...polyhedron.vertices[face[3]]);
                break;
            default:
                const center = polyhedron.getCenter(faceIndex);
                const last = face.length - 1;
                vertices.push(...center);
                vertices.push(...polyhedron.vertices[face[last]]);
                vertices.push(...polyhedron.vertices[face[0]]);
                for (let i = 0; i < last; i += 1) {
                    vertices.push(...center);
                    vertices.push(...polyhedron.vertices[face[i]]);
                    vertices.push(...polyhedron.vertices[face[i+1]]);
                }
                break;
        }
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

    addVertexLabels(polyhedron, object);
    addFaceLabels(polyhedron, object);

    return object;
}

export { drawPolyhedron }