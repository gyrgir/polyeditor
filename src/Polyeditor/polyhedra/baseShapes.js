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

export { getBaseShape }