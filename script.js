const currencyOne = document.getElementById('select-currency-one');
const currencyTwo = document.getElementById('select-currency-two');
const showRate = document.getElementById('rate');
const inputAmountOne = document.getElementById('amount-one');
const inputAmountTwo = document.getElementById('amount-two');
const exchangeButton = document.getElementById('exchange-btn');
const btnDarkMode = document.getElementById('btn-dark-mode');
const span = document.getElementById('span-off');

//Get the ratio of currencies to tl
async function fetchExchangeRate() {
    try {
        const rates = await (await fetch("https://finans.truncgil.com/v4/today.json")).json()
        return Object.entries(rates)  //incoming data is an object, convert data into arrays for easier operations
    } catch (error) {
        console.log(error)
    }
}

async function currencyConvert() {
    const data = await fetchExchangeRate()
    data.push(['TRY', { Buying: 1 }]) // adding TL to list for conversions

    let currenyOneValue, currenyTwoValue

    data.forEach(element => {
        element[0] == currencyOne.value ? currenyOneValue = element : null
        element[0] == currencyTwo.value ? currenyTwoValue = element : null
    })
    const rate = (currenyOneValue[1].Buying / currenyTwoValue[1].Buying).toFixed(2);
    inputAmountTwo.value = rate * inputAmountOne.value
    showRate.innerHTML = `1 ${currenyOneValue[0]} =  ${rate} ${currenyTwoValue[0]} `
}

function exchangeValues() {
    const temp = currencyTwo.value
    currencyTwo.value = currencyOne.value
    currencyOne.value = temp
    currencyConvert()
}

function darkMode() {
    if (span.id == "span-off") {
        document.body.classList.toggle("dark")
        span.id = "span-on"
    } else {
        document.body.classList.remove("dark")
        span.id = "span-off"
    }
}

//Add events
exchangeButton.onclick = exchangeValues
inputAmountOne.onchange = currencyConvert
currencyOne.onchange = currencyConvert
currencyTwo.onchange = currencyConvert
btnDarkMode.onclick = darkMode