import { tetrahedron } from "./tetrahedron";
import { cube } from "./cube";
import { octahedron } from "./octahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";

import { Polyhedron } from "./Polyhedron";

const baseShapes = {
    T: tetrahedron,
    C: cube,
    O: octahedron,
    D: dodecahedron,
    I: icosahedron
}

function getBaseShape(input) {
    const key = input.toUpperCase();
    if (Object.hasOwn(baseShapes, key)) {
        return [new Polyhedron(baseShapes[key]), key];
    }

    console.error('Unknown shape "' + input + '"');
    return [new Polyhedron({vertices: [], faces: []}), ''];
}

const operations = {
    a: (shape) => shape.ambo(),
    d: (shape) => shape.dual(),
    k: (shape) => shape.kis(),
    b: (shape) => shape.ambo().dual().kis().dual(), // bevel
    e: (shape) => shape.ambo().ambo(),              // expand
    j: (shape) => shape.ambo().dual(),              // join
    m: (shape) => shape.ambo().dual().kis(),        // meta
    n: (shape) => shape.dual().kis(),               // needle
    o: (shape) => shape.ambo().ambo().dual(),       // ortho
    t: (shape) => shape.dual().kis().dual(),        // truncate
    z: (shape) => shape.kis().dual()                // zip
}

function applyOperation(operation, shape) {
    const op = operation.toLowerCase()
    if (Object.hasOwn(operations, op)) {
        return [operations[op](shape), op];
    }

    console.error('Unknown operation "' + operation + '"');
    return [shape, ''];
}

function parseConway(input) {
    const steps = [...input.trim()].reverse();
    let [shape, label] = getBaseShape(steps[0]);
    let op;
    for (let i = 1; i < steps.length; i+= 1) {
        [shape, op] = applyOperation(steps[i], shape);
        label = op + label;
    }
    return [shape, label];
}

export { parseConway }