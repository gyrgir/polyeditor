import { createLabel } from "./createLabel";

function addVertexLabels(polyhedron, scene) {
    const positionScale = 1.2;
    let i = 0;
    for (const vertex of polyhedron.vertices) {
        const label = createLabel(i.toString());
        label.position.copy(vertex);
        label.position.multiplyScalar(positionScale);
        scene.add(label);

        i += 1;
    }
}

function addFaceLabels(polyhedron, scene) {
    const positionScale = 1.2;
    let i = 0;
    for (const face of polyhedron.faces) {
        const label = createLabel(i.toString(), 'orange');
        label.position.copy(polyhedron.getCenter(i));
        label.position.multiplyScalar(positionScale);
        scene.add(label);

        i += 1;
    }
}

export { addVertexLabels, addFaceLabels }