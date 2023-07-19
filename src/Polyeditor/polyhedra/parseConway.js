import { tetrahedron } from "./tetrahedron";
import { cube } from "./cube";
import { octahedron } from "./octahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";

import { Polyhedron } from "./Polyhedron";

function getBaseShape(input) {
    switch (input) {
        case "t":
            return new Polyhedron(tetrahedron);
        case "c":
            return new Polyhedron(cube);
        case "o":
            return new Polyhedron(octahedron);
        case "d":
            return new Polyhedron(dodecahedron);
        case "i":
            return new Polyhedron(icosahedron);
        default:
            console.error('Unknown shape "' + input + '"');
    }
}

function applyOperation(operation, shape) {
    switch (operation) {
        case "d":
            return shape.dual();
        case "k":
            return shape.kis();
        default:
            console.error('Unknown operation "' + operation + '"');
    }
}

function parseConway(input) {
    const steps = [...input].reverse();
    let shape = getBaseShape(steps[0]);
    for (let i = 1; i < steps.length; i+= 1) {
        shape = applyOperation(steps[i], shape);
    }
    return shape;
}

export { parseConway }