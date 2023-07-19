import { Sprite, SpriteMaterial, Texture } from "three";

function createLabel(text, fillColor = 'black') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;
    //tx.fillStyle = "white";
    //tx.rect(0, 0, 128, 128);
    //tx.fill();
    ctx.font = '100px sans-serif';

    ctx.fillStyle = fillColor;
    ctx.textAlign = "center";
    ctx.fillText(text, 64, 100);
    //ctx.strokeStyle = 'black';
    //ctx.strokeText(text, 0, 20);

    const texture = new Texture(canvas);
    texture.needsUpdate = true;

    const material = new SpriteMaterial({map: texture});
    const sprite = new Sprite(material);
    sprite.scale.multiplyScalar(0.5);

    return sprite
}

export { createLabel }