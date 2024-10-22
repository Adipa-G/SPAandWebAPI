import hljs from 'highlightjs';
import vkbeautify from 'vkbeautify'

export interface JsonFormatHeighlightProps { text: string }

const JsonFormatHeighlight = (props: JsonFormatHeighlightProps) => {
    if (!props.text)
        return null;

    var fixedStr = props.text.replace(/Bearer [^\s]*/g, "Bearer (token)");

    try {
        let formatted: any = vkbeautify.json(fixedStr);
        let highlighted: any = hljs.highlight('JSON', formatted);

        return <pre dangerouslySetInnerHTML={{ __html: highlighted.value }}></pre>;
    }
    catch (e1) {
        try {
            let result: string = '';
            let level: number = 0;

            for (var i = 0; i < fixedStr.length; i++) {
                var chr = fixedStr[i];
                if (['{', '['].indexOf(chr) >= 0) {
                    level++;
                }
                if (['}', ']'].indexOf(chr) >= 0) {
                    level--;
                }
                if (['{', '}', '[', ']', ','].indexOf(chr) >= 0) {
                    result += '\n';
                    result += (' ' as any).repeat(level);
                }
                result += chr;
            }
            return <pre>{result}</pre>;
        } catch (e2) {
            return <span>{fixedStr}</span>;
        }
    }
};

export default JsonFormatHeighlight;