const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");
const container = document.querySelector("#container");
const section = document.querySelector("#asteroides-section");

/* imagens diferentes */
const imagens = [
  "https://images-assets.nasa.gov/image/PIA12235/PIA12235~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA01492/PIA01492~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA03519/PIA03519~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA04200/PIA04200~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA03254/PIA03254~medium.jpg",
  "https://images-assets.nasa.gov/image/PIA18033/PIA18033~medium.jpg"
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

        const cor = perigoso ? "#ff3b3b" : "#00ff88";

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
                  ${perigoso ? "⚠️ PERIGOSO" : "🟢 Seguro"}
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