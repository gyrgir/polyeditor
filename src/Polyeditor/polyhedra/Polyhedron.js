import { Vector3 } from 'three';
import { EdgeData } from './EdgeData';
import { polygonSort } from './utilities/polygonSort';

class Polyhedron {

    #edgeData;
    get edgeData() {
        if (!this.#edgeData) {
            this.#edgeData = new EdgeData(this);
        }
        return this.#edgeData;
    }

    constructor({vertices, faces, vertexFaces = undefined, vertexColors = undefined, faceColors = undefined}) {
        this.vertices = Array(vertices.length);
        for (const [i, coordinates] of vertices.entries()) {
            this.vertices[i] = new Vector3(...coordinates);
        }

        this.faces = faces;
        this.vertexFaces = vertexFaces || this.calculateVertexFaces();
        this.vertexColors = vertexColors || this.vertices.map(() => '0');
        this.faceColors = faceColors || this.faces.map(() => '0');
    }

    getCenter(faceIndex) {
        const face = this.faces[faceIndex];
        let center = face.reduce(
            (previous, current) => previous.add(this.vertices[current]),
            new Vector3(0, 0, 0));
        return center.multiplyScalar(1.0 / face.length);
    }

    getCenters() {
        return this.faces.map((_, index) => this.getCenter(index));
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
        return polygonSort(faces, vertex, i => this.getCenter(i));
    }

    ambo() {
        const edgeData = this.edgeData;

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
            faces: [...centerFaces, ...vertexFaces],
            vertexColors: edgeData.edges().map(([a, b]) => {
                const aLabel = this.vertexColors[a];
                const bLabel = this.vertexColors[b];
                let label;
                if (aLabel === bLabel) {
                    label = aLabel;
                } else if (aLabel < bLabel) {
                    label = aLabel + bLabel;
                } else {
                    label = bLabel + aLabel;
                }
                return 'ae' + label;
            }),
            faceColors: [
                ...this.faceColors.map((l) => 'ac' + l),
                ...this.vertexColors.map((l) => 'av' + l)
            ]
        });
        console.log(this.vertices.length)
        return p;
    }

    dual() {
        const p = new Polyhedron({
            vertices: this.getCenters(),
            faces: this.vertexFaces,
            vertexFaces: this.faces,
            vertexColors: this.faceColors,
            faceColors: this.vertexColors,
        });
        return p;
    }

    kis() {
        const offset = this.vertices.length;

        const p = new Polyhedron({
            vertices: [...this.vertices, ...this.getCenters()],
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
            ).reduce((prev, current) => [...prev, ...current], []),
            vertexColors: [
                ...this.vertexColors.map((l) => 'kv' + l),
                ...this.faceColors.map((l) => 'kc' + l)],
            faceColors: this.faceColors.map(
                (l, i) => { return this.faces[i].map(() => 'kf' + l) }
            ).reduce(
                (p, n) => [...p, ...n], [])
        });
        return p
    }

    scaleToRadius(newRadius) {
        const maxRadius = this.vertices.reduce(
            (prev, next) => Math.max(prev, next.length()), 0.0);
        const factor = newRadius / maxRadius;

        return new Polyhedron({
            vertices: this.vertices.map((vertex) => {
                return vertex.clone().multiplyScalar(factor);
            }),
            faces: this.faces,
            vertexFaces: this.vertexFaces,
            vertexColors: this.vertexColors,
            faceColors: this.faceColors
        });
    }

    verticesToSphere(newRadius) {
        return new Polyhedron({
            vertices: this.vertices.map((vertex) => {
                return vertex.clone().setLength(newRadius);
            }),
            faces: this.faces,
            vertexFaces: this.vertexFaces,
            vertexColors: this.vertexColors,
            faceColors: this.faceColors
        });
    }
}

export { Polyhedron };