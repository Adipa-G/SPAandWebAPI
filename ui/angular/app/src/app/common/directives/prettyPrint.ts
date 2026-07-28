import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';

@Component({
    selector: 'app-pretty-print',
    template: '<pre>{{prettyPrintOutput()}}</pre>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class PrettyPrint {
    readonly sourceStr = input.required<string>();
    readonly format = input<string>();

    readonly prettyPrintOutput = computed(() => {
        const sourceStr = this.sourceStr();
        if (!sourceStr) {
            return '';
        }

        const fixedStr = sourceStr.replace(/Bearer [^\s]*/g, "Bearer (token)");

        try {
            const format = this.format();
            if (!format || format.toLowerCase() === 'json') {
                return JSON.stringify(JSON.parse(fixedStr), null, 2);
            }
            return '';
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
                return result;
            } catch {
                return fixedStr;
            }
        }
    });
}