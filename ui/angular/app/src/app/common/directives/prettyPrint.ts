import { Component, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '[pretty-print]',
    template: '<pre>{{prettyPrintOutput}}</pre>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class PrettyPrint implements OnChanges {
    @Input('pretty-print') sourceStr!: string;
    @Input() format?: string;

    prettyPrintOutput = '';

    ngOnChanges() {
        if (!this.sourceStr) {
            return;
        }

        const fixedStr = this.sourceStr.replace(/Bearer [^\s]*/g, "Bearer (token)");

        try {

            if (!this.format || this.format.toLowerCase() === 'json') {
                this.prettyPrintOutput = JSON.stringify(JSON.parse(fixedStr), null, 2);
            }
        } catch {
            try {
                let result = '';
                let level = 0;

                for (const chr of fixedStr) {
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
            } catch {
                this.prettyPrintOutput = fixedStr;
            }
        }
    }
}