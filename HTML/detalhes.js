const detalhesDiv = document.querySelector("#detalhes")
const loadingDiv = document.querySelector("#loading")

const parametros = new URLSearchParams(window.location.search)
const codigo = parametros.get("codigo")

async function carregarAsteroide() {
    try {
        const res = await fetch (``)
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
            const data = await res.json()

        console.log(res)
        console.log(data)

        }
    } catch (error) {
        detalhesDiv.innerHTML = `
        <div class = "alert alert-danger">
        Erro ao carregar detalhes do asteroide: ${error.message}
        </div>
        `
    }
}

function exibirDetalhes(asteroide) {
    detalhesDiv.innerHTML = `
    <img src ="${asteroide.imagem}" alt="${asteroide.nome}" class="img-fluid mb-3">