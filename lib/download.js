const https = require('https')
const fs = require('fs')

module.exports = function(icons, dest) {
	icons.forEach(icon => {
		download(icon, dest)
	})
}

function download(icon, dest) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(`${dest}/${icon.name}.svg`)
		const request = https.get(icon.url, (res => res.pipe(file)))
	})
}