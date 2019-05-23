//promise: aysnchronous

// origin callback pattern
const doWorkCallback = (callback) => {
    setTimeout(()=>{
        //callback('error', undefined)
        callback(undefined, [1,5,7])
    },2000)
}

doWorkCallback((error, result) => {
    if(error) return console.log(error)
    console.log(result)
})

// With promise
const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // can only call once
        // once one of the function is call, the promise if done
        // if succeed, call
        // resolve([1,6,9])
        // if failed, call
        reject("error")
    },2000)
})

// then: run callback function if resolved is called
// doWorkPromise.then((data)=>{
//     // data from resolve
//     console.log('success')
//     console.log(data)
// }).catch((error) => {
//     // error from reject
//     console.log("failed")
//     console.log(error)
// })

//                            two branches
// promise == pending --> fulfilled(resolve) / rejected(reject)

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(a + b)
        },2000)
    })
}


// add(1,2)
//     .then((sum)=>{
//         add(sum, 3).then((sum)=>{
//             console.log(sum)
//         })
//     })
//     .catch(()=>{

//     })

// Promise chaining
add(1,2).then(sum=>{
    console.log(sum)
    return add(sum, 3)
}).then((sum2) => {
    console.log(sum2)
}).catch(e=>{
    console.log(e)
})