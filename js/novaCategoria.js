//Listener para o formulário de categoria
// Cria uma nova categoria e redireciona para novaDespesa.html
document.getElementById('form-categoria').addEventListener('submit', (e) =>{
    e.preventDefault();
    const categoria = {
    nome: document.getElementById('nomeCategoria').value
  };

  console.log('Categoria criada:', categoria);
    fetch('https://dispesas-manager-production.up.railway.app/categorias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
    }).then(response => {
      if (response.ok) {
        console.log('Categoria salva com sucesso');
        window.location.href = 'Despesa.html';
      } else {
        document.getElementById('message').innerText = 'Erro ao salvar categoria';
        console.error('Erro de rede:', error);
        console.error('Erro ao salvar categoria');
      }
    })
});