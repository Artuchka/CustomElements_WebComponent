const template = document.createElement("template")

template.innerHTML = `
<style>

.chosen-text {
    background-color: hsl(230, 100%, 70%);
    color: white;
}
</style>
<article>
    <div>
        <slot name="master-list"></slot>
    </div>
    <div class="chosen-text">
        <slot name="choice"></slot>
    </div>
</article>
`

const styleSummary = document.createElement("style")
styleSummary.textContent = `
.chosen-p {
    background-color: hsl(230, 100%, 70%);
    color: white;
}
.chosen-p::marker {
    // background-color: hsl(230, 100%, 70%);
    color: orange;
}
`

class summaryDetails extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.appendChild(styleSummary)
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector('slot[name="master-list"]')
			.addEventListener("click", (e) => {
				this.handleClick(e)
			})
	}

	handleClick(e) {
		if (!e.target.matches("li")) return
		const li = e.target
		Array.from(li.parentNode.children).forEach((li) => {
			li.classList.remove("chosen-p")
		})

		const name = li.textContent
		li.classList.add("chosen-p")

		const descriptions = Array.from(this.querySelectorAll("p"))
		descriptions.forEach((desc) => {
			desc.removeAttribute("slot")
			if (desc.getAttribute("data-name") == name) {
				desc.setAttribute("slot", "choice")
			}
		})
		/*
            so we set the attribute `slot` with value `choice`
            on the paragraph we want to be shown in
            `<slot name="choice"></slot>`
        */
	}
}

customElements.define("summary-details", summaryDetails)
