document.querySelector('#bt').addEventListener('click', function () {

        const departure = document.querySelector('#departure').value;
        const arrival = document.querySelector('#arrival').value;
        const date = document.querySelector('#Date').value;
        console.log('click');
        fetch(`http://localhost:3000/accueil/search/${departure}/${arrival}/${date}`)
        .then(response => response.json ())
        .then(data => {
            const resultContainer = document.querySelector('#bodyRight');
            if (data && data.trips) {
                let tripsList = '';
                for (let trip of data.trips) {
                    const newDate = new Date(trip.date)
                    const tripDate = newDate.getHours() + ":" + newDate.getMinutes();
                    tripsList += `<div  data-id="${trip._id}" id="trip"><p>${trip.departure}>${trip.arrival} ${tripDate} ${trip.price}€</p><button id="addBook">Book</button></div>`;
                }
                resultContainer.innerHTML = tripsList;
                document.querySelectorAll('#addBook').forEach(book => {
                    book.addEventListener('click', (e) => {
                        bookTrip(e);
                    })
                })
            } else {
                resultContainer.innerHTML = `<img id="train" src="/images/notfound.png" alt="notfound">
                                            <br>
                                            <div class="green-bar"></div>
                                            <br>
                                            <span>No trip found.</span>`;
            }
        })
    });

//fonction pour ajouter à basket au click du button Book
function bookTrip(e) {

    fetch('http://localhost:3000/accueil/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId: e.target.parentNode.dataset.id })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.yourTrip) {
                location.href = 'cart.html';
            } else {
                alert(data.error)
            }
        });
}