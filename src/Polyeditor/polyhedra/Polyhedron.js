import { Matrix3, Vector3 } from 'three';

function orthonormalTransform(normal, pointOnPlane) {
    const n = normal.clone();
    n.normalize();

    const u = pointOnPlane.clone();
    u.projectOnPlane(n);
    u.normalize();

    const v = n.clone();
    v.cross(u);

    const transform = new Matrix3(n.x, n.y, n.z, u.x, u.y, u.z, v.x, v.y, v.z);
    return transform;
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

        for (let i = 0; i < neighbors.length; i += 1) {
            neighbors[i] = this.sortVertexFaces(this.vertices[i], neighbors[i]);
        }
        return neighbors;
    }

    sortVertexFaces(vertex, faces) {
        const transform = orthonormalTransform(vertex, this.getCenter(faces[0]));

        const centers = faces.map((face) => {
            const v = this.getCenter(face);
            v.applyMatrix3(transform);
            return {face, ...v};
        })

        centers.sort((a, b) => {
            // vertices on different halves
            if (a.z * b.z < 0) {
                // first half (z > 0) vertices before second half (z < 0) vertices
                return b.z - a.z
            }
            // vertices on the first half
            if (a.z > 0 || (a.z == 0 && b.z >= 0)) {
                return b.y - a.y
            }
            // second half
            return a.y - b.y
        });

        return centers.map((x) => x.face);
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