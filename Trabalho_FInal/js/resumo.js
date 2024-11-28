// Recuperar as transações do LocalStorage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Variáveis para receitas, despesas e saldo
let totalReceitas = 0;
let totalDespesas = 0;

// Calcular receitas e despesas
transactions.forEach(transaction => {
  if (transaction.categoria === "receita") {
    totalReceitas += transaction.valor;
  } else if (transaction.categoria === "despesa") {
    totalDespesas += transaction.valor;
  }
});

// Calcular saldo final
const saldoFinal = totalReceitas - totalDespesas;

// Atualizar o resumo no HTML
document.getElementById("total-receitas").textContent = totalReceitas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
document.getElementById("total-despesas").textContent = totalDespesas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
document.getElementById("saldo-final").textContent = saldoFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Criar gráficos com Chart.js
const ctxPie = document.getElementById("pieChart").getContext("2d");
const ctxBar = document.getElementById("barChart").getContext("2d");

// Gráfico de Pizza
new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: ["Receitas", "Despesas"],
    datasets: [{
      data: [totalReceitas, totalDespesas],
      backgroundColor: ["#4CAF50", "#F44336"],
      borderColor: ["#ffffff", "#ffffff"],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "top"
      }
    }
  }
});

// Gráfico de Barras
new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: ["Receitas", "Despesas", "Saldo Final"],
    datasets: [{
      label: "Valores em R$",
      data: [totalReceitas, totalDespesas, saldoFinal],
      backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
      borderColor: ["#4CAF50", "#F44336", "#2196F3"],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});