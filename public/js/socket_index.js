$('.set-desktop').on('click', event => {
	let deskNum = $('[name=escritorio]').val()
	if (deskNum >= 1) {
		window.location.href = `escritorio.html?desktop=${deskNum}`
	} else {
		alert('debes ingresar un numero de escritorio')
	}
	event.preventDefault()
})
