class Wrapper extends HTMLElement {
	constructor () {
		super()
		this.container = this.createElem("div")
		this.container.id = "main"
		let shadow = this.attachShadow({mode: "open"})
		shadow.appendChild( this.container )
		let style = shadow.appendChild(
			document.createElement("style")
		)
		style.textContent = `
			* {
				-webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
			}
			
			#main {
				margin: 0 auto;
				background-color: ##83ACA4;
				background-image: url("img/bg-wrapper.jpg");
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center center;
				border-radius: 10px;
				min-height: 100%;
				max-width: 1200px;
				padding: 10px;
				overflow: hidden;
			}
			
			#buttons {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
			}
			
			#buttons button {
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
				min-width: 250px;
				padding: 10px 20px;
				border: 3px solid #F1FFE7;
				outline: none;
				font-size: 25px;
				margin: 0 10px 10px 10px;
				border-radius: 10px;
				background-color: #213051;
				color: #F1FFE7;
				letter-spacing: 0.03em;
				transition: all 0.5s;
				opacity: 0.8;
			}
			
			#buttons button:hover {
				letter-spacing: 0.1em;
				transform: scale(1.05);
				cursor: pointer;
			}
			
			#buttons button:active {
				background-color: #F1FFE7;
				color: #213051;
				transition: all 0s;
			}
			
			#wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
			}
		`
		
		this._listen = this.listen().bind(this)
		
		this.buttons = this.createElem("div", this.container)
		this.buttons.id = "buttons"
		
		this.btnAdd = this.createElem("button", this.buttons)
		this.btnAdd.innerText = "Add card"
		this.btnAdd.onclick = this.addCard.bind(this)
		
		this.btnSave = this.createElem("button", this.buttons)
		this.btnSave.innerText = "Save all"
		this.btnSave.onclick = this.saveCards.bind(this)
		
		this.btnExit = this.createElem("button", this.buttons)
		this.btnExit.onclick = this.exit.bind(this)
		
		this.wrapper = this.createElem("div", this.container)
		this.wrapper.id = "wrapper"
		
		this.cookies = this.getCookies
		
		this.addAllCards()
	}
	
	createElem ( tagName, container ) {
		return  ( !container ? document.body : container )
			.appendChild (
				document.createElement ( tagName )
			)
	}
	
	getCookies () {
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
	
	listen () {
		this.btnSave.style.color = "red"
	}
	
	exit () {
		let date = new Date(0);
		document.cookie = "e=; expires=" + date.toUTCString();
		document.cookie = "p=; expires=" + date.toUTCString();
		document.body.removeEventListener("myEvent", this._listen)
		this.remove()
		document.body.appendChild(
			document.createElement("welcome-elem")
		)
		
	}
	
	addCard () {
		customElements.whenDefined("todo-elem")
			.then (() => {
				let card = this.wrapper.appendChild(
					document.createElement("todo-elem")
				)
				card.style = "position: relative;"
				TweenMax.fromTo( card, .7,
					{
						display: "none",
						opacity: 0,
						top: `${window.innerWidth / 2}`
					},
					{
						display: "inline-block",
						opacity: 1,
						top: 0,
						ease: Power4.easeOut
					} )
				document.body.dispatchEvent(new Event("myEvent"))
			})
	}
	
	async saveCards () {
		let cookie = this.cookies()
		let users = await fetch ("http://localhost:3000/users")
			.then (response => response.json())
		let user = users.find(
			user => {
				return user.email === cookie.e &&
					user.password === cookie.p
			}
		)
		if (!user) return
		let cards = []
		for (let item of this.wrapper.querySelectorAll("todo-elem")) {
			cards.push(item.card.content)
		}
		fetch (`http://localhost:3000/data/${user.userId}`, {
			method: "PATCH",
			mode: "cors",
			body: JSON.stringify({
				content: cards
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => this.btnSave.style.color = "#F1FFE7")
	}
	
	async addAllCards () {
		let cookie = this.cookies()
		let users = await fetch ("http://localhost:3000/users")
			.then (response => response.json())
		let user = users.find(
			user => {
				return user.email === cookie.e &&
					user.password === cookie.p
			}
		)
		if (!user) {
			this.remove()
			document.body.appendChild(
				document.createElement("welcome-elem")
			)
			return
		}
		location.hash = "todo"
		document.body.addEventListener("myEvent", this._listen)
		let userData = await fetch (`http://localhost:3000/data/${user.userId}`)
			.then (response => response.json())
		customElements.whenDefined("todo-elem")
			.then (() => {
				if (userData === []) return
				for (let item of userData.content){
					let card = this.wrapper.appendChild(
						document.createElement("todo-elem")
					)
					card.dayHeader.innerText = item.listName
					card.dayHeader.dispatchEvent(new Event("blur"))
					for (let event of item.events) {
						card.input.value = event
						card.input.dispatchEvent(new Event("change"))
					}
				}
				this.btnSave.style.color = "#F1FFE7"
			})
	}
}

customElements.define("wrapper-elem", Wrapper)