import * as EaseLinear from "../anims/ease-linear"

export { create, onenter, onexit, render }

const create = text => ({
	type: "MenuTitle",
	text: text,
	anim: null,
	exit: false
})

const onenter = (title, view) => {
	// title.text = view.sprites.Text(title.text, { color: [ 0, 0, 0 ] })
	title.anim = EaseLinear.create(10)
	return [[ "startanim", title.anim ]]
}

const onexit = title => {
	title.exit = true
	title.anim = EaseLinear.create(10)
	return [[ "startanim", title.anim ]]
}

const render = (title, view) => {
	let viewport = view.viewport
	let image = view.sprites.Text(title.text, {
		color: view.config.theme === "white"
			? [ 0, 0, 0 ]
			: [ 255, 255, 255 ]
	})
	let node = {
		image: image,
		x: viewport.width / 2,
		y: 32,
		origin: "center"
	}
	if (title.anim) {
		node.opacity = title.exit
			? (1 - title.anim.x)
			: title.anim.x
	}
	return node
}
