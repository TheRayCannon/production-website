const pullBosses = "https://eldenring.fanapis.com/api/bosses?limit=100&fields=images";
const $box = document.querySelector(".box");
fetch(pullBosses)
    .then((repsonse) => repsonse.json())
    .then((response) => {
        const bosses = response.data;
        return Promise.all(bosses);
    })
    .then((bosses) => {
        bosses
            .filter((boss) =>
                boss.image !== null
            )
            .map((boss) => {
                const $bossbox = document.createElement("div");
                $bossbox.innerHTML = `
    <h3>${boss.name}</h3>
    <img src = "${boss.image}"/>
    <p>Location : ${boss.location}</p>
    <p>Drops:${boss.drops}</p>
    `;

                return $bossbox
            })
            .forEach(($bossbox) => {
                $box.append($bossbox);
            });
    });