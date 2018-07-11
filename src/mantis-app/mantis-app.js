import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';

//////////////////////////////////////////////////////////////////////
// Best example of data flow I could've come with:

export class XTarget extends PolymerElement {
  static get template() {
    return html`
      <h2>[[targetTitle]]</h2>
      <p>Target: [[targetValue]]</p>
      <input value="{{targetValue::change}}" placeholder="Make your move">
      <!--target-prop="{{hostProp::target-change-event}}"-->
    `;
  }

  static get properties() {
    return {
      targetValue: {
        type: String,
        notify: false, // Toggle to see the magic in action -- creates target-value-changed event
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
    this.addEventListener('target-value-changed', function(){
      console.log('I just wanna goooo');
    })
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
      <style>
        h1 {
          background-color: var(--custom-theme);
        }

        :host(.gray) {
          display: block;
          background-color: #ABC; /* a greyish color */
        }

        ::slotted(p) {
          background-color: cyan;
        }

        ::slotted(*) { /* all slots */
        color: white;
        }

      </style>
      <slot name="header"> Default in case is not defined! </slot>
      <h1>[[hostTitle]]</h1>
      <x-target target-value="{{hostValue}}" target-title="Another one bites de_dust2"></x-target>
      <p>Host: {{hostValue}}</p>
      <div style="color: {{myColor}};">
        Hey man
      </div>
      <p id="patho">ROOT PATH: [[rootPath]]</p>
      <button on-click="doitman">Clickateers reunite!</button>

      <template is="dom-repeat" items="{{arr}}">
        <div>{{item.name}}</div>
      </template>

      <template is="dom-if" if="{{_computeMe()}}">
        <p>I am but a fool</p>
      </template>
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
      arr: {
        type: Array,
        notify:true,
        value(){
          return [
            {name: 'victor', fool: true},
            {name: 'alfonso', fool: false}
          ];
        }
      },
      myColor: {
        type: String,
        value: '#AFC'
      }
    }
  }

  ready(){
    super.ready();
    console.log(this.$.patho); //static node path with ids
    console.log(this.shadowRoot.querySelector('h1'));
    this.removeAttribute('unresolved');
  }

  doitman(){
    console.log('Clickateer reporting in.');
  }

  _myClickListener(){
    console.log('UH');
  }

  // computed binding
  _computeMe(){
    return this.get(['arr',0]).fool;
  }
}

customElements.define('x-host', XHost);

// NOOOTE THIS!
//${super.template} in extended template to insert the superclass Content.

/* Custom events: this.dispatchEvent(new CustomEvent('kick', {detail: {kicked: true}}));
 and then use it:
document.querySelector('x-custom').addEventListener('kick', function (e) {
  console.log(e.detail.kicked); // true
})*/



/* 
PENDING:
1. some helpers -- not that important
2. attribute binding -- urgent...don't get it *** ATTEND
3. shadow dom events and detect changes in children -- not working for me
4. gesture events -- probably useful, situational
*/