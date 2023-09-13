import { BufferGeometry, Float32BufferAttribute, Mesh, MeshNormalMaterial } from 'three';

function triangulateRoughFaces(polyhedron) {
    let vertices = []
    for (const [faceIndex, face] of polyhedron.faces.entries()) {
        if (face.length === 3) {
            vertices.push(...polyhedron.vertices[face[0]]);
            vertices.push(...polyhedron.vertices[face[1]]);
            vertices.push(...polyhedron.vertices[face[2]]);
        } else {
            const center = polyhedron.getCenter(faceIndex);
            for (let i = 0, j = face.length - 1; i < face.length; j = i, i++) {
                vertices.push(...center);
                vertices.push(...polyhedron.vertices[face[j]]);
                vertices.push(...polyhedron.vertices[face[i]]);
            }
        }
    }

    return vertices;
}


function triangulateSmoothFaces(polyhedron) {
    let vertices = []
    let indices = []
    let index = 0;
    for (const [faceIndex, face] of polyhedron.faces.entries()) {

        for (const vertexIndex of face) {
            vertices.push(...polyhedron.vertices[vertexIndex]);
        }

        if (face.length === 3) {
            indices.push(index, index+1, index+2);
            index += 3;
        } else {
            vertices.push(...polyhedron.getCenter(faceIndex));
            const length = face.length;
            for (let i = 0, j = length - 1; i < length; j = i, i++) {
                indices.push(index + j, index + i, index + length);
            }
            index += length + 1;
        }
    }

    return [vertices, indices];
}


function drawPolyhedron(polyhedron, smoothFaces=true) {
    //const material = new MeshStandardMaterial({
    //    color: "purple",
    //});
    const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();

    if (smoothFaces) {
        const [positions, indices] = triangulateSmoothFaces(polyhedron);
        geometry.setIndex(indices);
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    } else {
        const positions = triangulateRoughFaces(polyhedron);
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    }

    geometry.computeVertexNormals();

    const object = new Mesh(geometry, material);

    return object;
}

export { drawPolyhedron }