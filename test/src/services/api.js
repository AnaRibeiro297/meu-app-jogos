
const BASE_URL = "http://10.0.2.2:3000";

async function lidarComResposta(resposta) {
  if (!resposta.ok) {
    const erroData = await resposta.json().catch(() => ({}));
    throw new Error(erroData.erro || `Erro na requisição: ${resposta.status}`);
  }
  
  if (resposta.status === 204) {
    return true;
  }
  
  return await resposta.json();
}

export async function buscarJogos() {
  const resposta = await fetch(`${BASE_URL}/jogos`);
  return await lidarComResposta(resposta);
}

export async function buscarJogoPorId(id) {
  const resposta = await fetch(`${BASE_URL}/jogos/${id}`);
  return await lidarComResposta(resposta);
}

export async function adicionarFavorito(jogoId, observacao = "") {
  const resposta = await fetch(`${BASE_URL}/jogos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jogoId, observacao }),
  });
  return await lidarComResposta(resposta);
}

export async function listarFavoritos() {
  const resposta = await fetch(`${BASE_URL}/jogos`);
  return await lidarComResposta(resposta);
}

export async function editarFavorito(id, observacao) {
  const resposta = await fetch(`${BASE_URL}/jogos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ observacao }),
  });
  return await lidarComResposta(resposta);
}

export async function removerFavorito(id) {
  const resposta = await fetch(`${BASE_URL}/jogos/${id}`, {
    method: "DELETE",
  });
  return await lidarComResposta(resposta);
}