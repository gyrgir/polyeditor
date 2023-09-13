import { Group, MeshBasicMaterial, Mesh, SphereGeometry } from "three";

import { createLabel } from "./createLabel";

function createVertexLabels(polyhedron, positionScale = 1.2) {
    const labels = new Group();
    for (let [i, vertex] of polyhedron.vertices.entries()) {
        const label = createLabel(i.toString());
        label.position.copy(vertex);
        label.position.multiplyScalar(positionScale);
        labels.add(label);
    }
    return labels;
}

function createFaceLabels(polyhedron, positionScale = 1.2) {
    const labels = new Group();
    const s = new SphereGeometry(0.1, 8, 8);
    const mat = new MeshBasicMaterial({color: "orange"});
    for (let i = 0; i < polyhedron.faces.length; i += 1) {
        const label = createLabel(i.toString(), 'orange');
        label.position.copy(polyhedron.getCenter(i));
        label.position.multiplyScalar(positionScale);
        labels.add(label);

        const obj = new Mesh(s, mat);
        obj.position.copy(polyhedron.getCenter(i));
        labels.add(obj)
    }
    return labels;
}

export { createVertexLabels, createFaceLabels }