import * as Button from "../comps/button"
import * as EaseOut from "../anims/ease-out"
import * as EaseIn from "../anims/ease-in"
import lerp from "lerp"

export { create, onenter, onexit, onremove, render }

const create = buttons => ({
	type: "MenuButtonList",
	comps: buttons,
	anims: buttons.map((_, i) => EaseOut.create(10, { delay: i * 6 })),
	exit: false
})

const onenter = list => [
	...list.comps.map(button => [ "addcomp", button ]),
	...list.anims.map(anim => [ "startanim", anim ])
]

const onexit = list => {
	list.exit = true
	for (let i = 0; i < list.comps.length; i++) {
		list.anims[i] = EaseIn.create(8, { delay: i * 4 })
	}
	return list.anims.map(anim => [ "startanim", anim ])
}

const onremove = list =>
	list.comps.map(button => [ "removecomp", button ])

const render = (list, view) => {
	let viewport = view.viewport
	let nodes = []
	for (let i = 0; i < list.comps.length; i++) {
		let button = list.comps[i]
		let node = Button.render(button, view)
		node.x = viewport.width / 2
		node.y = 48 + i * 15
		node.origin = "center"
		nodes.push(node)

		let anim = list.anims[i]
		if (anim) {
			if (list.exit) {
				const start = viewport.width / 2
				const goal = -node.image.width / 2
				node.x = lerp(start, goal, anim.x)
			} else {
				node.height = node.image.height * anim.x
			}
		}
	}
	return nodes
}
