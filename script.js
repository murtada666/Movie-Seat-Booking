const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");   

populateUI()
// save selected movie and Price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

let ticketPrice = +movieSelect.value; // const ticketPrice = parseInt(movieSelect.value);


//Update selected seats
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Copy selected seats into Array
    // Map through Array
    // return a new Array indexes

    
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    }); // or     const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

   

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populateUI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if (selectedSeats !== null && selectedSeats.length > 0) { // to check if there is an array and then check if that array is EMPTY ot not
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) { // to check if the element is exist 
                seat.classList.add("selected") // classList: This is a property of an HTML element's DOM representation that provides access to the list of CSS classes associated with that element.
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// 


//movie select event 
movieSelect.addEventListener("change", e =>{
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

//seat click event
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
    }
    updateSelectedCount();
})

// Update count and total set (because when we reload it wont set back)
updateSelectedCount()