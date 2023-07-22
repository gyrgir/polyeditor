import { Polyeditor } from "./Polyeditor/Polyeditor";

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.start();

    const polyhedraInput = document.getElementById("polyhedra-input");
    polyeditor.generate(polyhedraInput.value);

    polyhedraInput.addEventListener('change', (event) => {
        polyeditor.generate(event.target.value);
    })

    const vertexLabelsInput = document.getElementById("polyhedra-vertex-labels");
    polyeditor.updateVertexLabels(vertexLabelsInput.checked);

    vertexLabelsInput.addEventListener('change', () => {
        polyeditor.updateVertexLabels(vertexLabelsInput.checked)
    });

    const faceLabelsInput = document.getElementById("polyhedra-face-labels");
    polyeditor.updateFaceLabels(faceLabelsInput.checked);

    faceLabelsInput.addEventListener('change', () => {
        polyeditor.updateFaceLabels(faceLabelsInput.checked)
    });

    const wireframeInput = document.getElementById("polyhedra-wireframe");
    polyeditor.updateWireframe(wireframeInput.checked);

    wireframeInput.addEventListener('change', () => {
        polyeditor.updateWireframe(wireframeInput.checked)
    });
}

main().catch((err) => {
    console.error(err);
});