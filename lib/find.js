const Figma = require('figma-js')

module.exports = function (token, fileId) {
	const client = Figma.Client({ personalAccessToken: token })

	return new Promise((resolve, reject) => {
		client.file(fileId)
		.then(file => file.data.components)
		.then(components => getComponentUrls(client, fileId, components))
		.then(({images, components}) => 
			makeComponentsData(images, components))
		.then(icons => resolve(icons))
		.catch(error => reject(error))
	})
}

function getComponentUrls(client, fileId, components) {
	return new Promise((resolve, reject) => {
		config = {
			ids: Object.keys(components),
			format: 'svg',
			scale: 1
		}

		client.fileImages(fileId, config)
		.then(res => resolve({ images: res.data.images, components }))
		.catch(err => reject(err))
	})
}

function makeComponentsData(images, components) {
	var icons = []

	Object.keys(components).forEach(key => {
		icons.push({
			name: components[key].name,
			url: images[key]
		})
	})
	
	return icons
}