const apiKey = 'YOUR_API_KEY'; // Replace with a real API key

function currencyHistory(){
    // let history1=document.getElementById('history')
    // let data=document.createElement('P')
    // data.innerText=history
    console.log(history)
    //console.log(history1)
}
// Fetch currency data
async function fetchCurrencies() {
    let response = await fetch(`https://open.er-api.com/v6/latest/USD?apikey=${apiKey}`);
    let data = await response.json();
    return data.rates;
}

// Populate currency dropdowns
async function populateCurrencies() {
    let rates = await fetchCurrencies();
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');
    let defaultCurrency = document.getElementById('defaultCurrency');

    for (let currency in rates) {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        let option3 = new Option(currency, currency);

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
        if (defaultCurrency) defaultCurrency.appendChild(option3);
    }
}

// Convert currency
let id = 1
async function convertCurrency() {

    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (!amount) {
        alert("Please enter an amount");
        return;
    }
    let history = ""

    let rates = await fetchCurrencies();
    let result = (amount / rates[fromCurrency]) * rates[toCurrency];
    document.getElementById('result').innerText = result.toFixed(2);
    history+=amount+", " + fromCurrency+", "+toCurrency+", "+result;
    localStorage.setItem(id++, history);
    console.log(localStorage);
}

// Display exchange rates table
async function loadExchangeRates() {
    let rates = await fetchCurrencies();
    let ratesTable = document.getElementById('ratesTable');

    for (let currency in rates) {
        let row = ratesTable.insertRow();
        row.insertCell(0).innerText = currency;
        row.insertCell(1).innerText = rates[currency].toFixed(2);
    }
}

// Save settings
function saveSettings() {
    let defaultCurrency = document.getElementById('defaultCurrency').value;
    localStorage.setItem('defaultCurrency', defaultCurrency);
    alert("Settings saved!");
}

// Load default currency on startup
document.addEventListener("DOMContentLoaded", function() {
    populateCurrencies();
    if (document.getElementById('ratesTable')) loadExchangeRates();
});
