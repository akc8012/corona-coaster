import { Size } from "~/physics/math";


type CanvasSizeInfo = {
	size: Size,
	needsBorder: boolean
};

const DESKTOP_SIZE = { width: 480, height: 854 };

export function calculateCanvasSize(windowSize: Size): CanvasSizeInfo {
	if (isDesktopScreen(windowSize.width))
		return { size: DESKTOP_SIZE, needsBorder: true };

	return { size: windowSize, needsBorder: false };
}

function isDesktopScreen(width: number): boolean {
	return width >= 500;
}
