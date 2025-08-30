const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector("form");

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")



// validar input de despesa para aceitar apenas número
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "") // obtém o valor e retira o que não for numérico

    value = Number(value) / 100 // converte em centavos

    amount.value = formatCurrencyBRL(value)  //atualiza o valor do input
   
}
    
// formatar em real
function formatCurrencyBRL(value) { 
    value = value.toLocaleString("pt-BR", {
        style : "currency",
        currency: "BRL",

    })
    return(value) // retorna o valor

}

// previne que ele recarregue a página toda vez
form.onsubmit = (event) => {
    event.preventDefault();

// cria um objeto com os detalhes da nova despesa adicionada
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectIndex],
        amount: amount.value,
        create_at: new Date(),
    }
    expenseAdd(newExpense) // chama a função que irá adicionar o item na lista
}

function expenseAdd(newExpense) {
    try {
    // cria o elemento para adicionar o item "li" na lista "ul"
    const expenseItem  = document.createElement("li")
    expenseItem.classList.add("expense")

    // cria o icone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // cria nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // cria categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // adiciona o nome e categoria na div nas informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
        .toUpperCase()
        .replace("R$", "")
    }`

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount)

    // adiciona o item na lista
    expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesa")
        console.log(error)
    }
}