// default parameters

const greeter = (name="you know who") => {
    console.log("Hello", name)
}

greeter()
                // destructing directly from argument
const comeback = (type, {genre = "kpop"} = {} ) => {
    console.log(genre)
}

comeback('mini')