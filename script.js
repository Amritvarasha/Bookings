const conatiner = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count =  document.getElementById('count');
const total =  document.getElementById('total');
const movieSelect = document.getElementById('movie');

pupulateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index  and price 
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
 //update total and count
function updateSelectedCount(){
const selectedSeat = document.querySelectorAll('.row .seat.selected');

const seatIndex = [...selectedSeat].map((seat) => {
    return [... seats].indexOf(seat)
}) 
localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

console.log(seatIndex);
const selectedSeatCount = selectedSeat.length;
count.innerText = selectedSeatCount;
total.innerText = selectedSeatCount * ticketPrice;
}
// get data from the local starage and popluate ui 
function pupulateUI(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats')); 
    if(selectedSeat != null && selectedSeat.length >0){
        seats.forEach((seat, index) =>{
          if(selectedSeat.indexOf(index) > -1){
              seat.classList.add('selected');
          }  
        });

     const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
      if(selectedMovieIndex != null){
        movieSelect.selectedIndex  = selectedMovieIndex;  
      }
    }
}
// movie select event
movieSelect.addEventListener('change', e =>{
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex,e.target.value);
updateSelectedCount();

})
 

// seat click event
conatiner.addEventListener('click', e => {
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// initial count and total set 
 updateSelectedCount();