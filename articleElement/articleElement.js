const template = document.querySelector("template")
const notWords = `!@#$%^&*()_-=<>?,./';:"|\\`

class ArticleElement extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: "open" })
		const clone = document.importNode(template.content, true)
		this.shadowRoot.appendChild(clone)
	}
	connectedCallback() {
		const titleValue = this.shadowRoot
			.querySelector("[data-title-container] slot")
			.assignedNodes()[0]
			.textContent.trim()
		const input1 = this.shadowRoot.querySelector("[data-title]")
		input1.value = titleValue
		const text1Value = this.shadowRoot
			.querySelector("[data-text1-container] slot")
			.assignedNodes()[0]
			.textContent.trim()
			.replace("\n", " ")

		const input2 = this.shadowRoot.querySelector("[data-text1]")
		input2.value = text1Value
		const text2Value = this.shadowRoot
			.querySelector("[data-text2-container] slot")
			.assignedNodes()[0]
			.textContent.trim()
			.replace("\n", " ")
		const input3 = this.shadowRoot.querySelector("[data-text2]")
		input3.value = text2Value
		this.countWords()

		this.shadowRoot.addEventListener("input", (e) => {
			this.countWords()
		})

		const article = this.shadowRoot.querySelector("article")
		Array.from([input1, input2, input3]).forEach((el) => {
			el.addEventListener("focusout", (e) => {
				article.classList.remove("focused")
			})
			el.addEventListener("focusin", (e) => {
				article.classList.add("focused")
			})
		})
	}

	countWords() {
		const input1 = this.shadowRoot.querySelector("[data-title]").value
		const input2 = this.shadowRoot.querySelector("[data-text1]").value
		const input3 = this.shadowRoot.querySelector("[data-text2]").value

		const counted =
			countWords(input1) + countWords(input2) + countWords(input3)
		console.log(counted)
		const resultElement = this.shadowRoot.querySelector("[data-count]")
		resultElement.textContent = counted
	}
}
function countWords(text) {
	return text
		.trim()
		.split(" ")
		.filter((el) => !notWords.includes(el)).length
}

customElements.define("article-element", ArticleElement)
