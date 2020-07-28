var socket = io()
let label = $('#lblNuevoTicket')

socket.on('connect', () => {
	console.log('🖥 connected ')
	socket.emit('getActualState', null, state => {
		// console.log(state)
		label.text(state.currentTicket)
	})
})

socket.on('disconnect', () => {
	console.log('🔌 disconnected ')
})

$('button').on('click', () => {
	socket.emit('ticketNext', null, next => {
		label.text(next)
	})
})
