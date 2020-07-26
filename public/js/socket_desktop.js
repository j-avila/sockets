const socket = io()

console.log('booom bitch 💣')

const searchParams = new URLSearchParams(window.location.search)
let label = $('small')

if (!searchParams.has('desktop')) {
	window.location = 'index.html'
	throw new Error('desktop is needed')
}

let desktop = searchParams.get('desktop')
console.log(desktop)

$('strong').text(desktop)

$('button').on('click', function () {
	socket.emit('attendticket', { desktop }, resp => {
		console.log(resp)
	})
})
