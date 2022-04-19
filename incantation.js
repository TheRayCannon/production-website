const incantUrl = "https://eldenring.fanapis.com/api/incantations?limit=100"
const $box = document.querySelector(".box");
fetch(incantUrl)
    .then((response) => response.json())
    .then((response) => {
        const incants = response.data
        return Promise.all(incants)
    })
    .then((incants) => {
        incants
            .filter((incant) =>
                incant.requires !== null
            )
            .map((incant) => {
                const $incantBox = document.createElement("div")
                $incantBox.classList.add("incantBox")
                const req = incant.requires
                    .map(object => { return `  ${object.name }: ${object.amount}` })
                $incantBox.innerHTML = `
            <h3>${incant.name}</h3>
            <img src="${incant.image}" />
            <p>Description: ${incant.description}</p>
            <p>Effect: ${incant.effects}</p>
            <p>FP cost: ${incant.cost}</p>
            <p>Requirments: ${req} </p>
            `;
                return $incantBox
            })
            .forEach(($incantBox) => {
                $box.append($incantBox)
            })
    })