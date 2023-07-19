import { createLabel } from "./createLabel";

function addVertexLabels(polyhedron, scene) {
    const positionScale = 1.2;
    for (let [i, vertex] of polyhedron.vertices.entries()) {
        const label = createLabel(i.toString());
        label.position.copy(vertex);
        label.position.multiplyScalar(positionScale);
        scene.add(label);

        i += 1;
    }
}

function addFaceLabels(polyhedron, scene) {
    const positionScale = 1.2;
    for (let i = 0; i < polyhedron.faces.length; i += 1) {
        const label = createLabel(i.toString(), 'orange');
        label.position.copy(polyhedron.getCenter(i));
        label.position.multiplyScalar(positionScale);
        scene.add(label);

        i += 1;
    }
}

export { addVertexLabels, addFaceLabels }