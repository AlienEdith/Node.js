// Client-end

const socket = io() // start a new connection

// Elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")
const $locationButton = document.querySelector("#shareLocation")
const $messages = document.querySelector("#messages")
const $sidebar = document.querySelector("#sidebar")
// Template
const $messageTemplate = document.querySelector("#message-template").innerHTML
const $locationTemplate = document.querySelector("#location-template").innerHTML
const $sidebarTemplate = document.querySelector("#siderbar-template").innerHTML
// Options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoScroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild
    // height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    // visible height
    const visibleHeight = $messages.offsetHeight
    // container height
    const containerHeight = $messages.scrollHeight
    // how far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
})

socket.on('message', (message) => {
    const html = Mustache.render($messageTemplate, {
        username: message.username,
        message: message.text,
        time: moment(message.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('locationMessage', (message) => {
    const html = Mustache.render($locationTemplate, {
        username: message.username,
        url: message.url,
        time: moment(message.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render($sidebarTemplate, {
        room, users
    })
    $sidebar.innerHTML = html
})


$messageForm.addEventListener('submit', (event) => {
            event.preventDefault();

            $messageFormButton.setAttribute('disabled', 'disabled')

            const message = $messageFormInput.value
                                
            socket.emit("sendMessage", message, (error) => {
                // acknowledgement function: run when the event is acknowledged and processed
                
                // enable 
                $messageFormButton.removeAttribute('disabled')
                $messageFormInput.value = ''
                $messageFormInput.focus

                //  => callback() is called in receiver
                if(error){
                    return console.log(error)
                }
                console.log("message delivered")
            })
        })

document.querySelector("#shareLocation")
    .addEventListener('click', () => {

        $locationButton.setAttribute('disabled', 'disabled')

        if(!navigator.geolocation) return alert('Geolocation is not supported by your browser')
        // async: don't support promise yet. Use callback function 
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation', {lat: position.coords.latitude, lng: position.coords.longitude}, () => {
                $locationButton.removeAttribute('disabled')
                console.log("Location Shared!")
            })
        })
    })

