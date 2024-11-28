
// Referência à tabela
const transactionsTableBody = document.querySelector("#transactions-table tbody");

// Recuperar as transações do LocalStorage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Função para formatar valores em moeda
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Função para formatar a data
function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

// Preencher a tabela com as transações
transactions.forEach(transaction => {
  const row = document.createElement("tr");

  // Coluna de Descrição
  const descricaoCell = document.createElement("td");
  descricaoCell.textContent = transaction.descricao;
  row.appendChild(descricaoCell);

  // Coluna de Categoria
  const categoriaCell = document.createElement("td");
  categoriaCell.textContent = transaction.categoria === "receita" ? "Receita" : "Despesa";
  row.appendChild(categoriaCell);

  // Coluna de Data
  const dataCell = document.createElement("td");
  dataCell.textContent = formatDate(transaction.data);
  row.appendChild(dataCell);

  // Coluna de Valor
  const valorCell = document.createElement("td");
  valorCell.textContent = formatCurrency(transaction.valor);
  valorCell.style.color = transaction.categoria === "receita" ? "green" : "red";
  row.appendChild(valorCell);

  // Adicionar a linha à tabela
  transactionsTableBody.appendChild(row);
});