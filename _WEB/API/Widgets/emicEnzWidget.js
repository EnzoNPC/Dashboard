//sin uso actualmente
export class EmicEnzWidget extends HTMLElement
{
    constructor() { super(); }

    connectedCallback() {
        if (this.closest("#areacentral") || this.closest("#controles")) {
            this.draggable = true;
        }
        
        // Si el widget se encuentra fuera de areacentral o controles (fabricacion) se bloquea el draggable.
        if (!this.closest("#areacentral") && !this.closest("#controles")) {
            this.draggable = false;
        }
        //*****************************************************************************************************

        this.addEventListener('dragover', this.eventDragoverListener);

        this.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            document.miDrag = this;
            this.style.opacity = "0.1";
        })

        this.addEventListener('dragend', (e) => {
            e.stopPropagation();
            document.miDrag = null;
            this.style.opacity = "1";
        })
        
        this.style.border = "0pt solid #1F030C";
        this.style.alignSelf = "center";

        // Mostrar identificador
        this.setAttribute("title", this.getAttribute("id"))
		this.addEventListener("click", this);
    }
	
	handleEvent(event) {
		if (event.type === "click") {
            event.stopPropagation();
		    const messageEvent = new CustomEvent("user:data-message", {
                detail: { from: "Manz", message: "Hello!" },
                bubbles: true,
                composed: true
            });
		    this.dispatchEvent(messageEvent);
		}
	}	
	
    // Este método hace varios ajustes a la instancia de EmicWidget dependiendo de su posición en el DOM y de ciertas características.
    preconnectedCallback(name) {

        if (this.closest("emic-dashboard") && this.classList.contains("herramienta")) {
            this.classList.remove("herramienta");
            this.shadowRoot.innerHTML = "";
            this.setAttribute('id', this.getNewID());
            document.miDrag = this;
            document.miDragAction = 'move';
            this.style.opacity = "0.1";

        }
        else if (this.shadowRoot.innerHTML !== "") {
            return false;
        }

        if (!this.closest("emic-dashboard")) {
            this.classList.add("herramienta");
            this.shadowRoot.innerHTML = name;
            this.draggable = true;
            this.addEventListener('dragstart', (e) => {
                document.miDrag = this;
                document.miDragAction = 'create';
            });
            this.addEventListener('dragend', (e) => {
                document.miDrag.style.opacity = "1";
                e.dataTransfer.setData("text", null);
                document.miDrag = null;
                this.style.opacity = "1";

            })
            return false;
        }
        return true;
    }

    eventDragoverListener(event) {
        event.stopPropagation();

        var nd = document.miDrag;
        if (this == nd) { return; }

        if (nd instanceof EmicEnzWidget ) {
            if (this.parentElement.getAttribute("direction") === "column") {
                if (event.offsetY < (this.clientHeight / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }
            }
            else {
                if (event.offsetX < (this.clientWidth / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }
            }
        }
    }
}

    customElements.define("emic-widget", EmicEnzWidget);