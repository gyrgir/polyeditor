import { Polyeditor } from "./Polyeditor/Polyeditor";

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.start();
}

main().catch((err) => {
    console.error(err);
});