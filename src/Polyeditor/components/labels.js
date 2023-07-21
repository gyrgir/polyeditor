import { createLabel } from "./createLabel";

import { WireframeGeometry, LineSegments, SphereGeometry, MeshBasicMaterial, Mesh } from "three";

function addVertexLabels(polyhedron, parent) {
    const positionScale = 1.2;
    for (let [i, vertex] of polyhedron.vertices.entries()) {
        const label = createLabel(i.toString());
        label.position.copy(vertex);
        label.position.multiplyScalar(positionScale);
        parent.add(label);
    }
}

function addFaceLabels(polyhedron, parent) {
    const positionScale = 1.2;
    for (let i = 0; i < polyhedron.faces.length; i += 1) {
        const label = createLabel(i.toString(), 'orange');
        label.position.copy(polyhedron.getCenter(i));
        label.position.multiplyScalar(positionScale);
        parent.add(label);

        const s = new SphereGeometry(0.1, 8, 8);
        const mat = new MeshBasicMaterial();
        const obj = new Mesh(s, mat);
        obj.position.copy(polyhedron.getCenter(i));
        parent.add(obj)
    }
}

function drawWireframe(geometry, parent) {
    const wireframe = new WireframeGeometry(geometry);
    const line = new LineSegments( wireframe );
    //line.material.depthTest = false;
    line.material.opacity = 0.50;
    line.material.transparent = true;

    parent.add( line );
}

export { addVertexLabels, addFaceLabels, drawWireframe }