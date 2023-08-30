import { EmicWidget } from "./emicWidget.js";

class EmicWidgetInputNum extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputNum;

  // Constructor.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputNum.namesList[`inputnum-${i}`]; i++);
    EmicWidgetInputNum.namesList[`inputnum-${i}`] = this;
    return `inputnum-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputNum")) {
      return;
    }
    this.inputNum = document.createElement("input");
    this.inputNum.type = "number";
    this.inputNum.step = "1";
    this.inputNum.maxLength = "2";

    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.inputNum.style.width = "40px";
    this.inputNum.style.height = "40px";
    this.inputNum.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.inputNum.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.inputNum.style.backgroundColor = "#e6f7ff"; // Fondo celeste claro para coincidir con la tabla
    this.inputNum.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.inputNum.style.fontSize = "18px"; // Tamaño de letra de 18px para coincidir con la tabla
    this.inputNum.style.cursor = "pointer";

    //############################################################################

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "0");
    }

    this.shadowRoot.appendChild(this.inputNum); // Asegúrate de que el input también esté en el shadow DOM

    this.inputNum.addEventListener("change", this.change.bind(this));
    super.connectedCallback();
  }

  change(event) {
    console.log("change", event.target.value);
    if (window.inputNumChange)
      inputNumChange(this.getAttribute("id"), event.target.value);
    this.setAttribute("value", event.target.value); // Actualizamos el atributo "value"
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputNum == "undefined") return;
    switch (name) {
      case "value":
        this.inputNum.value = now;
        break;
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }
}

customElements.define("emic-widget-inputnum", EmicWidgetInputNum);
