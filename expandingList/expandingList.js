class ExpandingList extends HTMLUListElement {
	constructor() {
		const self = super()

		this.addStyles()

		if (this.classList.contains("closed")) {
			this.closeList()
		}
	}

	closeList() {
		const ulElements = Array.from(this.querySelectorAll("ul"))
		this.children[1].style.display = "none"
		ulElements.forEach((li) => {
			li.style.display = "none"
		})
	}

	openSublist(e) {
		if (!e.target.matches("span")) return
		const span = e.target
		const liSibling = span.nextSibling.nextSibling
		this.toggleDisplay(liSibling)
	}

	toggleDisplay(liSibling) {
		if (liSibling.style.display == "none") {
			liSibling.style.display = "block"
		} else {
			liSibling.style.display = "none"
		}
	}

	connectedCallback() {
		this.addEventListener("click", (e) => {
			this.openSublist(e)
		})
	}

	addStyles() {
		zero(this)

		const liElements = this.querySelectorAll("li")
		const ulElements = this.querySelectorAll("ul")

		liElements.forEach((li) => {
			const span = li.querySelector("span")
			if (span) zero(span)
			zero(li)

			li.style.paddingLeft = "1rem"
			li.style.display = "block"
		})

		ulElements.forEach((ul) => {
			zero(ul)
			const span = ul.querySelector("span")
			if (span) zero(span)
		})
	}
}

function zero(el) {
	el.style.padding = "0"
	el.style.margin = "0"
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" })
