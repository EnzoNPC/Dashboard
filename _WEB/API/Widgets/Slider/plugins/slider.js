import { EmicWidget } from "./emicWidget.js";

class EmicWidgetSlider extends EmicWidget {
  //-----------------------------------------------------------------------------------
  // Definimos variables.
  //-----------------------------------------------------------------------------------
  static namesList = {};
  slider;

  //-----------------------------------------------------------------------------------
  // Constructor.
  //-----------------------------------------------------------------------------------
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------------
  // Método para obtener un nuevo ID.
  //-----------------------------------------------------------------------------------
  getNewID() {
    var i;
    for (i = 1; EmicWidgetSlider.namesList[`slider-${i}`]; i++);
    EmicWidgetSlider.namesList[`slider-${i}`] = this;
    return `slider-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------

  connectedCallback() {
    if (!super.preconnectedCallback("Slider")) {
      return;
    }
    // Creamos un nuevo elemento <input>
    this.slider = document.createElement("input");

    // Establecemos el tipo de input como "range"
    this.slider.type = "range";
    // Establecemos el valor mínimo y maximo
    //this.slider.min = "0";
    //this.slider.max = "100";

    // Si el elemento no tiene un atributo "id", se le asigna uno nuevo
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    // Mostrar identificador    
    if (!this.hasAttribute("sub-topic")) {
      this.setAttribute("sub-topic", "");
    }
    else if (this.getAttribute("sub-topic") !== "") {
      this.subTopic = this.getAttribute("sub-topic"); 
    }

    if (this.hasAttribute("min")) {
    this.slider.min = this.getAttribute("min");
    }
    if (this.hasAttribute("max")) {
    this.slider.max = this.getAttribute("max");
    }

    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna el valor 50
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", 50);
    }

    // Si el elemento no tiene un atributo "max", se le asigna el valor 100
    if (!this.hasAttribute("max")) {
      this.setAttribute("max", 100);
    }

    // Si el elemento no tiene un atributo "min", se le asigna el valor 0
    if (!this.hasAttribute("min")) {
      this.setAttribute("min", 0);
    }

    this.shadowRoot.appendChild(this.slider);
    //############################################################################
    // Establecemos el ancho y la altura del slider
    this.slider.style.height = "150px";
    this.slider.style.width = "150px";
    this.slider.style.transformOrigin = "center center";
    this.slider.style.transform = "rotate(0deg)";
    this.slider.style.backgroundColor = "transparent";
    //############################################################################
    //############################################################################
    // Agregamos una etiqueta de estilo para el Shadow DOM
    const style = document.createElement("style");
    style.innerHTML = `
    /* Estilos para el pulgar del slider */
    input[type="range"]::-webkit-slider-thumb {
      background: linear-gradient(to bottom, rgb(110, 159, 243) 40%, #6c79a7);
      height: 20px;
      width: 20px;
      border-radius: 50%;
      opacity: 0.9;
      border: 3px solid #008CBA;
      appearance: none; /* Importante para que los estilos se apliquen en diferentes navegadores */
    }
    
    /* Estilos para la pista del slider */
    input[type="range"]::-webkit-slider-runnable-track {
      background: #e6f7ff;
      height: 26px;
      width: 100%;
      border-radius: 12px;
      border: 3px solid #008CBA;
      cursor: pointer;
      appearance: none; /* Importante para que los estilos se apliquen en diferentes navegadores */
    }
    
    /* Asegurar que se vea bien en todos los navegadores */
    input[type="range"] {
      appearance: none; /* Eliminar el aspecto por defecto del navegador */
      width: 100%; /* Se necesita un ancho específico */
    }
    
    `;
    // Adjuntamos la etiqueta de estilo al Shadow DOM
    this.shadowRoot.appendChild(style);
    //############################################################################


    //----------------------------------------------------
    // Se define las llamadas a los eventos
    this.slider.addEventListener("change", this.change.bind(this));
    //----------------------------------------------------
    super.connectedCallback();
  }

  // Método llamado cuando ocurre el evento "change" en el slider
  change(event) {
    let value = event.target.value;
    console.log(this.getAttribute("id"), " change ", value);

    const messageEvent = new CustomEvent(`user:subscribe:${this.subTopic}`, {
      detail: { topic: this.subTopic, message: value },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(messageEvent);


    // Si existe una función global "sliderChange", se llama a esa función y se le pasa el ID del slider y su nuevo valor
    if (window.sliderChange)
      sliderChange(this.getAttribute("id"), event.target.value);
    this.setAttribute("value", event.target.value); // Actualizamos el atributo "value"
  }
  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecucion.
  //-----------------------------------------------------------------------------------
  // Lista de atributos observados por el elemento
  static get observedAttributes() {
    return ["value", "max", "min"];
  }

  // Método llamado cuando hay cambios en los atributos del elemento
  attributeChangedCallback(name, old, now) {
    // Si el slider no está definido, se retorna
    if (typeof this.slider == "undefined") return;

    switch (name) {
      // Si el atributo cambiado es "max", se actualiza el valor máximo del slider
      case "max":
        this.slider.max = now;
        break;
      // Si el atributo cambiado es "min", se actualiza el valor mínimo del slider
      case "min":
        this.slider.min = now;
        break;
      // Si el atributo cambiado es "min", se actualiza el valor mínimo del slider
      case "value":
        this.slider.value = now;
        break;
    }
  }

  //-----------------------------------------------------------------------------------
  // Métodos para obtener el valor de los atributos
  //-----------------------------------------------------------------------------------
  // Método para obtener el valor del atributo "value"
  get value() {
    return this.getAttribute("value");
  }

  // Método para obtener el valor del atributo "max"
  get max() {
    return this.getAttribute("max");
  }

  // Método para obtener el valor del atributo "min"
  get min() {
    return this.getAttribute("min");
  }
  // Método para establecer el valor del atributo "max"
  set value(newVal) {
    this.setAttribute("value", newVal);
  }
  // Método para establecer el valor del atributo "max"
  set max(newVal) {
    this.setAttribute("max", newVal);
  }

  // Método para establecer el valor del atributo "min"
  set min(newVal) {
    this.setAttribute("min", newVal);
  }
}

// Se define el nuevo elemento "emic-widget-slider"
customElements.define("emic-widget-slider", EmicWidgetSlider);
