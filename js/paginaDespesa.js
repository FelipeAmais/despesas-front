let modoPagina = "criar"; // ou "editar"
let despesaEmEdicaoId = null;

async function inicializarPagina() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    modoPagina = "editar";
    despesaEmEdicaoId = Number(id);
    ajustarInterfaceEdicao();
    const response = await fetch(`https://dispesas-manager-production.up.railway.app/despesas/${despesaEmEdicaoId}`);

    if (!response.ok) {
      alert('Erro ao carregar despesa');
      window.location.href = '/index.html';
      return;
    }

    const despesa = await response.json();
    preencherFormularioEdicao(despesa);
  } else {
    ajustarInterfaceCriacao();
  }
}

// Ajusta o título e o texto do botão para o modo de edição
function ajustarInterfaceEdicao() {
  document.title = "Editar Despesa";
  document.getElementById("title").innerText = "Editar Despesa";
  document.getElementById("btnConfirmar").innerText = "Atualizar";
}

// Ajusta o título e o texto do botão para o modo de criação
function ajustarInterfaceCriacao() {
  document.title = "Nova Despesa";
  document.getElementById("title").innerText = "Nova Despesa";
  document.getElementById("btnConfirmar").innerText = "Salvar";
}

// Preenche o formulário com os dados da despesa para edição
function preencherFormularioEdicao(despesa) {
  document.getElementById('descricao').value = despesa.descricao;
  document.getElementById('categoria').value = despesa.categoria.id;
  document.getElementById('valor').value = despesa.valor;
  document.getElementById('data').value = despesa.data.split('T')[0];
}


// Onload da pagina carrega categorias
// e adiciona ao select de categorias
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://dispesas-manager-production.up.railway.app/categorias');
    const categorias = await response.json();

    const select = document.getElementById('categoria');

    categorias.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.textContent = element.nome;
      select.appendChild(option);
    });

    await inicializarPagina();

    const inputData = document.getElementById('data');
    inputData.max = new Date().toISOString().split('T')[0];

  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
});


// submit form listener para salvar despesa nova ou atualizar despesa existente
document.getElementById('form-despesa').addEventListener('submit', async function (e) {
  e.preventDefault();

  const despesa = {
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value,
    categoria: {
      id: Number(document.getElementById('categoria').value)
    },
    valor: Number(document.getElementById('valor').value),
  };

  if (!checkValorInput()) {
    document.getElementById('alert-error').innerText = 'O valor deve ser maior que zero.';
    return;
  }

  let url = 'https://dispesas-manager-production.up.railway.app/despesas';
  let method = 'POST';

  if (modoPagina === 'editar') {
    method = 'PUT';
    despesa.id = despesaEmEdicaoId;
  }

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(despesa)
  });

  window.location.href = '/index.html';
});


// Valida o valor do input para garantir que seja maior ou igual a zero
function checkValorInput() {
  const valorInput = Number(document.getElementById('valor').value);
  return valorInput > 0;
}


// Listener para o select de categorias
// Redireciona para criarCategoria.html se a opção for "Adicionar Categoria"
document.getElementById("categoria").addEventListener('change', function (e) {
  e.preventDefault();
  if (e.target.value === 'criarCategoria') {
    window.location.href = 'criarCategoria.html';
  }
});

