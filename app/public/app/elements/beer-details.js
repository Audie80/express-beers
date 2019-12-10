import { LitElement, html } from "../web_modules/lit-element.js";

import bootstrapStyle from "../web_modules/@granite-elements/granite-lit-bootstrap.js";

class BeerDetails extends LitElement {
  
  constructor() {
    super();
    this.beer = {};
  }

  static get properties() {
    return {
      location: {
        type: Object
      },
      beer: {
        type: Object
      }
    };
  }

  static get styles() {
    return bootstrapStyle;
  }

  firstUpdated() {
    this._getData();
  }

  async _getData() {
    try {
      const response = await fetch(`/beer/${this.location.params.id}`);
      this.beer = await response.json();
    } catch (err) {
      console.log("Fetch failed", err);
    }
  }

  render() {
    return html`
      <style>
        .beer {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 150px;
        }
        .el-img {
          max-height: 100px;
        }
        .el-alcohol {
          clear:both;
        }
      </style>
      <div id="${this.beer.id}" class="beer clearfix">
        <img class="float-right el-img" src="/${this.beer.img}">
        <a href="#/beer/${this.beer.id}">
          <h2 class="el-name">${this.beer.name}</h2>
        </a>
        <p class="el-description">${this.beer.description}</p>
        <p class="float-right el-alcohol">Alcohol content: ${this.beer.alcohol}%</p>
      </div>
    `;
  }
}

customElements.define("beer-details", BeerDetails);
