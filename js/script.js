//Onload carega despesas
// e adiciona ao select de despesas e o valor total

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/despesas')
    .then(response => response.json())
    .then(data => {
      console.log('Despesas carregadas:', data);

      const despesas = data;
      const despesasContainer = document.getElementById('expense-list');
      
      let total = 0;  // total começa em zero

      despesas.forEach(element => {
        // Soma o valor total das despesas
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
          <td><button class="btn btn-danger" onclick="deleteDespesa(${element.id})">Excluir</button></td>
        `;
        despesasContainer.appendChild(item);
      });

      const valorTotal = document.getElementById('value');
      valorTotal.innerHTML = `Total: R$ ${total.toFixed(2)}`;
      console.log('Valor total:', total);
    })
    .catch(error => {
      console.error('Erro ao carregar despesas:', error);
    });
});




// Função para excluir uma despesa
function deleteDespesa(id) {
    fetch(`http://localhost:8080/despesas/${id}`, {
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




