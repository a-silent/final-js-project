function cookiesCheck () {
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
	return Object.assign ( {}, ...res )
}

(async function () {
	let promises = [
		customElements.whenDefined("todo-elem"),
		customElements.whenDefined("welcome-elem"),
		customElements.whenDefined("wrapper-elem")
	]
	
	let cookie = cookiesCheck()
	
	let users = await fetch ("http://localhost:3000/users")
		.then (response => response.json())
	
	let user = users.find(
		user => {
			return user.email === cookie.e &&
				user.password === cookie.p
		}
	)
	
	Promise.all(promises)
		.then (() => {
			if (!user) {
				document.body.appendChild(
					document.createElement("welcome-elem")
				)
				return
			}
			document.body.appendChild(
				document.createElement("wrapper-elem")
			)
		})
})()
