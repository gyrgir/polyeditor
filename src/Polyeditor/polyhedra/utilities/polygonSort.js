import { Matrix3 } from "three";

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

function polygonSort(indices, planeNormal, coordinateGetter) {
    const transform = orthonormalTransform(planeNormal, coordinateGetter(indices[0]));

    const points = indices.map((index) => {
        const v = coordinateGetter(index);
        v.applyMatrix3(transform);
        return {index, ...v};
    })

    points.sort((a, b) => {
        // vertices on different halves
        if (a.z * b.z < 0) {
            // first half (z > 0) vertices before second half (z < 0) vertices
            return b.z - a.z
        }
        // vertices on the first half
        if (a.z > 0 ) {//|| (a.z == 0 && b.z >= 0)) {
            return b.y - a.y
        }
        // second half
        return a.y - b.y
    });

    return points.map((x) => x.index);
}

export { polygonSort }