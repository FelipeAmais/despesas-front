//Onload carega despesas
// e adiciona ao select de despesas e o valor total

document.addEventListener('DOMContentLoaded',  async() => {
      try { 
        const response = await fetch('https://dispesas-manager-production.up.railway.app/despesas');
        const data = await response.json();
        const despesas = data;
        
        // Extrai categorias únicas
        const categorias = [ ...new Set(despesas.map(d => d.categoria.nome)) ]; 
        const filterSelect = document.getElementById('FilterBy');
        categorias.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria;
          option.textContent = categoria;
          filterSelect.appendChild(option);
        });

        // Função para filtrar despesas por categoria
        document.getElementById('FilterBy').addEventListener('change', function() {
          const selectedCategory = this.value;
          const filtered = despesas.filter(d => selectedCategory === d.categoria.nome); 
          renderizarDespesas(selectedCategory === 'all' ? despesas : filtered);
        });

        renderizarDespesas(despesas); // Renderiza as despesas na tabela
      }catch(error) {
        console.error('Erro ao carregar despesas:', error);
      };
});

// renderizar despesas
function renderizarDespesas(despesas) {
    const despesasContainer = document.getElementById('expense-list'); 
    despesasContainer.innerHTML = ''; // Limpa a lista antes de renderizar as despesas
    let total = 0;  // total começa em zero

    despesas.forEach(element => {
        total += element.valor; 

        // Formata a data
        const elementData = new Date(element.data);
        element.data = elementData.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        const item = document.createElement('tr');
        item.innerHTML = `
            <td>${element.data}</td>
            <td>${element.descricao}</td>
            <td>${element.categoria.nome}</td>
            <td>R$ ${element.valor.toFixed(2)}</td>
            <td> <button type="button" class="btn btn-outline-secondary"><i class="bi bi-plus-circle"></i></button>
            <td><button type="button" class="btn btn-primary" onclick="editarDespesa(${element.id})">Editar</button></td>
            <td><button class="btn btn-danger" onclick="deleteDespesa(${element.id})">Excluir</button></td> 
        `;
        despesasContainer.appendChild(item);
    });
    document.getElementById('value').textContent = `Total: R$ ${total.toFixed(2)}`; // Atualiza o total na página 
} 


// Função para editar uma despesa
function editarDespesa(id) {
    window.location.href = `Despesa.html?id=${id}`;
}

// Função para excluir uma despesa
function deleteDespesa(id) {
    fetch(`https://dispesas-manager-production.up.railway.app/despesas/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Despesa excluída com sucesso');
            window.location.reload();
        } else {
            throw new Error('Erro ao excluir despesa: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro ao excluir despesa:', error);
    });
}




