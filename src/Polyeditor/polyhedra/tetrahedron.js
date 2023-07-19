const tetrahedron = {
    vertices: [
        [ 1.0,  1.0,  1.0],
        [ 1.0, -1.0, -1.0],
        [-1.0,  1.0, -1.0],
        [-1.0, -1.0,  1.0],
    ],
    faces: [
        [0, 1, 2],
        [0, 3, 1],
        [0, 2, 3],
        [2, 1, 3],
    ]
}

export { tetrahedron }