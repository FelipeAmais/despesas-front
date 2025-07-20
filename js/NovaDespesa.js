// Onload da pagina carrega categorias
// e adiciona ao select de categorias
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/categorias')
    .then(response => response.json())
    .then(data => {
      console.log('Categorias carregadas:', data); 
      const categorias = data;
      console.log('Categorias:', categorias); 

      categorias.forEach(element => {
        const select = document.getElementById('categoria');
        const option = document.createElement('option');
        option.value = element.id;
        option.textContent = element.nome;
        select.appendChild(option);
      });

    })
    .catch(error => {
      console.error('Erro ao carregar categorias:', error);
    });
});

// submit form listener
document.getElementById('form-despesa').addEventListener('submit', function (e) {
  e.preventDefault();

  const despesa = {
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value,
    categoria: {
    id: parseInt(document.getElementById('categoria').value)
    },
    valor: parseFloat(document.getElementById('valor').value),
  };
  console.log(despesa.categoria.id);
  

  fetch('http://localhost:8080/despesas', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(despesa)
  })
  .then(response => { 
    if (response.ok) {
      console.log('Despesa criada:', despesa);
    } else {
      throw new Error('Erro ao criar despesa: ' + response.statusText);
    }
    return response.json();
  })
  

});

// Listener para o select de categorias
// Redireciona para criarCategoria.html se a opção for "Adicionar Categoria"
document.getElementById("categoria").addEventListener('change', function (e) {
  e.preventDefault();
  if (e.target.value === 'criarCategoria') {
    window.location.href = 'criarCategoria.html';
  }
});

