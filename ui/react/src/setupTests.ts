import '@testing-library/jest-dom/vitest';
import { TextDecoder, TextEncoder } from 'util';
import { vi } from 'vitest';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;

// Temporary compatibility shim while moving test code from jest.* to vi.*.
if (!(globalThis as any).jest) {
	(globalThis as any).jest = vi;
}
