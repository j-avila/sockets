var socket = io()

const setDesks = state => {
	let deskCount = state.lastFour.length
	console.log('estado', state)

	for (let i = 0; i < deskCount; i++) {
		console.log('💁', `${i} disponibles`)
		$(`#lblTicket${i + 1}`).text(`ticket ${state.lastFour[i].number}`)
		$(`#lblEscritorio${i + 1}`).text(
			`escritorio - ${state.lastFour[i].desktop}`
		)
	}
}

socket.on('connect', client => {
	socket.on('actualState', state => {
		const audio = new Audio('audio/new-ticket.mp3')
		console.log('hizo el actual', state)
		setDesks(state)
		audio.play()
	})
	socket.emit('getActualState', null, state => {
		// console.log(state)
		setDesks(state)
	})
})
