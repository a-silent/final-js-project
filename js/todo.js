class Todo extends HTMLElement {
	constructor () {
		super()
		this.card = this.createElem("div")
		let shadow = this.attachShadow({mode: "open"})
		shadow.appendChild( this.card )
		let style = shadow.appendChild(
			document.createElement("style")
		)
		style.textContent = `
			* {
				-webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 20px;
			}
			
			article,
			h2,
			input,
			div,
			section {
				border-radius: 5px;
			}
			
			div {
				display: inline-block;
				max-width: 270px;
				padding: 10px 10px 5px 10px;
				border: 1px dotted #8AB185;
				background-color: #F2F7F3;
				margin: 10px;
				position: relative;
			}
			
			h2 {
				text-align: center;
				border: 1px solid #8AB185;
				background-color: #B3C8CD;
				color: #fff;
				text-shadow: 3px 3px 5px #95CA00;
				letter-spacing: 0.1em;
				margin: 0 0 10px 0;
				outline: none;
				font-size: 25px;
				padding: 5px;
			}
			
			input {
				width: 100%;
				margin-bottom: 5px;
				padding: 8px;
				
				border: 1px solid transparent;
				outline: none;
				border-radius: 5px;
				background: #fff linear-gradient(to top, #D1E5BE, #fff);
			}
			
			p {
				padding: 5px 10px 5px 5px;
				border-bottom: 1px dotted #8AB185;
				background-color: #F2F7F3;
				margin: 0 0 5px 0;
			}
			
			button {
				
				min-width: 100%;
				padding: 5px;
				
			}
		`

		this.dayHeader = this.createElem ("h2", this.card)
		this.dayHeader.innerText = "point to when"
		this.dayHeader.contentEditable = "true"
		this.dayHeader.onfocus = event =>
			event.target.innerText = null
		this.dayHeader.onblur = event => {
			event.target.innerText = event.target.innerText || "Important"
			this.card.content.listName = event.target.innerText
			this.card.dispatchEvent(new Event("myEvent"))
		}
		this.dayHeader.onkeypress = event => {
			if (event.which === 13) {
				event.preventDefault()
				event.target.dispatchEvent(new Event("blur"))
			}
		}
		
		this.card.content = {
			listName: this.dayHeader.innerText,
			events: []
		}
		
		this.input = this.createElem("input", this.card)
		this.input.placeholder = "event..."
		this.input.onchange = (event) => {
			if (this.card.content.events.includes(event.target.value)) return
			let elem = this.createElem("p", this.card)
			elem.innerText = event.target.value
			this.card.content.events.push(event.target.value)
			this.card.dispatchEvent(new Event("myEvent"))
			event.target.value = null
		}
		
		this.deleteCard = this.createElem("button", this.card)
		this.deleteCard.innerText = "Remove card"
		this.deleteCard.onclick = () => this.remove()
		
	}
	
	createElem ( tagName, container ) {
		return  ( !container ? document.body : container )
			.appendChild (
				document.createElement ( tagName )
			)
	}
}

customElements.define("todo-elem", Todo)
