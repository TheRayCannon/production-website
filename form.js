const form = document.querySelector(".equipForm");
const pullSourcery = "https://eldenring.fanapis.com/api/sorceries?limit=10";
const pullInc = "https://eldenring.fanapis.com/api/incantations?limit=10";
const pullWepons = "https://eldenring.fanapis.com/api/weapons?limit=5";
const $box = document.querySelector("#equipbox");


function redirect() {
    window.location.href = "error.html"
}

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
            const spells = response.data;
            return Promise.all(spells);
        })
        .then((spells) => {
            spells
                .filter((spell) => spell.requires !== null)
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
                    const $spellBox = document.createElement("div");
                    $spellBox.classList.add("spellBox");
                    const req = spell.requires.map((object) => {
                        return `  ${object.name}: ${object.amount}`;
                    });
                    $spellBox.innerHTML = `
                    <h3>Spall Name: ${spell.name}<h3/>
                    <img src="${spell.image}" class="spellImg"/>
                    <p>${spell.description}</p>
                    <p>Type: ${spell.type}</p>
                    <p>Cost: ${spell.cost} FP</p>
                    <p>Effetcs:${spell.effects}</p>
                    <p>Requirements: ${req}<p>
                    `;
                    return $spellBox;
                })
                .forEach(($spellBox) => {
                    $box.append($spellBox);
                });
        }).catch(error => {
            redirect(error)
        })

    fetch(pullInc)
        .then((response) => response.json())
        .then((response) => {
            const inc = response.data;
            return Promise.all(inc);
        })
        .then((incants) => {
            incants
                .filter((incant) => {
                    const intIndex = 0;
                    const faithIndex = 1;
                    const arcaneIndex = 2;
                    return (
                        incant.requires[intIndex].amount <= +int &&
                        incant.requires[faithIndex].amount <= +faith &&
                        incant.requires[arcaneIndex].amount <= +arcane
                    );
                })
                .map((incant) => {
                    const $incantBox = document.createElement("div");
                    $incantBox.classList.add("incantBox");
                    const req = incant.requires.map((object) => {
                        return `  ${object.name}: ${object.amount}`;
                    });
                    $incantBox.innerHTML = `
                    <h3>Spall Name: ${incant.name}<h3/>
                    <img src="${incant.image}" class="spellImg"/>
                    <p>${incant.description}</p>
                    <p>Type: ${incant.type}</p>
                    <p>Cost: ${incant.cost} FP</p>
                    <p>Effetcs:${incant.effects}</p>
                    <p>Requirements: ${req}<p>
                    `;
                    return $incantBox;
                })
                .forEach(($incantBox) => {
                    $box.append($incantBox);
                });
        }).catch(error => {
            redirect(error)
        })

    fetch(pullWepons)
        .then((repsonse) => repsonse.json())
        .then((response) => {
            const wepons = response.data;
            return Promise.all(wepons);
        })
        .then((wepons) => {
            wepons
                .filter((wepon) => {
                    const strIndex = 0;
                    const dexIndex = 1;
                    return (
                        wepon.requiredAttributes[strIndex].amount <= +strength &&
                        wepon.requiredAttributes[dexIndex].amount <= +dex
                    );
                })
                .map((wepon) => {
                    const $weponBox = document.createElement("div");
                    $weponBox.classList.add("weponBox");
                    const req = wepon.requiredAttributes.map((object) => {
                        return ` ${object.name}: ${object.amount}`;
                    });
                    $weponBox.innerHTML = `
       <h3>${wepon.name}<h3>
       <img src="${wepon.image}" />
       <p>${wepon.description} </p>
       <p> Scales with:
        ${wepon.scalesWith.map((tool) => tool.name)} 
       </p> 
       <p> Requirments: ${req}</p>
       `;
                    return $weponBox;
                })
                .forEach(($weponBox) => {
                    $box.append($weponBox);
                });
        }).catch(error => {
            redirect(error)
        })

});