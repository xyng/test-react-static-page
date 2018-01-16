import React from "react"
import ReactDOMServer from "react-dom/server"
import { StaticRouter, Route } from "react-router-dom"

import Home from "./blog/de/Home"
import About from "./blog/de/About"

import "./blog/general.scss"

const template = (page, css, js) => `
	<html>
		<head><title>My Static Site</title></head>
		<body>
			${page}
			${css.map(file => (
				`<link rel="stylesheet" href="/${file}" />`
			))}
			${js.map(file => (
				`<script src="/${file}" async></script>`
			))}
		</body>
	</html>
`

const routes = (
	<div>
		<Route exact path="/" component={Home} />
		<Route exact path="/about" component={About} />
	</div>
)

export default locals => {
	const assets = Object.keys(locals.webpackStats.compilation.assets).filter(value => value.match(/^blog.*/))
	const css = assets.filter(value => value.match(/\.css$/))
	const js = assets.filter(value => value.match(/\.js$/))

	const page = ReactDOMServer.renderToString(
		<StaticRouter location={locals.path} context={{}}>
			{routes}
		</StaticRouter>
	);

	return template(page, css, js)
}