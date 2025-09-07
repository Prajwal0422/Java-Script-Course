let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateBalance() {
  let income = transactions.filter(t => t.type === "income")
                           .reduce((sum, t) => sum + t.amount, 0);
  let expense = transactions.filter(t => t.type === "expense")
                            .reduce((sum, t) => sum + t.amount, 0);
  let balance = income - expense;

  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = expense;
  document.getElementById("balance").textContent = balance;
}

function addTransaction() {
  let desc = document.getElementById("desc").value.trim();
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;
  let category = document.getElementById("category").value;

  if (desc === ""  isNaN(amount)  amount <= 0) {
    alert("Enter valid description and amount!");
    return;
  }

  let transaction = { desc, amount, type, category };
  transactions.push(transaction);
  saveData();
  displayTransactions();
  updateBalance();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveData();
  displayTransactions();
  updateBalance();
}

function displayTransactions() {
  let list = document.getElementById("transactions");
  list.innerHTML = "";

  transactions.forEach((t, index) => {
    let li = document.createElement("li");
    li.classList.add(t.type);

    li.innerHTML = 
      <><span>${t.desc} (${t.category}) - ₹${t.amount}</span><button onclick="deleteTransaction(${index})">X</button></>
    ;
    list.appendChild(li);
  });
}

window.onload = () => {
  displayTransactions();
  updateBalance();
};