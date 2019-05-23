const jwt = require('jsonwebtoken')

const jwtExample = async () => {
    // the data to embed in the token: This needs to include a unique identifier for the user.
    // a secret phrase: This is used to issue and validate tokens, ensuring that the
    // token data hasn’t been tampered with. random string
    const token = jwt.sign({ _id: 'abc12' }, 'fancyyou', {
        expiresIn: '1h'
    })  //return a token base64
    console.log(token)
    
    // token and secret
    const data = jwt.verify(token, 'fancyyou')
    console.log(data)
}

jwtExample()