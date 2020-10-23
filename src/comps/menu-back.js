import * as Button from "../comps/button"
import * as EaseLinear from "../anims/ease-linear"
import * as EaseOut from "../anims/ease-out"
import lerp from "lerp"

export { create, onenter, onexit, onremove, render }

const create = (onclick) => ({
	type: "MenuBack",
	comp: Button.create("Back", { onclick: onclick }),
	anim: EaseOut.create(15),
	exit: false
})

const onenter = back =>
	[[ "addcomp", back.comp ], [ "startanim", back.anim ]]

const onexit = back => {
	back.exit = true
	back.anim = EaseLinear.create(5)
	return [[ "startanim", back.anim ]]
}

const onremove = back =>
	[[ "removecomp", back.comp ]]

const render = (back, view) => {
	let viewport = view.viewport
	let node = Button.render(back.comp, view)
	node.x = 4
	node.y = viewport.height - 4
	node.origin = "bottomleft"
	if (back.anim) {
		const start = -node.image.width
		const goal = 4
		let t = back.exit ? (1 - back.anim.x) : back.anim.x
		node.x = lerp(start, goal, t)
	}
	return node
}
