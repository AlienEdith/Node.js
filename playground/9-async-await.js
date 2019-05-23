
// async function always return a Promise, can use then/catch
// any functions support promise, can support async/await!

// const doWork = async () => {
//    return "Yixing"
//    // throw error to trigger catch
// //    throw new Error("Something went wrong!")
// }

// doWork().then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

// await can only use in async function

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(a < 0 || b < 0){
                return reject("must be positive")
            }
            resolve(a + b)
        },2000)
    })
}

// use await before a promise, wait until the promise is down
// easy for chaining
const doWork = async () => {
    const sum1 = await add(1, 99)
    const sum2 = await add(sum1, 50)
    const sum3 = await add(sum2, -50)
    return sum3
}


doWork().then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})

// async and await are syntax enhancements for working with

