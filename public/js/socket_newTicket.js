var socket = io()
let label = $('#lblNuevoTicket')

socket.on('connect', () => {
	console.log('🖥 connected ')
	socket.emit('getActualState', null, state => {
		label.text(state)
	})
})

socket.on('disconnect', () => {
	console.log('🔌 disconnected ')
})

$('button').on('click', function () {
	socket.emit('ticketNext', null, next => {
		label.text(next)
	})
})
