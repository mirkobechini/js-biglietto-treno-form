//DOM elements
const mainDivEl = document.getElementById("mainDiv")
const kmHelpEl = document.getElementById("kmHelp")
const ageHelpEl = document.getElementById("ageHelp")

//inputs
const kmEl = document.getElementById("km")
const ageEl = document.getElementById("userAge")
const formEl = document.querySelector("form")
const username = "Pippo"




//constants price and discount
const priceKm = 0.21
const youngDiscount = 0.20
const oldDiscount = 0.40
const oldAge = 65
const youngAge = 18




//FUNCTIONS

//Utility function
function randomNumberFromDigits(digits) {
    return Math.floor(Math.random() * (digits * 10) - 1);
}


//check input
function checkInput(km, age) {
    //check only digits
    if (isNaN(km)) {
        kmHelpEl.classList.replace("d-none", "d-block")
        console.log(`Errore: km = ${km}\nNel campo chilometri inserire solo numeri`);
        return false
    }
    if (isNaN(age) || age > 100) {
        ageHelpEl.classList.replace("d-none", "d-block")
        console.log(`Errore: age = ${age}\nNel campo età inserire solo numeri e deve essere minore di 100`);
        return false
    }
    return true
}

function calcOffert(age){
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
    } else if (offert === "Sconto over ${oldAge}") {
        finalPrice -= finalPrice * oldDiscount
    }
    return (Math.round(finalPrice * 100) / 100).toFixed(2)
}

//eventlistener

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    //getting input
    const kmElValue = kmEl.value
    const ageElValue = ageEl.value

    if (checkInput(kmElValue, ageElValue)) {
        //outputs
        const offert = calcOffert(ageElValue);
        const wagon = `${randomNumberFromDigits(1)}`
        const codeCP = `${randomNumberFromDigits(5)}`
        const ticketPrice = `${calcPrice(kmElValue, offert)} €`

        //add card
        mainDivEl.innerHTML += `
        <div class="card my-7">
            <div class="card-header">
                Resoconto biglietto
            </div>
            <div class="card-body">
                <h5 class="card-title" id="UserName">${username}</h5>
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




