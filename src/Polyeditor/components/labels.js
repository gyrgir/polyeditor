import { createLabel } from "./createLabel";

function addNodeLabels(polyhedron, scene) {
    const positionScale = 1.2;
    let i = 0;
    for (const node of polyhedron.nodes) {
        const label = createLabel(i.toString());
        label.position.copy(node);
        label.position.multiplyScalar(positionScale);
        scene.add(label);

        i += 1;
    }
}

export { addNodeLabels }