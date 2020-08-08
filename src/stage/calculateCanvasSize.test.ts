import { calculateCanvasSize } from "./calculateCanvasSize";


const mobileSize = { width: 400, height: 240 };
const desktopSize = { width: 1280, height: 720 };

test('canvas size has border for desktop', () => {
	let info = calculateCanvasSize(desktopSize);
	expect(info.needsBorder).toBeTrue();
});

test('canvas size has no border for mobile', () => {
	let info = calculateCanvasSize(mobileSize);
	expect(info.needsBorder).toBeFalse();
});

test('mobile canvas size is fullscreen', () => {
	let info = calculateCanvasSize(mobileSize);
	expect(info.size).toBe(mobileSize);
});

test('desktop canvas size is not fullscreen', () => {
	const info = calculateCanvasSize(desktopSize);
	expect(info.size.width).toBeLessThan(desktopSize.width);
});
