const $helloBox = document.querySelector(".helloBox")
const characterUrl = "https://eldenring.fanapis.com/api/npcs?name=White-faced Varré"



$helloBox.addEventListener("click", () => {
    fetch(characterUrl)
        .then(response => response.json())
        .then(response => {
            const characters = response.data
            return Promise.all(characters)
        })
        .then((characters) => {
            characters
                .map((character) => {
                    const $box = document.createElement("div")
                    $box.innerHTML = `
                <p>Joined us have you? In the lands between, one must find themselves at the whims of the path of Grace. A disorienting experience for anyone who has awoken from an eternal rest. Even if you are maidenless, it does not mean you are without help. Here we can give you a small list of enemies you may find in the land between. You may also find a guided list of a few spells and wepons you might be able to equip, if you have the ability. </p>
                <img src="${character.image}">
                <p>"${character.quote}" ~${character.name} </p>
                `;
                    return $box
                })
                .forEach(($box) => {
                    $helloBox.append($box)
                })
        })

})