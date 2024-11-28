// edicao.js

// Referências aos elementos da página
const transactionsTableBody = document.querySelector("#transactions-table tbody");
const editSection = document.querySelector("#edit-section");
const editForm = document.querySelector("#edit-form");
const cancelEditButton = document.querySelector("#cancel-edit");

// Recuperar as transações do LocalStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Variável para armazenar o índice da transação sendo editada
let currentEditIndex = null;

// Função para atualizar a tabela
function updateTable() {
  transactionsTableBody.innerHTML = ""; // Limpa a tabela

  transactions.forEach((transaction, index) => {
    const row = document.createElement("tr");

    // Colunas de dados
    row.innerHTML = `
      <td>${transaction.descricao}</td>
      <td>${transaction.categoria === "receita" ? "Receita" : "Despesa"}</td>
      <td>${new Date(transaction.data).toLocaleDateString("pt-BR")}</td>
      <td>${transaction.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Excluir</button>
      </td>
    `;

    transactionsTableBody.appendChild(row);
  });
}

// Função para editar uma transação
function startEdit(index) {
  currentEditIndex = index;
  const transaction = transactions[index];

  // Preencher o formulário com os dados da transação
  editForm.descricao.value = transaction.descricao;
  editForm.categoria.value = transaction.categoria;
  editForm.data.value = transaction.data;
  editForm.valor.value = transaction.valor;

  // Mostrar o formulário de edição
  editSection.style.display = "block";
}

// Função para salvar a edição
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Atualizar a transação
  transactions[currentEditIndex] = {
    descricao: editForm.descricao.value,
    categoria: editForm.categoria.value,
    data: editForm.data.value,
    valor: parseFloat(editForm.valor.value),
  };

  // Salvar no LocalStorage e atualizar a tabela
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTable();

  // Ocultar o formulário
  editSection.style.display = "none";
});

// Função para cancelar a edição
cancelEditButton.addEventListener("click", () => {
  editSection.style.display = "none";
});

// Função para excluir uma transação
function deleteTransaction(index) {
  transactions.splice(index, 1); // Remove a transação do array

  // Atualizar o LocalStorage e a tabela
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTable();
}

// Event listener para os botões de ação
transactionsTableBody.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("edit-btn")) {
    startEdit(index);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTransaction(index);
  }
});

// Atualizar a tabela ao carregar a página
updateTable();
