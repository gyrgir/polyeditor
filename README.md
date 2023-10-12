# PolyEditor

A polyhedron generator and visualizer using [three.js](https://threejs.org/)

Mostly an excuse to learn three.js, inspired by [polyHédronisme](https://levskaya.github.io/polyhedronisme/)

## Known issues

- Visualization fails for polyhedra that have non-convex faces. Compare for example gsnC with gddsnC. This happens because my face ordering algorithm (polygonSort.js) breaks down for non-convex polygons. I think that the robust way to fix it would be to rewrite the polyhedron data structure and operations using half-edges.

## Examples

These used to produce display glitches:

- [dkdac](https://gyrgir.github.io/polyeditor/?p=dkdac&s=1)
- [zkzzO](https://gyrgir.github.io/polyeditor/?p=zkzzO&s=1)
- [ezzzI](https://gyrgir.github.io/polyeditor/?p=ezzzI&s=1)
- [atenI](https://gyrgir.github.io/polyeditor/?p=atenI)
- [tekeO](https://gyrgir.github.io/polyeditor/?p=tekeO)
- [znnzI](https://gyrgir.github.io/polyeditor/?p=znnzI)