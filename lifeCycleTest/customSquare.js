class Square extends HTMLElement {
	static get observedAttributes() {
		return ["size", "color"]
	}
	constructor() {
		super()

		const shadow = this.attachShadow({ mode: "open" })
		const div = document.createElement("div")
		const style = document.createElement("style")
		shadow.appendChild(style)
		shadow.appendChild(div)
	}

	connectedCallback() {
		console.log("created")
		this.updateProperties()
	}
	disconnectedCallback() {
		console.log("removed")
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log("changed ", name, " to ", newValue)
		this.updateProperties()
	}

	updateProperties() {
		const shadowStyle = this.shadowRoot.querySelector("style")

		const size = this.getAttribute("size")
		const color = this.getAttribute("color")

		shadowStyle.textContent = `
            div {
                height: ${size};
                width: ${size};
                background-color: ${color};
            }
        `
	}
}

customElements.define("custom-square", Square)
