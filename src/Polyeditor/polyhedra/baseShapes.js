import { tetrahedron } from "./tetrahedron";
import { cube } from "./cube";
import { octahedron } from "./octahedron";
import { dodecahedron } from "./dodecahedron";
import { icosahedron } from "./icosahedron";

function getBaseShape(input) {
    switch (input) {
        case "t":
            return tetrahedron;
        case "c":
            return cube;
        case "o":
            return octahedron;
        case "d":
            return dodecahedron;
        case "i":
            return icosahedron;
        default:
            console.error('Unknown shape "' + input + '"');
    }
}

export { getBaseShape }