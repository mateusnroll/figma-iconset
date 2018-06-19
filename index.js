const tmp       = require('tmp')
const find      = require('./lib/find.js')
const download  = require('./lib/download.js')
const svgSprite = require('./lib/svgSprite.js')

module.exports = {
	downloadAll: (config, path) => {
		return new Promise((resolve, reject) => {
			find(config.token, config.fileId)
			.then(icons => download(icons, path))
			.then(() => resolve())
			.catch(error => reject(error))
		})
	},

	downloadSprite: (config, dest) => {
		return new Promise((resolve, reject) => {
			const tmpDir = tmp.dirSync()
			
			find(config.token, config.fileId)
			.then(icons => download(icons, tmpDir.name))
			.then(() => svgSprite(tmpDir.name, dest))
			.then(() => resolve())
			.catch(error => reject(error))
		})
	}
}
