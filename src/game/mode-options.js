import * as Button from "../comps/button"
import * as MenuTitle from "../comps/menu-title"
import * as MenuOption from "../comps/menu-option"
import * as MenuButtonList from "../comps/menu-buttonlist"
import * as MenuBack from "../comps/menu-back"
const Comps = { MenuTitle, MenuOption, MenuButtonList, MenuBack }

export { create, onenter, onexit, onremove, render }

const create = _ => ({
	type: "Options",
	comps: [],
	exit: false
})

const onenter = (mode, view) => {
	// title
	let title = MenuTitle.create("Option")

	// options
	// let buttonlist = MenuButtonList.create([
	// 	Button.create("Opt1", { width: 80 }),
	// 	Button.create("Opt2", { width: 80 }),
	// 	Button.create("Opt3", { width: 80 })
	// ])
	let option = MenuOption.create("BGColor", [ "White", "Black" ], opt => {
		return [[ "setconfig", { theme: opt.toLowerCase() } ]]
	})

	// back button
	let back = MenuBack.create(_ => [[ "nextmode", "Home" ]])

	// add all components
	mode.comps.push(title, option, back)
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
