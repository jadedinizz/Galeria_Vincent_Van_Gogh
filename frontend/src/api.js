async function requisitar(caminho, opcoes) {
  const resposta = await fetch('/api/' + caminho, {
    ...opcoes,
    headers: { Accept: 'application/json' },
  });
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);
    const detalhes = erro && Object.entries(erro)
      .map(([campo, mensagem]) => campo === 'detail' ? mensagem : campo + ': ' + mensagem)
      .join(' ');
    throw new Error(detalhes || 'Erro na requisição (' + resposta.status + ').');
  }
  if (resposta.status !== 204) return resposta.json();
}

export function listarGeneros(signal) {
  return requisitar('generos/', { signal });
}

export function listarObras(genero, signal) {
  const consulta = genero ? '?' + new URLSearchParams({ genero }) : '';
  return requisitar('obras/' + consulta, { signal });
}

export function salvarObra(id, dados) {
  const caminho = id ? 'obras/' + id + '/' : 'obras/';
  return requisitar(caminho, { method: id ? 'PATCH' : 'POST', body: dados });
}

export function excluirObra(id) {
  return requisitar('obras/' + id + '/', { method: 'DELETE' });
}
