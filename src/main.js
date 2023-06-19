import { Polyeditor } from "./Polyeditor/Polyeditor";

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.render();
}

main().catch((err) => {
    console.error(err);
});