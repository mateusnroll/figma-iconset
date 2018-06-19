const fs      = require('fs')
const request = require('request-promise')

module.exports = function(icons, dest) {
	var iconPromises = icons.map(icon => download(icon, dest))
	return Promise.all(iconPromises)
}

function download(icon, dest) {
	return new Promise((resolve, reject) => {
		request(icon.url)
		.then(content =>
			writeFile(`${dest}/${icon.name}.svg`, content))
		.then(() => resolve())
		.catch(err => reject(err))
	})
}

function writeFile(path, content) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, content, err => {
			if (err) return reject(err)
			resolve(path)
		})
	})
}