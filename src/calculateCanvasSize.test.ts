import { calculateCanvasSize } from "./calculateCanvasSize";


const mobileSize = [400, 240];
const desktopSize = [1280, 720];

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
	const { size: [width] } = calculateCanvasSize(desktopSize);
	expect(width).toBeLessThan(desktopSize[0]);
});
