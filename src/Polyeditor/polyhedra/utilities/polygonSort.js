import { Matrix3 } from "three";

const zeroTolerance = 1e-6;

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
    if (!indices.length) return [];

    const transform = orthonormalTransform(planeNormal, coordinateGetter(indices[0]));

    const points = indices.map((index) => {
        const v = coordinateGetter(index);
        v.applyMatrix3(transform);
        return {index, ...v};
    })

    points.sort((a, b) => {
        // if either point is the reference point, it goes first
        if (Math.abs(a.z) < zeroTolerance && a.y > 0.0) return -1;
        if (Math.abs(b.z) < zeroTolerance && b.y > 0.0) return 1;
        // vertices on different halves
        if (a.z * b.z <= 0) {
            // first half (z >= 0) vertices before second half (z < 0) vertices
            return b.z - a.z
        }
        // vertices on the first half: increasing y
        // second half: decreasing y
        return (b.y - a.y) * (a.z > 0 ? 1 : -1)
    });

    return points.map((x) => x.index);
}

export { polygonSort }