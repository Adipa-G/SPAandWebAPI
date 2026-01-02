import { Component, OnChanges, Input, Inject } from '@angular/core';

@Component({
    selector: '[pretty-print]',
    template: '<pre>{{prettyPrintOutput}}</pre>',
    standalone: false
})

export class PrettyPrint implements OnChanges {
    @Input('pretty-print') sourceStr: string;
    @Input() format: string;

    prettyPrintOutput: string;

    ngOnChanges(changes) {
        if (!this.sourceStr) {
            return;
        }

        const fixedStr = this.sourceStr.replace(/Bearer [^\s]*/g, "Bearer (token)");

        try {

            if (!this.format || this.format.toLowerCase() === 'json') {
                this.prettyPrintOutput = JSON.stringify(JSON.parse(fixedStr), null, 2);
            }
        } catch (e1) {
            try {
                let result = '';
                let level = 0;

                for (let i = 0; i < fixedStr.length; i++) {
                    const chr = fixedStr[i];
                    if (['{', '['].indexOf(chr) >= 0) {
                        level++;
                    }
                    if (['}', ']'].indexOf(chr) >= 0) {
                        level--;
                    }
                    if (['{', '}', '[', ']', ','].indexOf(chr) >= 0) {
                        result += '\n';
                        result += ' '.repeat(level);
                    }
                    result += chr;
                }
                this.prettyPrintOutput = result;
            } catch (e2) {
                this.prettyPrintOutput = fixedStr;
            }
        }
    }
}