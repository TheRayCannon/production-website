const pullWepons = "https://eldenring.fanapis.com/api/weapons?limit=100";
const $box = document.querySelector(".box")
fetch(pullWepons)
    .then((repsonse) => repsonse.json())
    .then((response) => {
        const wepons = response.data;
        return Promise.all(wepons);
    })
    .then((wepons) => {
        wepons
            .filter((wepon) =>
                wepon.requiredAttributes !== null
            )
            .map((wepon) => {
                const $weponBox = document.createElement("div");
                const req = wepon.requiredAttributes
                    .map(
                        object => { return ` ${object.name}: ${object.amount}` })
                $weponBox.innerHTML = `
   <h3>${wepon.name}<h3>
   <img src="${wepon.image}" />
   <p>${wepon.description} </p>
   <p> Scales with:
    ${wepon.scalesWith.map(tool => tool.name)} 
   </p> 
   <p> Requirments: ${req}</p>
   `;
                return $weponBox;
            })
            .forEach(($weponBox) => {
                $box.append($weponBox);
            });
    });