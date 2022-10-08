const template = document.querySelector("template")

class UserCard extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		const clone = document.importNode(template.content, true)
		this.shadowRoot.appendChild(clone)
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector("button[data-btn-info]")
			.addEventListener("click", this.toggleInfo)
	}

	toggleInfo() {
		// this here is `button`!
		// because `toggleInfo` is being called from anonymous function
		const infoElement = this.parentNode.querySelector("[data-info]")

		infoElement.classList.toggle("closed")
		if (this.textContent == "hide info") {
			this.textContent = "show info"
		} else {
			this.textContent = "hide info"
		}
	}
}

customElements.define("user-card", UserCard)
