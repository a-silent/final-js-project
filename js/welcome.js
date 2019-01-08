class Welcome extends HTMLElement {
	constructor () {
		super()
		location.hash = "welcome"
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
				background-image: url("img/bg-welcome.jpg");
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center center;
				border-radius: 10px;
				height: 100%;
				max-width: 1200px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				overflow: hidden;
			}
			
			h1 {
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
				font-size: 70px;
				color: #ddd;
				text-shadow: 0 0 15px #010619;
				margin: 0 0 10px 0;
				text-align: center;
			}
			
			#inputBlock {
				display: flex;
				flex-direction: column;
			}
			
			#inputBlock input {
				margin-bottom: 10px;
				padding: 5px;
				font-size: 20px;
				border: 1px solid transparent;
				outline: none;
				border-radius: 5px;
				background: #fff linear-gradient(to top, #D1E5BE, #fff);
				display: none;
				position: relative;
			}
			
			#btnsBlock {
				display: flex;
				flex-wrap: wrap;
				margin-top: 15px;
				justify-content: center;
			}
			
			button {
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
				min-width: 250px;
				padding: 10px 20px;
				border: 3px solid #F1FFE7;
				outline: none;
				font-size: 25px;
				margin: 0 30px 10px 30px;
				border-radius: 10px;
				background-color: #213051;
				color: #F1FFE7;
				letter-spacing: 0.03em;
				transition: all 0.5s;
				opacity: 0.8;
			}
			
			button:hover {
				letter-spacing: 0.1em;
				transform: scale(1.05);
				cursor: pointer;
			}
			
			button:active {
				background-color: #F1FFE7;
				color: #213051;
				transition: all 0s;
			}
		`
		this.welcome = this.createElem("h1", this.container )
		this.welcome.innerHTML = "ToDo list app"
		
		this.inputBlock = this.createElem("div", this.container)
		this.inputBlock.id = "inputBlock"
		
		this.inputName = this.createElem ("input", this.inputBlock)
		this.inputName.placeholder = "Name"
		
		this.inputEmail = this.createElem ("input", this.inputBlock)
		this.inputEmail.type = "email"
		this.inputEmail.placeholder = "E-mail"
		
		this.inputPassword = this.createElem ("input", this.inputBlock)
		this.inputPassword.type = "password"
		this.inputPassword.placeholder = "Password"
		
		this.btnsBlock = this.createElem("div", this.container)
		this.btnsBlock.id = "btnsBlock"
		
		this.btnLog = this.createElem("button", this.btnsBlock)
		this.btnLog.innerText = "Log in"
		this.btnLog.onclick = this.showInputLog.bind(this)
		
		this.btnReg = this.createElem("button", this.btnsBlock)
		this.btnReg.innerText = "Register"
		this.btnReg.onclick = this.showInputReg.bind(this)
	}
	createElem ( tagName, container ) {
		return  ( !container ? document.body : container )
			.appendChild (
				document.createElement ( tagName )
			)
	}
	
	resetInput () {
		let inputs = this.container.querySelectorAll("input")
		for (let input of inputs) {
			input.value = null
			input.style.border = "1px solid transparent"
		}
	}
	
	showInputLog (event) {
		location.hash = "login"
		this.resetInput()
		this.inputName.style.display = "none"
		TweenMax.fromTo( this.inputEmail, .7,
			{
				display: "none",
				opacity: 0,
				left: `${window.innerWidth / 2}`
			},
			{
				display: "inline-block",
				opacity: 1,
				left: 0,
				ease: Back.easeOut
			} )
		TweenMax.fromTo( this.inputPassword, .7,
			{
				display: "none",
				opacity: 0,
				left: `${window.innerWidth / -2}`
			},
			{
				display: "inline-block",
				opacity: 1,
				left: 0,
				ease: Back.easeOut
			} )
		
		this.btnReg.onclick = this.showInputReg.bind(this)
		this.btnLog.onclick = this.logLoadData.bind(this)
	}
	
	showInputReg () {
		location.hash = "register"
		this.resetInput()
		TweenMax.fromTo( this.inputName, .7,
			{
				display: "none",
				opacity: 0,
				left: `${window.innerWidth / 2}`
			},
			{
				display: "inline-block",
				opacity: 1,
				left: 0,
				ease: Back.easeOut
			} )
		TweenMax.fromTo( this.inputEmail, .7,
			{
				display: "none",
				opacity: 0,
				left: `${window.innerWidth / -2}`
			},
			{
				display: "inline-block",
				opacity: 1,
				left: 0,
				ease: Back.easeOut
			} )
		TweenMax.fromTo( this.inputPassword, .7,
			{
				display: "none",
				opacity: 0,
				top: `${window.innerHeight / 2}`
			},
			{
				display: "inline-block",
				opacity: 1,
				top: 0
			} )
		
		this.btnLog.onclick = this.showInputLog.bind(this)
		this.btnReg.onclick = this.regSendData.bind(this)
	}
	
	validateInput () {
		let inputs = this.container.querySelectorAll("input")
		let res = 0
		let i = 0
		for (let input of inputs) {
			if (input.style.display === "none") continue
			input.style.border = "1px solid transparent"
			++i
			!input.value.trim() ?
				input.style.border = "1px solid red" : ++res
		}
		return (i === res)
	}
	
	async regSendData () {
		if (!this.validateInput()) return
		let name = this.inputName.value.trim()
		let email = this.inputEmail.value.trim()
		let pswd = Sha256.hash (this.inputPassword.value)
		let userId = new Date().getTime() + Math.floor ( Math.random() * 1000 )
		let users = await fetch("http://localhost:3000/users")
			.then (response => response.json())
		let user = users.find(
			user => user.email === this.inputEmail.value.trim()
		)
		if (user) {
			this.btnLog.dispatchEvent(new Event ("click"))
			this.inputEmail.value = email
			return
		}
		fetch("http://localhost:3000/users", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
				name: name,
				email: email,
				password: pswd,
				userId: userId
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then (response => {
				if (response.status !== 201) return
				fetch ("http://localhost:3000/data", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({
						userId: userId,
						content: []
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then((response) => {
						if (response.status !== 201) return
						this.btnLog.dispatchEvent(new Event ("click"))
						this.inputEmail.value = email
					})
			})
		
	}
	
	async logLoadData () {
		if (!this.validateInput()) return
		let email = this.inputEmail.value.trim()
		let pswd = Sha256.hash (this.inputPassword.value)
		let users = await fetch("http://localhost:3000/users")
			.then (response => response.json())
		let user = users.find(
			user => return user.email === email &&
				user.password === pswd
		)
		if (!user) {
			this.btnReg.dispatchEvent(new Event ("click"))
			this.inputEmail.value = email
			return
		}
		document.cookie = `e=${email}`
		document.cookie = `p=${pswd}`
		location.hash = "todo"
		this.remove()
	}
}

customElements.define("welcome-elem", Welcome)