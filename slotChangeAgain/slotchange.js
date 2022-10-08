const template = document.createElement("template")
const style = document.createElement("style")

style.innerHTML = `
    summary-list .chosen-item {
        color: white;
        background-color: hsl(200, 100%, 50%);
    }
`
template.innerHTML = `
    <article>
        <div class="list">
            <slot name="list"></slot>
        </div>
        <div>
            <slot name="chosen-desc"></slot>
        </div>
    </article>
`

console.log(template)
class Summary extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.prepend(style)
	}
	connectedCallback() {
		this.shadowRoot
			.querySelector('article slot[name="list"]')
			.addEventListener("click", (e) => this.handleClick(e))
	}

	handleClick(e) {
		if (!e.target.matches("li")) return
		const li = e.target
		const lookingFor = li.textContent
		const descriptions = this.querySelectorAll("[data-for]")

		this.removeChosenFromSiblings(li)
		li.classList.add("chosen-item")

		descriptions.forEach((desc) => {
			desc.removeAttribute("slot")
			if (desc.getAttribute("data-for") === lookingFor) {
				desc.setAttribute("slot", "chosen-desc")
			}
		})
	}
	removeChosenFromSiblings(el) {
		Array.from(el.parentNode.children).forEach((li) => {
			li.classList.remove("chosen-item")
		})
	}
}

customElements.define("summary-list", Summary)
