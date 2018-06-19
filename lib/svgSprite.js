const fs       = require('fs')
const svgstore = require('svgstore')

module.exports = function(originPath, destinationPath) {
	return new Promise((resolve, reject) => {
		const sprite = svgstore()
		const files  = fs.readdirSync(originPath)
		
		files.forEach(file => {
			const filePath    = `${originPath}/${file}`
			const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
			const fileTitle   = file.replace(/\.[^/.]+$/, "")
			
			sprite.add(fileTitle, fileContent)
		})
		
		fs.writeFileSync(`${destinationPath}/sprite.svg`, sprite.toString())
		resolve()
	})
}
