let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;

    if (title === "" || amount === "") {
        alert("Please fill all fields");
        return;
    }

    let month = document.getElementById("month").value;

let expense = { title, amount, month };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}

function showExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let selectedMonth = document.getElementById("month").value;

expenses.forEach((exp, index) => {

    if (selectedMonth && exp.month !== selectedMonth) return;

    let li = document.createElement("li");
    li.innerHTML = `${exp.title} - ₹${exp.amount} (${exp.month}) 
    <button onclick="deleteExpense(${index})">❌</button>`;
    
    list.appendChild(li);
});
        let li = document.createElement("li");
        li.innerHTML = `${exp.title} - ₹${exp.amount} 
        <button onclick="deleteExpense(${index})">❌</button>`;
        list.appendChild(li);
    });

    showChart();
    showAI();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
}

function showChart() {
    let canvas = document.getElementById("chart");
    if (!canvas) return;

    let labels = expenses.map(e => e.title);
    let data = expenses.map(e => Number(e.amount));

    let ctx = canvas.getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses",
                data: data
            }]
        }
    });
}

function showAI() {
    let total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    let msg = "";

    if (total > 5000) {
        msg = "⚠️ You are spending too much!";
    } else {
        msg = "✅ Your spending is under control!";
    }

    document.getElementById("ai").innerText = msg;
}

// Page load pe run
showExpenses();


// 🔥 BONUS: Enter key navigation
document.getElementById("title").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.getElementById("amount").focus();
    }
});

document.getElementById("amount").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addExpense();
    }
});
function toggleDark() {
    document.body.classList.toggle("dark");
}
localStorage.setItem("user", user);

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
}

function checkLogin() {
    let user = localStorage.getItem("user");

    if (user) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";
    }
}

// Page load ke baad check karega
checkLogin();