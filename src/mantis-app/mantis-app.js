import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

//////////////////////////////////////////////////////////////////////
// Best example of data flow I could've come with:

export class XTarget extends PolymerElement {
  static get template() {
    return html`
      <h2>[[targetTitle]]</h2>
      <p>Target: [[targetValue]]</p>
      <input value="{{targetValue::change}}" placeholder="Make your move">
    `;
  }

  static get properties() {
    return {
      targetValue: {
        type: String,
        notify: true, // Toggle to see the magic in action
        observer: '_changedTarget'
      },
      targetTitle: {
        type: String
      }
    }
  }

  _changedTarget(){
    //console.log('Changing minds...');
    //this.targetValue = 'Changed my mind';
  }

  static get observers(){
    return [
      '_complexObserver(targetValue)'
    ];
  }

  _complexObserver(targetValue,targetTitle){
    console.log(`Something's up...`,targetTitle,targetValue);
  }

  ready(){
    super.ready();
    console.log('Ready');
  }

  connectedCallback(){
    super.connectedCallback();
    console.log('ConnectedCallback');
  }

  disconnectedCallback(){
    super.disconnectedCallback();
    console.log('disconnectedCallback');
  }
}


customElements.define('x-target', XTarget);

//-----------------------------------------

class XHost extends PolymerElement {
  static get template() {
    return html`
      <slot name="header"></slot>
      <h1>[[hostTitle]]</h1>
      <x-target target-value="{{hostValue}}" target-title="Another one bites de_dust2"></x-target>
      <p>Host: {{hostValue}}</p>
      <div style="color: {{myColor}};">
        Hey man
      </div>
    `;
  }

  static get properties(){
    return {
      hostValue: {
        type: String,
        value: 'Transmitter'
      },
      hostTitle: {
        type: String
      },
      zeldawave: {
        type: String,
        value: "https://www.google.com"
      },
      myColor: {
        type: String,
        value: '#AFC'
      }
    }
  }
}

customElements.define('x-host', XHost);
