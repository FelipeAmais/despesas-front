document.getElementById('form-despesa').addEventListener('submit', function (e) {
  e.preventDefault();

  const despesa = {
    descricao: document.getElementById('descricao').value,
    categoria: document.getElementById('categoria').value,
    valor: parseFloat(document.getElementById('valor').value),
    data: document.getElementById('data').value,
  };

  console.log('Despesa criada:', despesa);

});

document.getElementById("categoria").addEventListener('change', function (e) {
  e.preventDefault();
  if (e.target.value === 'criarCategoria') {
    window.location.href = 'criarCategoria.html';
  }
});