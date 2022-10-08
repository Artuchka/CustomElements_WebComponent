const template = document.createElement("template")

template.innerHTML = `

<style>

.user-card {
    border-bottom: 5px solid purple;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap:1rem;
    margin-bottom: 2rem;
}

.user-card h3 {
    color:coral;
    font-weight: bold;
    font-size: 2rem;
}

.user-card img {
    grid-column: 1 /2;
    width:100%;
    height:100%;
    object-fit:cover;
}

.user-card div > *  {
    margin:0;
    padding:0;
}

.user-card div {
    grid-column: 2 /3;
    padding-bottom: 1rem;
    padding-top: 1rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    align-items: flex-start;
}

.user-card button {
    color:white;
    background-color:purple;
    outline:none;
    border:none;
    border-radius: 5px;
    font-size:1rem;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    font-weight: bold;
    margin-top:auto;
}

.user-card .info {
    display:block;
}

</style>
<div class="user-card"> 
    <img/>  
    <div>
        <h3></h3>
        <div class="info" data-info>
            <p><slot name='email'/></p>
            <p><slot name='phone'/></p>
        </div>
        <button id="toggle-info">hide info</button>
    </div>
</div>

`

class UserCard extends HTMLElement {
	constructor() {
		super()

		this.showInfo = true

		this.attachShadow({ mode: "open" })

		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.shadowRoot.querySelector("h3").innerText =
			this.getAttribute("name")
		this.shadowRoot.querySelector("img").src = this.getAttribute("avatar")
	}

	toggleInfo() {
		this.showInfo = !this.showInfo
		const infoElement = this.shadowRoot.querySelector("[data-info]")
		const buttonElement = this.shadowRoot.querySelector("#toggle-info")
		if (this.showInfo) {
			infoElement.style.display = "block"
			buttonElement.textContent = "hide info"
		} else {
			infoElement.style.display = "none"
			buttonElement.textContent = "show info"
		}
	}

	connectedCallback() {
		this.shadowRoot
			.querySelector("#toggle-info")
			.addEventListener("click", (e) => this.toggleInfo())
	}
	disconnectedCallback() {
		this.shadowRoot
			.querySelector("#toggle-info")
			.removeEventListener("click")
	}
}

window.customElements.define("user-card", UserCard)
