import { create as Canvas } from "../lib/canvas"
import rgb from "../lib/rgb"

const padx = 5
const pady = 3

export default function renderButton(content, opts, sprites) {
	let width = opts && opts.width
	let fill = opts && opts.fill
	let color = opts ? opts.color : [ 255, 255, 255 ]

	let text = sprites.Text(content, { color })
	let w = width || text.width + padx * 2
	let h = text.height + pady * 2 - 2
	let y = pady
	let x = width
		? Math.round(width / 2 - text.width / 2)
		: padx
	let button = Canvas(w, h)
	if (fill) button.fillStyle = rgb(...fill)
	button.fillRect(1, 0, w - 2, h)
	button.fillRect(0, 1, w, h - 2)
	button.drawImage(text, x, y)

	return button.canvas
}
