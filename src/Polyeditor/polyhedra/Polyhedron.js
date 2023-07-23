import { Vector3 } from 'three';
import { EdgeData } from './EdgeData';
import { polygonSort } from './utilities/polygonSort';

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
        const neighbors = new Array(this.vertices.length);
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
        return polygonSort(faces, vertex, (i) => this.getCenter(i));
    }

    ambo() {
        const edgeData = new EdgeData(this);

        const midEdges = edgeData.edges().map(([a, b]) => {
            const v = this.vertices[a].clone();
            return v.lerp(this.vertices[b], 0.5);
        });

        const centerFaces = this.faces.map((face) => {
            const centerFace = new Array(face.length);
            const last = face.length - 1;
            centerFace[0] = edgeData.getEdgeIndex(edgeData.edgeKey(face[last], face[0]));
            for (let i = 0; i < last; i += 1) {
                centerFace[i+1] = edgeData.getEdgeIndex(edgeData.edgeKey(face[i], face[i+1]));
            }
            return centerFace;
        });
        const vertexFaces = edgeData.vertexEdges.map((edges, index) => {
            const face = edges.map((edge) => edgeData.getEdgeIndex(edge));
            return polygonSort(face, this.vertices[index], (j) => midEdges[j].clone());
        });

        const p = new Polyhedron({
            vertices: midEdges,
            faces: [...centerFaces, ...vertexFaces]
        });
        return p;
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