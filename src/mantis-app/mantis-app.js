import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';

/**
 * @customElement
 * @polymer
 */
export class MantisApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]] it is me [[giorgio]]!</h2>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'mantis-app',
        reflectToAttribute: true
      },
      giorgio: {
        type: String,
        value: 'Giovanni Giorgio'
      }
    };
  }

  constructor(){
    super();
    console.log('Constructor');
  }

  ready(){
    super.ready();
    console.log('Ready');
    afterNextRender(this, function() {
      this.removeAttribute('unresolved');
    });
  }

  connectedCallback(){
    super.connectedCallback();
    console.log('ConnectedCallback');
  }

  disconnectedCallback(){
    super.disconnectedCallback();
    console.log('disconnectedCallback');
  }

  attributeChangedCallback(name,old,value){
    super.attributeChangedCallback();
    console.log('attributeChangedCallback',name,old,value);
    //this[name] = value;
  }

}

window.customElements.define('mantis-app', MantisApp);
