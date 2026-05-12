const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");
const container = document.querySelector("#container");
const section = document.querySelector("#asteroides-section");

/* imagens diferentes */
const imagens = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1012318340.jpg?crop=1.00xw:0.889xh;0,0.0617xh&resize=1200:*",
  "https://imagenes.eltiempo.com/uploads/2024/01/23/65b046b060e1d.jpeg",
  "https://img.freepik.com/premium-photo/asteroid_94937-2217.jpg",
  "https://live-production.wcms.abc-cdn.net.au/2c42c2d85195735d3c49de88a10c6a16?impolicy=wcms_crop_resize&cropH=1078&cropW=1916&xPos=0&yPos=0&width=862&height=485"
];

/* data atual */
const hoje = new Date().toISOString().split("T")[0];

const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${hoje}&end_date=${hoje}&api_key=40pQWA0FrTROvt9DYov1pXZ0NZ77DMWKufLTaUva`;

async function carregarAsteroides() {
  try {
    section.classList.remove("hidden");

    section.scrollIntoView({
      behavior: "smooth"
    });

    resultado.innerText = "Carregando asteroides...";

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const dados = await resposta.json();
    const objetos = dados.near_earth_objects;

    container.innerHTML = "";

    let contador = 0;

    for (const dia in objetos) {
      objetos[dia].forEach((asteroide) => {
        const aproximacao = asteroide.close_approach_data[0];
        const perigoso = asteroide.is_potentially_hazardous_asteroid;

        const velocidade = Number(
          aproximacao.relative_velocity.kilometers_per_hour
        ).toLocaleString();

        const distancia = Number(
          aproximacao.miss_distance.kilometers
        ).toLocaleString();

        const imagem = imagens[contador % imagens.length];
        contador++;

        const cor = perigoso ? "#690000" : "#00bb64";

        container.innerHTML += `
          <div class="card" style="border-top: 4px solid ${cor}">
            <img src="${imagem}" alt="${asteroide.name}">
            
            <div class="card-content">
              <h3>${asteroide.name}</h3>

              <p><strong>Velocidade:</strong> ${velocidade} km/h</p>
              <p><strong>Distância:</strong> ${distancia} km</p>

              <p>
                <strong>Risco:</strong>
                <span style="color:${cor}">
                  ${perigoso ? "PERIGOSO" : " Seguro"}
                </span>
              </p>

              <a href="${asteroide.nasa_jpl_url}" target="_blank">
                Ver na NASA/JPL
              </a>
            </div>
          </div>
        `;
      });
    }

    resultado.innerText = "Asteroides carregados!";
  } catch (erro) {
    console.error(erro);
    resultado.innerText = "Erro ao carregar dados.";
  }
}

btn.addEventListener("click", carregarAsteroides);