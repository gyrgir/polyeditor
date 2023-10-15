import { Polyeditor } from "./Polyeditor/Polyeditor";
import { randomShape } from "./Polyeditor/interface/randomShape";

function wireToggle(identifier, updateFunction, initial = null) {
    const toggle = document.getElementById(identifier);
    if (toggle === null) {
        console.error(`No element with id "${identifier}" found`);
        return;
    }

    if (initial !== null) {
        toggle.checked = initial;
    }

    updateFunction(toggle.checked);
    toggle.addEventListener("change", (event) => { updateFunction(event.target.checked); });
}

function wireInput(identifier, updateFunction, initial = null) {
    const input = document.getElementById(identifier);
    if (input === null) {
        console.error(`No element with id "${identifier}" found`);
        return;
    }

    if (initial !== null) {
        input.value = initial;
    }

    updateFunction(input.value);
    input.addEventListener("change", (event) => { updateFunction(event.target.value); });
}

function displayStats(stats) {
    const container = document.getElementById("stats");
    container.innerHTML = `${stats.label}: ${stats.numVertices} vertices, ${stats.numFaces} faces, ${stats.numEdges} edges.`
}

function updateColorPickers(polyeditor) {
    const numberOfColors = polyeditor.numberOfColors;
    const colorControls = document.getElementById("color-controls");
    const colorPickers = colorControls.children;
    let numPickers = colorPickers.length;

    while (numPickers < numberOfColors) {
        const picker = colorPickers[0].cloneNode();
        picker.dataset.colorId = numPickers;
        colorControls.appendChild(picker);
        numPickers++;
    }

    const palette = polyeditor.colorPalette;
    for (const control of document.getElementById("color-controls").children) {
        if (control.dataset.colorId < numberOfColors) {
            control.value = `#${palette.getColor(control.dataset.colorId).getHexString()}`;
            control.classList.remove("hidden");
        } else {
            control.classList.add("hidden");
        }
    }
}

function wireColorPickers(className, updateFunction) {
    for (const picker of document.getElementsByClassName(className)) {
        picker.addEventListener("change", (event) => { updateFunction(event.target); });
    }
}

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.start();
    const urlParams = new URLSearchParams(window.location.search);

    function updateShape(value) {
        polyeditor.generate(value);
        displayStats(polyeditor.shapeStats);
        updateColorPickers(polyeditor);
    }

    wireInput(
        "polyhedra-input",
        updateShape,
        urlParams.has('p') ? urlParams.get('p') : randomShape(2, 4));

    wireToggle(
        "polyhedra-scale-mode",
        (value) => { polyeditor.verticesOnSphere = value; },
        urlParams.has('s') && urlParams.get('s') !== '0');

    wireToggle("polyhedra-face-mode", (value) => { polyeditor.smoothNormals = value; });

    //wireToggle("polyhedra-vertex-labels", (value) => { polyeditor.updateVertexLabels(value); });
    //wireToggle("polyhedra-face-labels", (value) => { polyeditor.updateFaceLabels(value); });
    wireToggle("polyhedra-wireframe", (value) => { polyeditor.updateWireframe(value); });

    wireColorPickers("color-picker", (target) => {
        polyeditor.setFaceColor(Number(target.dataset.colorId), target.value);
    });

    const input = document.getElementById("polyhedra-input");
    for (const shapeButton of document.getElementsByClassName("shape")) {
        shapeButton.addEventListener('click', (event) => {
            input.value = event.target.innerHTML;
            updateShape(input.value);
        });
    }

    for (const operationButton of document.getElementsByClassName("operation")) {
        operationButton.addEventListener('click', (event) => {
            input.value = event.target.innerHTML + input.value;
            updateShape(input.value);
        });
    }

    const randomInput = document.getElementById("random-input");
    randomInput.addEventListener('click', (event) => {
        event.preventDefault();
        input.value = randomShape();
        updateShape(input.value);
    });
}

main().catch((err) => {
    console.error(err);
});