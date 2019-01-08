class Todo extends HTMLElement {
	constructor () {
		super()
		this.card = this.createElem("div")
		this.card.id = "main"
		let shadow = this.attachShadow({mode: "open"})
		shadow.appendChild( this.card )
		let style = shadow.appendChild(
			document.createElement("style")
		)
		style.textContent = `
			@import "/projectJS/css/icomoon.css";
		
			* {
				-webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 25px;
			}
			
			#main {
				max-width: 300px;
				position: relative;
				margin: 10px;
				background-color: rgba(255,255,255,0.4);
				border: 1px solid #fff;
				box-shadow: 5px 5px 15px #213051;
			}
			
			h2 {
				background-color: #213051;
				padding: 10px;
				margin: 0 0 5px 0;
				color: #fff;
				text-align: center;
				font-size: 30px;
			}
			
			input {
				width: calc(100% - 10px);
				margin: 0 5px 5px 5px;
				padding: 8px;
				background: linear-gradient(to top, #D1E5BE, #fff);
				border: none;
				outline: none;
			}
			
			ol {
				padding: 0;
				margin: 0  5px 5px 5px;
			}
			
			li {
				border-bottom: 1px dashed #fff;
				list-style-position: inside;
				padding: 8px 0;
			}
			
			li:last-child {
				border-bottom: none;
			}
			
			button {
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
				width: calc(100% - 10px);
				margin: 0 5px 5px 5px;
				padding: 5px 0;
				font-size: 20px;
				outline: none;
				
				border: 2px solid #F1FFE7;
				background-color: #213051;
				color: #F1FFE7;
				letter-spacing: 0.03em;
				transition: all 0.5s;
				opacity: 0.8;
			}
			
			button:hover {
				letter-spacing: 0.1em;
				transform: scale(1.02);
				cursor: pointer;
			}
			
			button:active {
				background-color: #F1FFE7;
				color: #213051;
				transition: all 0s;
			}
			
			.iconDelete {
				cursor: pointer;
				float: right;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
			.iconDelete span {
				vertical-align: bottom;
			}
		`

		this.dayHeader = this.createElem ("h2", this.card)
		this.dayHeader.innerText = "-- date --"
		this.dayHeader.contentEditable = "true"
		this.dayHeader.onfocus = event =>
			event.target.innerText = null
		this.dayHeader.onblur = event => {
			event.target.innerText = event.target.innerText || "Important!"
			this.card.content.listName = event.target.innerText
			document.body.dispatchEvent(new Event("myEvent"))
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
			if (
				this.card.content.events.includes(event.target.value) ||
				event.target.value === ""
			) return
			let elem = this.createElem("li", this.list)
			elem.innerText = event.target.value
			this.card.content.events.push(event.target.value)
			
			let iconDelete = this.createElem("div", elem)
			iconDelete.class = "iconDelete"
			iconDelete.innerHTML = "<span class='icon-cancel-circle'></span>"
			iconDelete.onclick = event => {
				// this.card.content.events.splice(
				// 	this.card.content.events.indexOf(event.target.innerText), 1
				// )
				console.dir (event.target)
				//event.target.remove()
				document.body.dispatchEvent(new Event("myEvent"))
			}
			
			document.body.dispatchEvent(new Event("myEvent"))
			event.target.value = null
		}
		
		this.list = this.createElem("ol", this.card)
		
		this.deleteCard = this.createElem("button", this.card)
		this.deleteCard.innerText = "Remove card"
		this.deleteCard.onclick = () => {
			this.remove()
			document.body.dispatchEvent(new Event("myEvent"))
		}
		
	}
	
	createElem ( tagName, container ) {
		return  ( !container ? document.body : container )
			.appendChild (
				document.createElement ( tagName )
			)
	}
}

customElements.define("todo-elem", Todo)
