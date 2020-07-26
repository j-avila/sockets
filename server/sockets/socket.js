const { io } = require('../server')
const { TicketControl } = require('../classes/ticket-control')
const ticketControl = new TicketControl()

io.on('connection', client => {
	client.on('ticketNext', (newTicket, callback) => {
		let next = ticketControl.ticketNext()
		console.log(next)

		client.broadcast.emit('ticketNext', next)
		callback(next)
	})

	client.on('getActualState', (current, callback) => {
		let currentTicket = ticketControl.getCurrentTicket()

		client.broadcast.emit('actualState', currentTicket)
		callback(currentTicket)
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
