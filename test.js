const figmaIconset = require('./index.js')
const config = {
	token: "1617-a0a1708f-5a8e-44dd-92b6-7dde07cbec86",
	fileId: "OkLumF848oJ2Kn6iMeVIthEC"
}


// figmaIconset.downloadAll(config, `${__dirname}/sandbox`)
// .then(() => console.log('complete!'))

figmaIconset.downloadSprite(config, `${__dirname}/sandbox`)
.then(() => console.log('complete!'))