import * as EaseLinear from "../anims/ease-linear"
import { create as Canvas } from "../lib/canvas"
import rgb from "../lib/rgb"
import bounds from "../view/node-bbox"

export { create, onenter, onexit, render }

const create = (label, options, onclick) => ({
	type: "MenuOption",
	label: label,
	options: options,
	onclick: onclick,
	anim: null,
	exit: false,
	select: 0,
	cache: {
		select: null,
		image: null,
		spots: []
	}
})

const onenter = (opt, view) => {
	opt.select = Number(view.config.theme !== "white")
	opt.cache.image = renderOpt(opt, view)
	return opt.cache.spots.map(spot => [ "addspot", spot ])
}

const onexit = opt =>
	opt.cache.spots.map(spot => [ "removespot", spot ])

const render = (opt, view) => {
	let nodes = []
	let viewport = view.viewport

	let image = opt.cache.image
	if (opt.cache.select !== opt.select) {
		opt.cache.select = opt.select
		opt.cache.image = renderOpt(opt, view)
	}

	let node = {
		image: opt.cache.image,
		x: viewport.width / 2,
		y: 48,
		origin: "center"
	}

	if (image !== opt.cache.image) {
		for (let spot of opt.cache.spots) {
			let bbox = bounds(node)
			spot.abs = {
				left: bbox.left + spot.rel.x,
				top: bbox.top + spot.rel.y,
				right: bbox.left + spot.rel.x + spot.rel.width,
				bottom: bbox.top + spot.rel.y + spot.rel.height
			}
		}
	}

	opt.node = node
	nodes.push(node)
	return nodes
}

// renderOpt(opt, view) -> canvas
// > FX: caches hotspots in map `opt.spots : idx -> spot`
const renderOpt = (opt, view) => {
	let { sprites, viewport } = view
	let light = view.config.theme === "white"

	let ctx = Canvas(viewport.width - 32, 12)
	ctx.fillStyle = light ? rgb(204, 204, 204) : rgb(51, 51, 51)
	ctx.fillRect(1, 0, ctx.canvas.width - 2, ctx.canvas.height)
	ctx.fillRect(0, 1, ctx.canvas.width, ctx.canvas.height - 2)

	let label = sprites.Text(opt.label)
	let labelw = label.width + 5 * 2
	ctx.fillStyle = light ? "black" : rgb(102, 102, 102)
	ctx.fillRect(1, 0, labelw - 2, 12)
	ctx.fillRect(0, 1, labelw, 10)
	ctx.drawImage(label, 5, 2)

	let width = 0
	let texts = []
	for (let i = 0; i < opt.options.length; i++) {
		let option = opt.options[i]
		let color = light
			? i === opt.select
				? [ 102, 102, 102 ]
				: [ 153, 153, 153 ]
			: i === opt.select
				? [ 204, 204, 204 ]
				: [ 153, 153, 153 ]
		let text = sprites.Text(option, { color })
		texts.push(text)
		width += text.width
		if (i) {
			width += 10
		}
	}

	let x = Math.round(labelw + (ctx.canvas.width - labelw) / 2 - width / 2)
	for (let i = 0; i < texts.length; i++) {
		let text = texts[i]
		ctx.drawImage(text, x, 2)
		if (!opt.cache.spots[i]) {
			opt.cache.spots[i] = {
				onclick: _ => {
					opt.select = i
					let clicked = opt.options[i]
					return [ ...opt.onclick(clicked), [ "render" ] ]
				},
				abs: null,
				rel: {
					x: x,
					y: 2,
					width: text.width,
					height: text.height
				}
			}
		}
		x += text.width + 10
	}

	return ctx.canvas
}
