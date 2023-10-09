import { Float32BufferAttribute } from "three"


function nonSmoothVertexCount(face) {
    if (face.length === 3) return 3;

    return 3 * face.length;
}


function smoothVertexCount(face) {
    if (face.length === 3) return 3;

    return face.length + 1;
}


function vertexColors(polyhedron, countVertices, palette) {
    let colors = {}
    let faceColors = []
    let color, numVertices, colorIndex = 0;

    for (const [faceIndex, face] of polyhedron.faces.entries()) {
        const label = polyhedron.faceLabels[faceIndex];
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


function faceColors(shape, smoothFaces, palette) {
    return new Float32BufferAttribute(
        vertexColors(
            shape,
            smoothFaces ? smoothVertexCount : nonSmoothVertexCount,
            palette),
        3);
}

export { faceColors }