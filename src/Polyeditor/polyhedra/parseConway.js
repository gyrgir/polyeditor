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

const operations = {
    a: (shape) => shape.ambo(),
    d: (shape) => shape.dual(),
    k: (shape) => shape.kis(),
    b: (shape) => shape.ambo().dual().kis().dual(), // bevel
    e: (shape) => shape.ambo().ambo(),              // expand
    g: (shape) => shape.snub().dual(),              // gyro
    j: (shape) => shape.ambo().dual(),              // join
    m: (shape) => shape.ambo().dual().kis(),        // meta
    n: (shape) => shape.dual().kis(),               // needle
    o: (shape) => shape.ambo().ambo().dual(),       // ortho
    s: (shape) => shape.snub(),                     // snub
    t: (shape) => shape.dual().kis().dual(),        // truncate
    z: (shape) => shape.kis().dual()                // zip
}


function baseShape(key) {
    return new Polyhedron(baseShapes[key]);
}


function cleanInput(input) {
    const steps = [...input.trim()].reverse();
    const cleaned = [];
    let i = 0;

    for (; i < steps.length; i++) {
        let shape = steps[i].toUpperCase();
        if (Object.hasOwn(baseShapes, shape)) {
            cleaned.push(shape);
            break;
        } else {
            console.error('Unknown shape "' + steps[i] + '"');
        }
    }
    i++;

    for (; i < steps.length; i++) {
        let operation = steps[i].toLowerCase();
        if (Object.hasOwn(operations, operation)) {
            cleaned.push(operation);
        } else {
            console.error('Unknown operation "' + steps[i] + '"');
        }
    }

    return cleaned;
}


function parseConway(input) {
    const steps = cleanInput(input);
    let shape = baseShape(steps[0]);
    for (const step of steps.slice(1)) {
        shape = operations[step](shape);
    }

    return [shape, steps.reverse().join('')];
}

export { parseConway }