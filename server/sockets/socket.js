const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')
const ticketControl = new TicketControl()

io.on('connection', client => {
	client.on('ticketNext', (newTicket, callback) => {
		let next = ticketControl.ticketNext()
		console.log(next)

		// client.broadcast.emit('getActualState', next)
		callback(next)
	})

	client.on('getActualState', (current, callback) => {
		let currentTicket = ticketControl.getCurrentTicket()
		let lastFour = ticketControl.getLastFour()

		let actualState = {
			currentTicket: currentTicket,
			lastFour: lastFour,
		}

		client.broadcast.emit('actualState', actualState)
		callback(actualState)
	})

	client.on('attendticket', (data, callback) => {
		if (!data.desktop) {
			return callback({
				err: true,
				menssage: 'need assign a desktop',
			})
		}

		let attendTicket = ticketControl.attendTicket(data.desktop)
		callback(attendTicket)
	})
})
