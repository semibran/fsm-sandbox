export { create, onclick, render }

const create = (text, opts) => ({
	type: "Button",
	text: text,
	width: opts && opts.width,
	onclick: opts && opts.onclick,
	cache: { theme: null, node: null }
})

// onclick(button) -> cmdlist
// > passes over control to predefined click handler if existent
const onclick = button =>
	button.onclick && button.onclick()

// render(button, view) -> node
// > renders a drawable node and saves in component cache.
// > screen uses cached node to find bounding box for click detects
const render = (button, view) => {
	if (button.cache.theme !== view.config.theme) {
		button.cache.theme = view.config.theme
		let sprite = view.sprites.Button(button.text, {
			width: button.width,
			color: view.config.theme === "light"
				? [ 255, 255, 255 ]
				: button.onclick
					? [ 255, 255, 255 ]
					: [ 102, 102, 102 ],
			fill: view.config.theme === "light"
				? button.onclick
					? [ 0, 0, 0 ]
					: [ 204, 204, 204 ]
				: button.onclick
					? [ 102, 102, 102 ]
					: [ 51, 51, 51 ]
		})
		button.node = { image: sprite }
	}
	return button.node
}
