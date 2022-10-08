const template = document.createElement("template")

template.innerHTML = `
<style>
            .popup {
                position: relative;
            }

            .onhover {
                opacity: 0;
                z-index: -100;
                position: absolute;
                top: 0;
                translate: 0 calc(-100% - 1rem);
                border: 1px solid blue;
                background-color: white;
                max-width: 200px;
                min-width: 150px;
                padding: .5em 1em;

                transition: 1s opacity;
            }

            .popup:hover .onhover {
                opacity: 1;
                z-index: 100;
            }

            .icon {
                border: 3px solid black;
                border-radius: 50%;
                height: 2rem;
                width: 2rem;
                display: inline-flex;
                justify-content: center;
                align-items: center;

            }
        </style>
        <div class="popup">
            <div class="icon"></div>
            <div class="onhover">
                <slot name="text">
            </div>
        </div>`
class PopUp extends HTMLElement {
	constructor() {
		super()

		this.attachShadow({ mode: "open" })
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		const icon = this.shadowRoot.querySelector(".icon")
		const imgCode = this.getAttribute("imgCode")
		icon.textContent = imgCode
	}
}

customElements.define("custom-popup", PopUp)
