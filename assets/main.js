//DOM elements

const kmEl = document.getElementById("km")
const ageEl = document.getElementById("userAge")
const buttonConfirmEl = document.querySelector("button")


//constants price and discount
const priceKm = 0.21
const youngDiscount = 0.20
const oldDiscount = 0.40
const oldAge = 65
const youngAge = 18



//FUNCTIONS
//check input
function checkInput(km, age) {
    //check only digits
    if (isNaN(km)) {
        console.log(`Errore: km = ${km}\nNel campo chilometri inserire solo numeri`);
        return false
    }
    if (isNaN(age) || age > 100) {
        console.log(`Errore: age = ${age}\nNel campo età inserire solo numeri e deve essere minore di 100`);
        return false
    }
    return true
}


//price calculation

function calcPrice(km, age) {
    let finalPrice = km * priceKm
    if (age < youngAge) {
        finalPrice -= finalPrice * youngDiscount
    } else if (age > oldAge) {
        finalPrice -= finalPrice * oldDiscount
    }
    return (Math.round(finalPrice * 100) / 100).toFixed(2)
}


//eventlistener

buttonConfirmEl.addEventListener('submit', () => {

    //elements value
    const kmElValue = kmEl.value
    const ageElValue = ageEl.value

    if (checkInput(kmElValue, ageElValue)) {
        const price = calcPrice(kmElValue, ageElValue)
        //price log
        console.log(`Il prezzo del biglietto è ${price}`);
    }
})




