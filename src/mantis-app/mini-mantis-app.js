import {MantisApp} from './mantis-app';

export class miniMantisApp extends MantisApp { 
    static get properties() {
        return {
            third: Boolean
        };
      }

      minime(){
        console.log('This is meeeeneeee meeee');
      }
}


window.customElements.define('mini-mantis-app', miniMantisApp);