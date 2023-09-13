import { Polyeditor } from "./Polyeditor/Polyeditor";
import { randomShape } from "./Polyeditor/interface/randomShape";

function wireToggle(identifier, updateFunction, initial = null) {
    const toggle = document.getElementById(identifier);
    if (initial !== null) {
        toggle.checked = initial;
    }

    updateFunction(toggle.checked);
    toggle.addEventListener("change", (event) => { updateFunction(event.target.checked); });
}

function wireInput(identifier, updateFunction, initial = null) {
    const input = document.getElementById(identifier);
    if (initial !== null) {
        input.value = initial;
    }

    updateFunction(input.value);
    input.addEventListener("change", (event) => { updateFunction(event.target.value); });
}

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.start();

    const urlParams = new URLSearchParams(window.location.search);

    wireInput(
        "polyhedra-input",
        (value) => { polyeditor.generate(value); },
        urlParams.has('p') ? urlParams.get('p') : randomShape());

    wireToggle(
        "polyhedra-scale-mode",
        (value) => { polyeditor.verticesOnSphere = value; },
        urlParams.has('s') && urlParams.get('s') !== '0');

    wireToggle("polyhedra-face-mode", (value) => { polyeditor.smoothNormals = value; });

    wireToggle("polyhedra-vertex-labels", (value) => { polyeditor.updateVertexLabels(value); });
    wireToggle("polyhedra-face-labels", (value) => { polyeditor.updateFaceLabels(value); });
    wireToggle("polyhedra-wireframe", (value) => { polyeditor.updateWireframe(value); });
}

main().catch((err) => {
    console.error(err);
});