//fonction fetch get dans id carré
fetch('http://localhost:3000/cart/basket')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.basket) {
            document.querySelector('#carré').innerHTML += 
            `<div><h1>My cart</h1></div>`
            for (let basket of data.basket) {
                const newDate = new Date(basket.trip.date)
                const basketDate = newDate.getHours() + ":" + newDate.getMinutes();
                document.querySelector('#carré').innerHTML += 
                `
                <p>${basket.trip.departure}>${basket.trip.arrival} ${basketDate} ${basket.trip.price}€</p><button id="delete">X</button>`
            }
        } else {
            document.querySelector('#carré').innerHTML =
            `<div id="content">
            <p>no ticket in your cart. <br><br>Why not plan a trip?</p>
        </div>`
        }
    })