import { Vector3 } from 'three';

function det(a, b, c) {
    return a.x * (b.y*c.z - b.z*c.y) + a.y * (b.z*c.x - b.x*c.z) + a.z * (b.x*c.y - b.y*c.x);
}

class Polyhedron {

    constructor({vertices, faces, vertexFaces = undefined}) {
        this.vertices = []
        for (const coordinates of vertices) {
            this.vertices.push(new Vector3(...coordinates));
        }

        this.faces = faces;
        this.vertexFaces = vertexFaces || this.calculateVertexFaces();
        //console.log(this.vertexFaces)
    }

    getCenter(faceIndex) {
        const face = this.faces[faceIndex];
        let center = face.reduce(
            (previous, current) => { return previous.add(this.vertices[current]); },
            new Vector3(0, 0, 0));
        return center.multiplyScalar(1.0 / face.length);
    }

    calculateVertexFaces() {
        const neighbors = new Array(this.vertices.length)
        let i = 0;
        for (const face of this.faces) {
            for (const vertex of face) {
                neighbors[vertex] ||= [];
                neighbors[vertex].push(i);
            }
            i += 1;
        }
        for (const [i, faces] of neighbors.entries()) {
            faces.sort(this.faceSortKey(this.vertices[i]))
        }
        return neighbors;
    }

    faceSortKey(vertex) {
        // sort faces clockwise around the vertex radius
        // TODO: precomputing centers is a performance improvement here
        return (a, b) => {
            const ca = this.getCenter(a);
            const cb = this.getCenter(b);
            return det(ca, cb, vertex);
        }
    }

}

export { Polyhedron };