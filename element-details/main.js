const templateAttribute = document.createElement("template")
const templateDetails = document.createElement("template")

templateAttribute.innerHTML = `
<li class="attribute-list__item">
<span data-title></span>
<span data-desc></span>
</li>
`

templateDetails.innerHTML = `
<style>
* {
	margin: 0;
	padding: 0;
}

.main-info {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.details {
	border-bottom: 1px solid black;
	padding-bottom:1rem;
	margin-bottom:1rem;

}

.details .title {
	display: inline-flex;
	color: cadetblue;
	font-weight: bold;
}

.details .title::after {
	content: '>';
	font-weight: bold;
}

.details .title::before {
	content: '<';
}

.details .description {
	display: inline-block;
}

.details [data-btn] {
	display: inline-block;
	content: '';
	border: 1rem solid transparent;
	cursor: pointer;
}

.details [data-btn].closed {
	border-left-color: black;
	translate: 50% 0;
}

.details [data-btn].opened {
	border-top-color: black;
	translate: 0 50%;
}

.attr-info {
	padding: 1rem;
	display: block;
}

.attr-info.closed {
	display: none;
}

.attribute-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	list-style: none;
	padding-left: 1.5rem;
}


.attribute-list__item [data-title] {
	color: cadetblue;
	font-weight: bold;
	display: block;
}

.attribute-list__item [data-desc] {
	padding-left: 1rem;
}

.attr-title {
	color: white;
	background-color: cadetblue;
	width: max-content;
	padding: 0.5em 1em;
	border-radius: .5em;
}
</style>
<div class="details">
<div class="main-info" data-main-info>
	<div class="btn closed" data-btn></div>
	<div class="title">
		<slot name="title">
	</div>
	<div class="description">
		<slot name="description">
	</div>
</div>
<div class="attr-info closed" data-attr-info>
	<div class="attr-title">Attributes</div>
	<ul class="attribute-list" data-attr-list></ul>
</div>
</div>
`
class ElementDetails extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		this.shadowRoot.appendChild(templateDetails.content.cloneNode(true))

		const listElement = this.shadowRoot.querySelector("[data-attr-list]")
		let i = 1
		while (this.getAttribute(`attr-${i}`) !== null) {
			const element = templateAttribute.content.cloneNode(true)
			element.querySelector("[data-title]").textContent =
				this.getAttribute(`attr-${i}`)
			element.querySelector("[data-desc]").textContent =
				this.getAttribute(`attr-${i}-desc`)
			listElement.appendChild(element)
			i++
		}
	}

	toggleAttrInfo(e) {
		const button = this.shadowRoot.querySelector("[data-btn]")
		button.classList.toggle("closed")
		button.classList.toggle("opened")
		const attrInfo = this.shadowRoot.querySelector("[data-attr-info]")
		attrInfo.classList.toggle("closed")
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector("[data-main-info]")
			.addEventListener("click", (e) => {
				this.toggleAttrInfo(e)
			})
	}
}

customElements.define("element-details", ElementDetails)
