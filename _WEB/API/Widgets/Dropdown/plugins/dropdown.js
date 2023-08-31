import { EmicWidget } from "./emicWidget.js";

class EmicWidgetDropdown extends EmicWidget {
  static namesList = {};
  dropdown;
  panel;  // Agregado: Variable para el panel

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetDropdown.namesList[`dropdown-${i}`]; i++);
    EmicWidgetDropdown.namesList[`dropdown-${i}`] = this;
    return `dropdown-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Dropdown")) {
      return;
    }

    // Crear el panel
    this.panel = document.createElement("div");
    this.panel.className = "emic-dash-panel";

    this.dropdown = document.createElement("select");
    this.dropdown.className = "form-control";

    // Añadir una opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.text = "Sensor 1";
    defaultOption.value = "?";
    defaultOption.selected = true;
    this.dropdown.appendChild(defaultOption);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    // Agregar el dropdown al panel
    this.panel.appendChild(this.dropdown);  // Modificación: Agregando el dropdown al panel

    // Agregar el panel al shadow DOM
    this.shadowRoot.appendChild(this.panel);  // Modificación: Agregando el panel en lugar del dropdown

    this.dropdown.addEventListener("change", this.change.bind(this));
    super.connectedCallback();
  }

  change(event) {
    console.log(this.getAttribute("id"), "change", event.target.value);
    if (window.dropdownChange) {
      window.dropdownChange(this.getAttribute("id"), event.target.value);
    }
  }

  addOption(label, value) {
    const option = document.createElement("option");
    option.text = label;
    option.value = value;
    this.dropdown.appendChild(option);  // Corregido: Usar appendChild en lugar de add
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.dropdown === "undefined") return;  // Corregido: Usar === en lugar de ==
    switch (name) {
      case "value":
        this.dropdown.value = now;
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

customElements.define("emic-widget-dropdown", EmicWidgetDropdown);
