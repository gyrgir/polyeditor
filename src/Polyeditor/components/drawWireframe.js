import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments } from "three";

function drawWireframe(polyhedron) {
    const geometry = new BufferGeometry();

    const positions = []
    for (const vertex of polyhedron.vertices) {
        positions.push(vertex.x, vertex.y, vertex.z)
    }

    const indices = []
    for (const [a, b] of polyhedron.edgeData.edges()) {
        indices.push(a, b);
    }

    geometry.setIndex(indices);
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    const material = new LineBasicMaterial();
    material.opacity = 0.50;
    material.transparent = true;
    //material.depthTest = false;

    return new LineSegments(geometry, material);
}

export { drawWireframe };