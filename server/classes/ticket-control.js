const fs = require('fs')

class Ticket {
	constructor(number, desktop) {
		this.number = number
		this.desktop = desktop
	}
}

class TicketControl {
	constructor() {
		const d = new Date()
		this.last = 0
		this.today = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
		this.tickets = []
		this.lastFour = []

		let data = require('../data/data.json')

		if (data.today === this.today) {
			this.last = data.last
			this.tickets = data.tickets
			this.lastFour = data.lastFour
		} else {
			this.resetCounter()
		}
	}

	saveCounter() {
		let jsonData = {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			lastFour: this.lastFour,
		}
		let jsonDataString = JSON.stringify(jsonData)
		fs.writeFileSync('./server/data/data.json', jsonDataString)
		// console.log('system reboot')
	}

	ticketNext() {
		this.last += 1
		let ticket = new Ticket(this.last, null)
		this.tickets.push(ticket)
		this.saveCounter()
		return `ticket  ${this.last}`
	}

	getCurrentTicket() {
		return `ticket ${this.last}`
	}
	getLastFour() {
		return this.lastFour
	}

	attendTicket(desktop) {
		if (this.tickets.length === 0) {
			return 'theres no tickets'
		}

		let ticketNumber = this.tickets[0].number
		this.tickets.shift()

		let attendTicket = new Ticket(ticketNumber, desktop)

		this.lastFour.unshift(attendTicket)

		if (this.lastFour.length > 4) {
			this.lastFour.splice(-1, 1)
		}

		// console.log(this.lastFour)
		this.saveCounter()
		return attendTicket
	}

	resetCounter() {
		this.last = 0
		this.tickets = []
		this.lastFour = []

		console.log('system init')
		this.saveCounter()
	}
}

module.exports = { TicketControl }
