// This import is necessary for the type declarations below to work
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';
import { InputTag } from './validateIds';

interface CustomMatchers {
	hasInputIds: (baseId: string, inputTag: InputTag) => void;
}

declare module 'vitest' {
	interface Assertion extends CustomMatchers {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
