(function () {
	let user
	let promises = [
		customElements.whenDefined("todo-elem"),
		customElements.whenDefined("welcome-elem"),
		customElements.whenDefined("wrapper-elem")
	]
	
	window.onhashchange = () => {
		if ( !(location.hash === "#todo") ) return
		document.body.appendChild(
			document.createElement("todo-elem")
		)
	}
	
	async function cookiesCheck () {
		let res = document.cookie
			.split ( "; " )
			.map (
				x => {
					let tmp = x.split ( "=" )
					let elem = {}
					elem [ tmp [0] ] = tmp [1]
					return elem
				}
			)
		let cookie = Object.assign ( {}, ...res )
		let users = await fetch ("http://localhost:3000/users")
			.then (response => response.json())
		user = users.find(
			user => {
				return user.email === cookie.e &&
					user.password === cookie.p
			}
		)
	}
	
	Promise.all(promises)
		.then (() => {
			if (!user) {
				document.body.appendChild(
					document.createElement("welcome-elem")
				)
			}
			location.hash = "todo"
		})
})()
