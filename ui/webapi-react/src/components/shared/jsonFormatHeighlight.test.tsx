import { render, screen } from '@testing-library/react';

import JsonFormatHeighlight from "./jsonFormatHeighlight";

declare var JSON: any;

test('renders valid json', async () => {
    let text: string = JSON.stringify({ name: "fruits", values: ["mango", "banana"] });
    render(<JsonFormatHeighlight text={text} />);

    const attr = screen.getByText('"name"');
    const value = screen.getByText('"fruits"');

    expect(attr).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(attr).toHaveClass('hljs-attr');
    expect(value).toHaveClass('hljs-string');
});

test('fallback render when invalid json', async () => {
    let text: string = "[" + JSON.stringify({ name: "fruits", values: ["mango", "banana"] });
    render(<JsonFormatHeighlight text={text} />);

    const attr = screen.getByText(/\"name\"/i);

    expect(attr).toBeInTheDocument();
    expect(attr).not.toHaveClass('hljs-attr');
});