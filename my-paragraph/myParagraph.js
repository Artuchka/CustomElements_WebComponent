class Paragraph extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		const paragraph = document.createElement("p")

		this.shadowRoot.appendChild(paragraph)
		paragraph.innerHTML = this.innerHTML
		this.addStyles(paragraph)
	}

	addStyles(el) {
		el.style.backgroundColor = "hsl(230, 100%, 65%)"
		el.style.color = "white"
		el.style.padding = "1rem"
	}
}

customElements.define("my-paragraph", Paragraph)
