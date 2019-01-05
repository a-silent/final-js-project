(function () {
	// customElements.whenDefined("todo-elem")
	// 	.then (() => {
	// 		document.body.innerHTML = "<todo-elem data='http://localhost:3000/data'></todo-elem>"
	//
	// 	})


	customElements.whenDefined("welcome-elem")
		.then (() => {
			document.body.appendChild(
				document.createElement("welcome-elem")
			)
		})
	
	// customElements.whenDefined("todo-elem")
	// 	.then (() => {
	// 		document.body.appendChild(
	// 			document.createElement("todo-elem")
	// 		)
	// 	})
})()
