import { create as Canvas } from "../lib/canvas"

const padx = 5
const pady = 3

export default function renderButton(content, opts, sprites) {
	let width = opts && opts.width
	let text = sprites.Text(content)
	let w = width || text.width + padx * 2
	let h = text.height + pady * 2 - 2
	let y = pady
	let x = width
		? Math.round(width / 2 - text.width / 2)
		: padx
	let button = Canvas(w, h)
	if (opts && opts.color) {
		button.fillStyle = opts.color
	}
	button.fillRect(1, 0, w - 2, h)
	button.fillRect(0, 1, w, h - 2)
	button.drawImage(text, x, y)

	return button.canvas
}
