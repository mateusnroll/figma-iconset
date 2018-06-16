const tmp         = require('tmp')
const fs          = require('fs')
const svgstore    = require('svgstore')
const find        = require('./lib/find.js')
const download    = require('./lib/download.js')

module.exports = {
	downloadAll: (config, path) => {
		return new Promise((resolve, reject) => {
			find(config.token, config.fileId)
			.then(icons => download(icons, path))
			.then(() => resolve())
			.catch(error => reject(error))
		})
	},

	downloadSprite: (config, spriterConfig, path) => {
		return new Promise((resolve, reject) => {
			const tmpDir = tmp.dirSync()
			const sprite = svgstore()

			console.log(tmpDir.name)
			
			find(config.token, config.fileId)
			.then(icons => download(icons, tmpDir.name))
			.then(icons => {
				const files = fs.readdirSync(tmpDir.name)
				// Dont know why, but it is not reading from
				// the dir when there is clearly stuff there.
				files.forEach(file => {
					const filePath = `${tmpDir.name}/${file}`
					const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

					console.log(fileContent)
					sprite.add(file, fileContent)
				})
				
				console.log(sprite.toString())
				fs.writeFileSync(`${dest}/sprite.svg`, sprite.toString())
				return true
			})
			.then(() => resolve())
			.catch(error => reject(error))
		})
	}
}
