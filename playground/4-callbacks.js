// setTimeout(()=>{
//     console.log('2s timer')
// }, 2000)    //ms

// Callback pattern

// const geocode = (address, callback) => {
//     // simulate the api request delay
//     setTimeout(()=>{
//         // assume the data are from an api request(callback)
//         const data = {
//             lat: 0,
//             lng: 1
//         }
//         // fire callback function, when we get the data
//         callback(data)
//     }, 2000)    //ms
    
// }

// geocode('austin', (data) => {
//     console.log(data)
// })

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!


// const add = (a, b, callback) => {
//     setTimeout(()=>{
//         const sum = a + b;
//         callback(sum)
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })



