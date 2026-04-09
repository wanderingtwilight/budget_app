let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let month = document.getElementById("month").value;

    if (!user || !month) {
        alert("Please enter username and month");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("month", month);

    document.getElementById("currentMonth").value = month;

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    showExpenses();
}

// ADD EXPENSE
function addExpense() {
    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let month = localStorage.getItem("month");

    if (!title || !amount) {
        alert("Please fill all fields");
        return;
    }

    let expense = { title, amount, month };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    showExpenses();
}

// SHOW EXPENSES
function showExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let selectedMonth = localStorage.getItem("month");

    // Filter expenses for selected month
    let filtered = expenses.filter(exp => exp.month === selectedMonth);

    filtered.forEach((exp, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${exp.title} - ₹${exp.amount} (${exp.month}) 
        <button onclick="deleteExpense(${index})">❌</button>`;

        list.appendChild(li);
    });

    showChart(filtered); // pass filtered data
    showAI(filtered);
    showMonthlySummary();
}

// DELETE EXPENSE
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
}

// CHART
function showChart(data) {
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");

    let labels = data.map(e => e.title);
    let values = data.map(e => Number(e.amount));

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses",
                data: values
            }]
        }
    });
}

// AI MESSAGE
function showAI(data) {
    let total = data.reduce((sum, e) => sum + Number(e.amount), 0);

    let msg = total > 5000 
        ? "⚠️ You are spending too much!" 
        : "✅ Your spending is under control!";

    document.getElementById("ai").innerText = msg;
}

// MONTHLY SUMMARY (ALL MONTHS)
function showMonthlySummary() {
    let summary = {};

    expenses.forEach(exp => {
        if (!summary[exp.month]) {
            summary[exp.month] = 0;
        }
        summary[exp.month] += Number(exp.amount);
    });

    let summaryList = document.getElementById("monthlySummary");
    if (!summaryList) return;

    summaryList.innerHTML = "";

    for (let month in summary) {
        let li = document.createElement("li");
        li.innerText = `${month} → ₹${summary[month]}`;
        summaryList.appendChild(li);
    }
}

// DARK MODE
function toggleDark() {
    document.body.classList.toggle("dark");
}

// AUTO LOGIN CHECK
function checkLogin() {
    let user = localStorage.getItem("user");
    let month = localStorage.getItem("month");

    if (user) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";

        document.getElementById("currentMonth").value = month;

        showExpenses();
    }
}
checkLogin();
function handleEnter(event, nextId) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById(nextId).focus();
    }
}
function setCurrentMonth() {
    let month = document.getElementById("currentMonth").value;

    if (!month) {
        alert("Please select a month");
        return;
    }

    localStorage.setItem("month", month);
    showExpenses();
}
