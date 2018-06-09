const Figma = require('figma-js')

module.exports = function (token, fileId) {
	const client = Figma.Client({ personalAccessToken: token })

	return new Promise((resolve, reject) => {
		client.file(fileId)
		.then(file => {
			return file.data.components
		})
		.then(components => {
			return new Promise((resolve, reject) => {
				client.fileImages(fileId, {
					ids: Object.keys(components),
					format: 'svg',
					scale: 1
				})
				.then(res => resolve({ images: res.data.images, components }))
			})
		})
		.then(({images, components}) => {
			const icons = []
			
			Object.keys(components).forEach(key => {
				icons.push({
					name: components[key].name,
					url: images[key]
				})
			})
	
			resolve(icons)
		})
		.catch(error => reject(error))
	})
}
