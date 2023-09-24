import { BufferGeometry, Float32BufferAttribute, Mesh, MeshStandardMaterial, MeshNormalMaterial } from 'three';

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

function roughtVertexCount(face) {
    if (face.length === 3) return 3;

    return 3 * face.length;
}


function smoothVertexCount(face) {
    if (face.length === 3) return 3;

    return face.length + 1;
}


const palette = [
    [1.0, 0.455, 0.0],
    [0.075, 0.275, 0.741],
    [0.0, 0.843, 0.0],
    [1.0, 0.114, 0.09],
    [1.0, 1.0, 1.0],
    [0.1, 0.1, 0.1],
]

function vertexColors(polyhedron, countVertices) {
    let colors = {}
    let faceColors = []
    let color, numVertices, colorIndex = 0;

    for (const [faceIndex, face] of polyhedron.faces.entries()) {
        const label = polyhedron.faceColors[faceIndex];
        if (Object.hasOwn(colors, label)) {
            color = colors[label];
        } else {
            color = palette[colorIndex];
            colors[label] = color;
            colorIndex = (colorIndex + 1) % palette.length;
        }
        numVertices = countVertices(face);
        for (let count = 0; count < numVertices; count++) {
            faceColors.push(...color);
        }
    }

    return faceColors;
}

function drawPolyhedron(polyhedron, smoothFaces=true) {
    const material = new MeshStandardMaterial({
        vertexColors: true,
    });
    //const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();

    if (smoothFaces) {
        const [positions, indices] = triangulateSmoothFaces(polyhedron);
        geometry.setIndex(indices);
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    } else {
        const positions = triangulateRoughFaces(polyhedron);
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    }

    geometry.setAttribute('color', new Float32BufferAttribute(
        vertexColors(polyhedron, smoothFaces ? smoothVertexCount : roughtVertexCount), 3));

    geometry.computeVertexNormals();

    const object = new Mesh(geometry, material);

    return object;
}

export { drawPolyhedron }