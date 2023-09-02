function resize(container, camera, renderer) {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const canvas = renderer.domElement;

    if (canvas.clientWidth !== containerWidth || canvas.clientHeight !== containerHeight) {
        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}

export { resize }