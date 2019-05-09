console.log("client side js")

//broswer level HTTP RequestAPI
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector("#weatherForm")
const weatherInput = document.querySelector("#weatherInput")
const locationSpan = document.querySelector("#weatherResult #location")
const forecastSpan = document.querySelector("#weatherResult #forecast")
const errorSpan = document.querySelector("#weatherResult #error")
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = weatherInput.value;
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                errorSpan.textContent = data.error
            }else{
                locationSpan.textContent = "Location: " + data.location
                forecastSpan.textContent = "Forecast: " + data.temperature
                // console.log(data.location)
                // console.log(data.temperature)
            }
        })
    })
})
