const pullSourcery = "https://eldenring.fanapis.com/api/sorceries?limit=100"
const $box = document.querySelector("#box");


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