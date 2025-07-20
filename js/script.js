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
       

       const despesasContainer = document.getElementById('expense-list');
       despesas.forEach(element => {
            elementData = new Date(element.data);
            element.data = elementData.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const Item = document.createElement('tr');
            Item.innerHTML = `
                <td>${element.data}</td>
                <td>${element.descricao}</td>
                <td>${element.valor}</td>
                <td>${element.categoria.nome}</td>
            `;
            despesasContainer.appendChild(Item);
       });
    })
});




