import * as math from 'mathjs';

test('vector times scalar returns vector', () => {
	const vector = [2, 7];
	const scalar = 3;

	expect(math.multiply(vector, scalar)).toStrictEqual([6, 21]);
});
