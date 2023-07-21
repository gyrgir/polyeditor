import { Vector3 } from 'three';

function det(a, b, c) {
    return a.x * (b.y*c.z - b.z*c.y) + a.y * (b.z*c.x - b.x*c.z) + a.z * (b.x*c.y - b.y*c.x);
}

class Polyhedron {

    constructor({vertices, faces, vertexFaces = undefined}) {
        this.vertices = Array(vertices.length);
        for (const [i, coordinates] of vertices.entries()) {
            this.vertices[i] = new Vector3(...coordinates);
        }

        this.faces = faces;
        this.vertexFaces = vertexFaces || this.calculateVertexFaces();
    }

    getCenter(faceIndex) {
        const face = this.faces[faceIndex];
        let center = face.reduce(
            (previous, current) => previous.add(this.vertices[current]),
            new Vector3(0, 0, 0));
        return center.multiplyScalar(1.0 / face.length);
    }

    calculateVertexFaces() {
        const neighbors = new Array(this.vertices.length)
        for (const [i, face] of this.faces.entries()) {
            for (const vertex of face) {
                neighbors[vertex] ||= [];
                neighbors[vertex].push(i);
            }
        }

        for (const [i, faces] of neighbors.entries()) {
            faces.sort(this.faceSortKey(this.vertices[i]))
        }
        return neighbors;
    }

    faceSortKey(vertex) {
        // sort faces counterclockwise around the vertex radius
        // TODO: precomputing centers is a performance improvement here
        return (a, b) => {
            const ca = this.getCenter(a);
            const cb = this.getCenter(b);
            return det(cb, ca, vertex);
        }
    }

    dual() {
        const centers = this.faces.map((_, index) => this.getCenter(index));
        const p = new Polyhedron({
            vertices: centers, faces: this.vertexFaces
        })
        return p;
    }

    kis() {
        const centers = this.faces.map((_, index) => this.getCenter(index));
        const offset = this.vertices.length;

        const p = new Polyhedron({
            vertices: [...this.vertices, ...centers].map((vertex) => {
                vertex.setLength(2);
                return vertex}),
            faces: this.faces.map(
                (face, i) => {
                    const centerVertex = i + offset;
                    const last = face.length-1;
                    const newFaces = Array(face.length);
                    newFaces[0] = [face[last], face[0], centerVertex];
                    for (let j = 0; j < last; j += 1) {
                        newFaces[j+1] = [face[j], face[j+1], centerVertex];
                    }
                    return newFaces;
                }
            ).reduce((prev, current) => [...prev, ...current], [])
        })
        return p
    }
}

export { Polyhedron };