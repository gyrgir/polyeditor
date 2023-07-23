import { polygonSort } from "./utilities/polygonSort";

class EdgeData {

    vertexEdges;

    #edges;
    #numVertices;
    #edgeCounter;

    constructor({vertices, faces}) {
        this.#edgeCounter = 0;
        this.#numVertices = vertices.length;
        this.#edges = new Map();
        this.vertexEdges = Array(this.#numVertices);

        for (const face of faces) {
            const last = face.length - 1;
            this.addEdge(face[last], face[0]);
            for (let i = 0; i < last; i += 1) {
                this.addEdge(face[i], face[i+1]);
            }
        }

        for (let i = 0; i < this.#numVertices; i += 1) {
            this.vertexEdges[i] = polygonSort(
                this.vertexEdges[i],
                vertices[i],
                (edgeKey) => {
                    const j = this.getOtherVertex(i, edgeKey);
                    return vertices[j].clone();
                });
        }
    }

    addEdge(...edge) {
        const key = this.edgeKey(...edge);
        if (!this.#edges.has(key)) {
            this.#edges.set(key, this.#edgeCounter);
            this.#edgeCounter += 1;

            for (const vertex of edge) {
                this.vertexEdges[vertex] ||= [];
                this.vertexEdges[vertex].push(key);
            }
        }
    }

    edgeKey(i, j) {
        return i < j ? i*this.#numVertices + j : j*this.#numVertices + i;
    }

    getEdge(key) {
        const a = key % this.#numVertices;
        const b = (key - a) / this.#numVertices;
        return a < b ? [a, b] : [b, a]
    }

    edges() {
        let edges = [];
        for (const key of this.#edges.keys()) {
            edges.push(this.getEdge(key));
        }
        return edges;
    }

    getOtherVertex(index, key) {
        const edge = this.getEdge(key);
        return index === edge[0] ? edge[1] : edge[0];
    }

    getEdgeIndex(key) {
        return this.#edges.get(key);
    }
}

export { EdgeData }