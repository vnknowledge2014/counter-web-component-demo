class XCounter extends HTMLElement {
	constructor() {
		super();

		const template = `
			<style>
				.scene {
					width: 15em;
					position: absolute;
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				
				.cube {
					color: #ccc;
					cursor: pointer;
					font-family: 'Roboto', sans-serif;
					transition: all 0.85s cubic-bezier(0.17, 0.67, 0.14, 0.93);
					transform-style: preserve-3d;
					transform-origin: 100% 50%;
					width: 15em;
					height: 6em;
				}
				.cube:hover {
					transform: rotateX(-90deg);
				}
				
				.side {
					box-sizing: border-box;
					position: absolute;
					display: inline-block;
					height: 6em;
					width: 15em;
					text-align: center;
					text-transform: uppercase;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
				.top {
					background: #222229;
					transform: rotateX(90deg) translate3d(0, 0, 2.8em);
				}
				
				.front {
					background: #222229;
					color: #fff;
					box-shadow: inset 0 0 0 5px #fff;
					transform: translate3d(0, 0, 2.8em);
					
				}
				
				a, p {
					display: inline-flex;
				}
				
				a {
					width: 50px;
					height: 50px;
					border: none;
					color: #fff;
					font-size: 28px;
					position: relative;
					border-radius: 5px;
					align-items: center;
					justify-content: center;
					transition: all 0.4s ease 0s;
				}
				
				a[aria-label="increment"] {
					background: #00e640;
				}
				
				a[aria-label="decrement"] {
					background: #ed3330;
				}
				
				a[aria-label="decrement"]:hover,
				a[aria-label="increment"]:hover {
					background: #434343;
					letter-spacing: 1px;
					-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
					-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
					box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
					transition: all 0.4s ease 0s;
				}
				
				p {
					color: #fff;
					padding: 10px;
					font-size: 24px;
					transition: all 0.4s ease 0s;    
				}
			</style>

			<div class="scene">
				<div class="cube">
					<div class="side top">
						<div class="xcounter">
							<a aria-label="decrement" id="decrement"><span>-</span></a>
							<p>0</p>
							<a aria-label="increment" id="increment"><span>+</span></a>
						</div>
					</div>
					<div class="side front">Counter App</div>
				</div>
			</div>
		`;

		let templateShadow = this.attachShadow({
			mode: "open",
		});
		templateShadow.innerHTML = template;
		this._value = 0;
		
		this.valueElement = this.shadowRoot.querySelector("p");
		this.incrementButton = this.shadowRoot.querySelector("#increment");
		this.decrementButton = this.shadowRoot.querySelector("#decrement");

		this.incrementButton.addEventListener("click", (e) =>
				this.dispatchEvent(
					new CustomEvent("incrementClick", {
						detail: "incrementBtn",
					})
				)
			);

			this.decrementButton.addEventListener("click", (e) =>
				this.dispatchEvent(
					new CustomEvent("decrementClick", {
						detail: "decrementBtn",
					})
				)
			);
	}

	get value() {
		return this._value;
	}

	set value(value) {
		this._value = value;
		this.valueElement.innerText = this._value;
	}

	static get observedAttributes() {
		return ["value"];
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		return {
			value: () => {
				this.value = parseInt(newValue, 10);
			},
		}[attributeName]();
	}
}
// @ts-ignore
customElements.define("x-counter", XCounter);