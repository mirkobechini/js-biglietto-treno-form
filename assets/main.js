//DOM elements
const TicketResultDivEl = document.getElementById("ticketResult")
const kmHelpEl = document.getElementById("kmHelp")
const ageHelpEl = document.getElementById("ageHelp")

//form fields
const kmEl = document.getElementById("km")
const ageEl = document.getElementById("userAge")
const usernameEl = document.getElementById("username")
const formEl = document.querySelector("form")





//constants price and discount
const priceKm = 0.21
const youngDiscount = 0.20
const oldDiscount = 0.40
const oldAge = 65
const youngAge = 18




//FUNCTIONS

//Utility function
function randomNumberFromDigits(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//check input
function checkInput(km, age) {
    resetHelpMessage()
    //check only digits
    if (isNaN(km)) {
        kmHelpEl.classList.replace("d-none", "d-block")
        kmEl.classList.add("border", "border-danger")
        console.log(`Errore: km = ${km}\nNel campo chilometri inserire solo numeri`);
        return false
    }
    if (isNaN(age) || age > 100) {
        ageHelpEl.classList.replace("d-none", "d-block")
        ageEl.classList.add("border", "border-danger")
        console.log(`Errore: age = ${age}\nNel campo età inserire solo numeri e deve essere minore di 100`);
        return false
    }
    return true
}

function resetHelpMessage() {
    kmHelpEl.classList.replace("d-block", "d-none")
    ageHelpEl.classList.replace("d-block", "d-none")
    kmEl.classList.remove("border", "border-danger")
    ageEl.classList.remove("border", "border-danger")
}

function calcOffert(age) {
    if (age < youngAge) {
        return "Sconto giovani"
    } else if (age > oldAge) {
        return `Sconto over ${oldAge}`
    }
    return `Standard`

}


//price calculation

function calcPrice(km, offert) {
    let finalPrice = km * priceKm
    if (offert === "Sconto giovani") {
        finalPrice -= finalPrice * youngDiscount
    } else if (offert === `Sconto over ${oldAge}`) {
        finalPrice -= finalPrice * oldDiscount
    }
    return (Math.round(finalPrice * 100) / 100).toFixed(2)
}

//eventlistener

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    //getting input
    const kmElValue = Number(kmEl.value)
    const ageElValue = Number(ageEl.value)

    if (checkInput(kmElValue, ageElValue)) {
        //outputs
        const offert = calcOffert(ageElValue);
        const wagon = `${randomNumberFromDigits(1)}`
        const codeCP = `${randomNumberFromDigits(5)}`
        const ticketPrice = `${calcPrice(kmElValue, offert)} €`

        //add card
        TicketResultDivEl.innerHTML = `
        <div class="card my-5 shadow bg-body-tertiary">
            <div class="card-header">
                Resoconto biglietto
            </div>
            <div class="card-body">
                <h5 class="card-title" id="UserName">${usernameEl.value}</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Offerta</th>
                            <th scope="col">Vagone</th>
                            <th scope="col">Codice CP</th>
                            <th scope="col">Costo biglietto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">${offert}</td>
                            <td id="wagon">${wagon}</td>
                            <td id="codeCP">${codeCP}</td>
                            <td id="ticketPrice">${ticketPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`

        //price log
        console.log(`Il prezzo del biglietto è ${ticketPrice}`);
    }



})




