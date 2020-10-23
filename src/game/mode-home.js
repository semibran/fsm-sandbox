import * as Button from "../comps/button"
import * as MenuTitle from "../comps/menu-title"
import * as MenuButtonList from "../comps/menu-buttonlist"
import * as MenuBack from "../comps/menu-back"
const Comps = { MenuTitle, MenuButtonList, MenuBack }

export { create, onenter, onexit, onremove, render }

const create = _ => ({
	type: "Home",
	comps: [],
	exit: false
})

const onenter = (mode, view) => {
	// title
	let title = MenuTitle.create("Main Menu")

	// options
	let buttonlist = MenuButtonList.create([
		Button.create("Campaign", { width: 80 }),
		Button.create("Vs. Mode", { width: 80 }),
		Button.create("Option", { width: 80,
			onclick: _ => [[ "nextmode", "Options" ]]
		})
	])

	// add all components
	mode.comps.push(title, buttonlist)
	return [].concat(...mode.comps.map(comp => Comps[comp.type].onenter(comp, view)))
}

const onexit = (mode, view) =>
	[].concat(...mode.comps.map(comp => Comps[comp.type].onexit(comp, view)))

const onremove = mode =>
	[].concat(...mode.comps.map(comp => Comps[comp.type].onremove
		? Comps[comp.type].onremove(comp)
		: []
	))

const render = (mode, view) =>
	[].concat(...mode.comps.map(comp => Comps[comp.type].render(comp, view)))
