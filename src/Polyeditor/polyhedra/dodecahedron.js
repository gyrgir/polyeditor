const phi = (1 + Math.sqrt(5)) / 2
const invPhi = 1/phi;

const dodecahedron = {
    nodes: [
        [0, -invPhi, -phi],
        [0, invPhi, -phi],
        [1, 1, -1],
        [phi, 0, -invPhi],
        [1, -1, -1],
        [invPhi, -phi, 0],
        [-invPhi, -phi, 0],
        [-1, -1, -1],
        [-phi, 0, -invPhi],
        [-1, 1, -1],
        [-invPhi, phi, 0],
        [invPhi, phi, 0],
        [-1, 1, 1],
        [1, 1, 1],
        [phi, 0, invPhi],
        [1, -1, 1],
        [-1, -1, 1],
        [-phi, 0, invPhi],
        [0, -invPhi, phi],
        [0, invPhi, phi],
    ],
    faces: [
        [0, 1, 2, 3, 4],
        [0, 4, 5, 6, 7],
        [0, 7, 8, 9, 1],
        [1, 9, 10, 11, 2],
        [10, 12, 19, 13, 11],
        [2, 11, 13, 14, 3],
        [3, 14, 15, 5, 4],
        [15, 18, 16, 6, 5],
        [16, 17, 8, 7, 6],
        [10, 9, 8, 17, 12],
        [12, 17, 16, 18, 19],
        [19, 18, 15, 14, 13]
    ]
}

export { dodecahedron }