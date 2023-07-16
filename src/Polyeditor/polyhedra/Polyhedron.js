import { Vector3 } from 'three';

class Polyhedron {

    constructor({nodes, faces, nodeFaces = undefined}) {
        this.nodes = []
        for (const coordinates of nodes) {
            this.nodes.push(new Vector3(...coordinates));
        }

        this.faces = faces;
        this.nodeFaces = nodeFaces || this.calculateNeighborFaces();
    }

    getCenter(faceIndex) {
        const face = this.faces[faceIndex];
        let center = face.reduce(
            (previous, current) => { return previous.add(this.nodes[current]); },
            new Vector3(0, 0, 0));
        return center.multiplyScalar(1.0 / face.length);
    }

    calculateNeighborFaces() {
        const neighbors = new Array(this.nodes.length)
        let i = 0;
        for (const face of this.faces) {
            for (const nodeIndex of face) {
                neighbors[nodeIndex] ||= [];
                neighbors[nodeIndex].push(i);
            }
            i += 1;
        }
        return neighbors;
    }

}

export { Polyhedron };