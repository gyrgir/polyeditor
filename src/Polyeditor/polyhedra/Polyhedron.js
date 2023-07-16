import { Vector3 } from 'three';

class Polyhedron {

    constructor({nodes, faces, nodeFaces: None}) {
        this.nodes = []
        for (const coordinates of nodes) {
            this.nodes.push(new Vector3(...coordinates));
        }

        this.faces = faces;
    }

    getCenter(faceIndex) {
        let center = this.faces[faceIndex].reduce(
            (previous, current) => { return previous.add(this.nodes[current]); },
            new Vector3(0, 0, 0));
        return center.multiplyScalar(1.0 / this.faces[faceIndex].length);
    }

}

export { Polyhedron };