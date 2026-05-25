const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");
const container = document.querySelector("#container");
const section = document.querySelector("#asteroides-section");

/* imagens diferentes */
const imagens = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1012318340.jpg?crop=1.00xw:0.889xh;0,0.0617xh&resize=1200:*",
  "https://imagenes.eltiempo.com/uploads/2024/01/23/65b046b060e1d.jpeg",
  "https://img.freepik.com/premium-photo/asteroid_94937-2217.jpg",
  "https://live-production.wcms.abc-cdn.net.au/2c42c2d85195735d3c49de88a10c6a16?impolicy=wcms_crop_resize&cropH=1078&cropW=1916&xPos=0&yPos=0&width=862&height=485",
  "https://static.mundoeducacao.uol.com.br/mundoeducacao/2023/09/asteroide-no-universo.jpg",
  "https://s3.static.brasilescola.uol.com.br/be/2023/08/asteroides-crateras.jpg",
  "https://cdn.comunhao.com.br/wp-content/uploads/2023/03/asteroide.jpg",
  "https://img.odcdn.com.br/wp-content/uploads/2022/09/dart-missao-colisao.jpg",
  "https://i.em.com.br/xHYK_2I7aoaLujTlmuMWhIUTQXA=/820x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/04/04/1477328/imagem-meramente-ilustrativa-de-asteroide_1_144531.jpg",
  "https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2025/04/asteroide_1744656625924-1024x576.jpg",
  "https://t.ctcdn.com.br/T2bANyRXvP8BFGEoElVEOg_pTsM=/1024x576/smart/i690176.png",
  "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/11/asteroide-triptofano.jpg?w=1200&h=900&crop=0",
  "https://t.ctcdn.com.br/JJPGJZdnUGqOtYbBCjXf2XL9NSE=/960x540/smart/i631218.png",
  "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/02/luaasteroide.jpg?w=1200&h=900&crop=0",
  "https://services.meteored.com/img/article/inteligencia-artificial-encontra-mais-de-20-mil-asteroides-escondidos-no-sistema-solar-1714857889223_1280.png",
  "https://img.magnific.com/fotos-premium/um-asteroide-com-formato-e-caracteristicas-de-superficie-unicas_891336-24057.jpg",
  "https://img.magnific.com/fotos-premium/um-grande-asteroide-a-flutuar-na-vastidao-do-espaco-exterior_964851-196799.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.magnific.com/fotos-premium/um-grande-meteorito-cai-do-ceu-brilhando-em-luz-branca_1045199-30477.jpg?semt=ais_hybrid&w=740&q=80",
  "https://t3.ftcdn.net/jpg/13/16/96/86/360_F_1316968612_rlTpXf8bbTYLCszzmul1eF5Bmol92EBB.jpg",
  "https://super.abril.com.br/wp-content/uploads/2022/04/asteroide-nasa_site.jpg?quality=70&strip=info&w=720&h=440&crop=1",
  "https://img.magnific.com/fotos-premium/meteoro-asteroide-cometa-caindo-no-ceu-estrelado-ai-geradora_874904-71853.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.magnific.com/fotos-premium/um-belo-e-grande-planetoide-no-espaco-vazio_21085-30937.jpg",
  "https://img.magnific.com/fotos-premium/um-asteroide-macico-esta-flutuando-pelo-espaco-juntando-se-as-fileiras-de-rochas-espaciais-potencialmente-perigosas-no-dia-internacional-do-asteroide_144356-46937.jpg?semt=ais_hybrid&w=740&q=80",
  "https://media.istockphoto.com/id/1286250317/pt/foto/asteroid-in-outer-space-with-moon-background.jpg?s=170667a&w=0&k=20&c=6sMkuJeO1zcYHruDZ3C7cnPSY4dl7JiYZrHo2HfAtVw="
];

/* data atual */
const hoje = new Date().toISOString().split("T")[0];

const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${hoje}&api_key=40pQWA0FrTROvt9DYov1pXZ0NZ77DMWKufLTaUva`;

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