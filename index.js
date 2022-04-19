const form = document.querySelector("form")
const pullSourcery = "https://eldenring.fanapis.com/api/sorceries?limit=100"
const $box = document.querySelector(".box");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const strength = formData.get("strength");
    const dex = formData.get("dex");
    const int = formData.get("int");
    const faith = formData.get("faith");
    const arcane = formData.get("arcane");

    fetch(pullSourcery)
        .then((response) => response.json())
        .then((response) => {
            const spells = response.data
            return Promise.all(spells)
        })
        .then((spells) => {
            spells
                .filter((spell) =>
                    spell.requires !== null
                )
                .filter((spell) =>
                    spell.requires !== undefined)
                .filter((spell) => {
                    const intIndex = 0;
                    const faithIndex = 1;
                    const arcaneIndex = 2;
                    return (
                        spell.requires[intIndex].amount <= +int &&
                        spell.requires[faithIndex].amount <= +faith &&
                        spell.requires[arcaneIndex].amount <= +arcane
                    );
                })
                .map((spell) => {
                    const $spellBox = document.createElement("div")
                    $spellBox.classList.add("spellBox")
                    const req = spell.requires
                        .map(object => { return `  ${object.name }: ${object.amount}` })
                    $spellBox.innerHTML = `
                    <h3>Spall Name: ${spell.name}<h3/>
                    <img src="${spell.image}" class="spellImg"/>
                    <p>${spell.description}</p>
                    <p>Type: ${spell.type}</p>
                    <p>Cost: ${spell.cost} FP</p>
                    <p>Effetcs:${spell.effects}</p>
                    <p>Requirements: ${req}<p>
                    `;
                    return $spellBox
                })
                .forEach(($spellBox) => {
                    $box.append($spellBox)
                })
        })

})