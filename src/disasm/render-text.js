import { create as Canvas } from "../lib/canvas"
import makeCharmap from "./make-charmap"
import findTextWidth from "../view/find-textwidth"
import drawShadow from "../view/style-shadow"

export default function renderText(content, style, width) {
	let id = style.color
		? style.stroke
			? style.color + "+" + style.stroke
			: style.color
		: "default"
	let font = style.font
	if (!font) {
		throw new Error(`Attempting to render an unregistered font. Is your font exported by fonts/index.js?`)
	}
	if (!font.cache[id]) {
		font.cache[id] = makeCharmap(font.image, font.data, style.color, style.stroke)
	}
	let cached = font.cache[id]
	content = content.toString()
	if (!width) {
		width = findTextWidth(content, font, style.stroke)
	}
	let height = font.data.cellheight
	if (style.stroke) {
		height += 2
	}
	let text = Canvas(width, height)
	let x = 0
	let kerning = font.data.charspace
	if (style.stroke) {
		kerning -= 2
	}
	for (let char of content) {
		if (char === " ") {
			x += font.data.wordspace
			continue
		}
		let image = cached[char]
		if (!image) image = cached[char.toUpperCase()]
		if (!image) continue
		text.drawImage(image, x, 0)
		x += image.width + kerning
	}
	if (style.shadow) {
		return drawShadow(text.canvas, style.shadow)
	} else {
		return text.canvas
	}
}
