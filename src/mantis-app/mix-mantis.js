
export function myMix(superClass) {
    return class extends superClass {
        constructor(){
            super();

            console.log('#3 here');
        }
    }
}