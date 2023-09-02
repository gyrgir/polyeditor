import { tetrahedron } from "./tetrahedron";
import { cube } from "./cube";
import { octahedron } from "./octahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";

import { Polyhedron } from "./Polyhedron";

const baseRadius = 2.0;

function getBaseShape(input) {
    switch (input.toLowerCase()) {
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
            return new Polyhedron({vertices: [], faces: []});
    }
}

function applyOperation(operation, shape) {
    switch (operation.toLowerCase()) {
        case "a":
            return shape.ambo();
        case "d":
            return shape.dual();
        case "k":
            return shape.kis();
        case "b": // bevel
            return shape.ambo().dual().kis().dual();
        case "e": // expand
            return shape.ambo().ambo();
        case "j": // join
            return shape.ambo().dual();
        case "m": // meta
            return shape.ambo().dual().kis();
        case "n": // needle
            return shape.dual().kis();
        case "o": // ortho
            return shape.ambo().ambo().dual();
        case "t": // truncate
            return shape.dual().kis().dual();
        case "z": // zip
            return shape.kis().dual();
        default:
            console.error('Unknown operation "' + operation + '"');
            return shape;
    }
}

function parseConway(input) {
    const steps = [...input.trim()].reverse();
    let shape = getBaseShape(steps[0]);
    shape.setRadius(baseRadius);
    for (let i = 1; i < steps.length; i+= 1) {
        shape = applyOperation(steps[i], shape);
        shape.setRadius(baseRadius);
    }
    return shape;
}

export { parseConway }