document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/categorias')
    .then(response => response.json())
    .then(data => {
       console.log('Categorias carregadas:', data); 
       const categorias = data
       console.log('Categorias:', categorias); 
       
    })
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/despesas')
    .then(response => response.json())
    .then(data => {
       console.log('Despesas carregadas:', data); 
       const despesas = data
       console.log('Despesas:', despesas); 
       
    })
});


