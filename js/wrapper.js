class Wrapper extends HTMLElement {
	constructor () {
		super()
		this.container = this.createElem("article")
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
			
			article,
			h2,
			input,
			div,
			section {
				border-radius: 5px;
			}
		
			article {
				margin: 0 auto;
				background-color: #F1FFE780;
				border-radius: 10px;
				height: 100%;
				max-width: 1200px;
				display: flex;
				align-items: flex-start;
				padding: 10px;
			}
			
			section {
				padding: 5px;
				border: 1px dotted #8AB185;
				background-color: #F2F7F3;
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
				outline: none;
				font-size: 18px;
				padding: 5px;
				border: 1px solid #8AB185;
				margin: 0 0 10px 0;
				background-color: #F2F7F3;
				max-width: 100%;
			}
			
			div {
				padding: 5px 10px 5px 5px;
				border: 1px dotted #8AB185;
				background-color: #F2F7F3;
				margin-bottom: 5px;
			}
		`
		console.dir (shadow)
		console.dir (this)
		console.dir (this.container)
	}
	
	createElem ( tagName, container ) {
		return  ( !container ? document.body : container )
			.appendChild (
				document.createElement ( tagName )
			)
	}
	
}

customElements.define("wrapper-elem", Wrapper)