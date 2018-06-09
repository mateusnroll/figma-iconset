const config = {
	token: "1617-a0a1708f-5a8e-44dd-92b6-7dde07cbec86",
	fileId: "OkLumF848oJ2Kn6iMeVIthEC"
}

console.log()

const find = require('./lib/find.js')
const download = require('./lib/download.js')

find(config.token, config.fileId)
	.then(icons => {
		download(icons, `${__dirname}/sandbox`)
	})

module.exports = { find }
