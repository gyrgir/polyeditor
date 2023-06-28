import { Polyeditor } from "./Polyeditor/Polyeditor";

async function main() {
    const polyeditor = new Polyeditor(document.getElementById("scene-container"));
    polyeditor.start();

    document.getElementById("polyhedra-input").addEventListener('change', (event) => {
        console.log(event.target.value)
        polyeditor.generate(event.target.value);
    })
}

main().catch((err) => {
    console.error(err);
});