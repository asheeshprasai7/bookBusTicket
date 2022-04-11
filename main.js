const seatContainer = document.querySelector(".seats");
const seats = seatContainer.querySelectorAll(".seat:not(.booked)");

const selectedCount = document.getElementById("count");
const totalAmount = document.getElementById("total");
const seatInfo = document.querySelector(".seat-info");
const fare = 20;

populateUI();
// update seat count and total amount
const updateCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll(".seats .seat.selected");

  // Saving to local storage

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));

  // counting selected seats and total amount
  const selectedSeatsCount = selectedSeats.length;
  selectedCount.textContent = selectedSeatsCount;
  totalAmount.textContent = selectedSeatsCount * fare;
};

// Populate UI
function populateUI() {
  //fetch from local storage
  const seatsSelected = JSON.parse(localStorage.getItem("seatIndex"));
  if (seatsSelected !== null && seatsSelected.length > 0) {
    seats.forEach((seat, index) => {
      if (seatsSelected.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

// event Listener
seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("booked")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});

updateCountAndTotal();
