import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

function onLoad(font) {
    console.log(font);
}

function onProgress(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded');
}

function onError(err) {
    console.log(err);
}

function addNodeLabels(polyhedron, scene) {
    const loader = new FontLoader();
    const material = new MeshStandardMaterial({color: 0x000000});
    const positionScale = 1.2;
    loader.load(
        //'assets/fonts/Montserrat_Regular.json',
        'node_modules/three/examples/fonts/helvetiker_regular.typeface.json',
        (font) => {
            let i = 0;
            for (const node of polyhedron.nodes) {
                const geometry = new TextGeometry(i.toString(), {
                    font: font,
                    size: 0.2,
                    height: 0.02
                });

                const object = new Mesh(geometry, material);
                object.position.copy(node);
                object.position.multiplyScalar(positionScale);

                scene.add(object);
                i += 1;
            }
        });//,
        //onProgress,
        //onError);
}

export { addNodeLabels }