type CanvasSizeInfo = { size: number[], needsBorder: boolean };
const desktopSize = [480, 854];

export function calculateCanvasSize(windowSize: number[]): CanvasSizeInfo {
	const [width] = windowSize;
	if (isMobileScreen(width))
		return { size: desktopSize, needsBorder: true };

	return { size: windowSize, needsBorder: false };
}

function isMobileScreen(width: number): boolean {
	return width >= 500;
}
