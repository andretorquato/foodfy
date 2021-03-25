const Chefs = require('../models/chefs');
const Files = require('../models/files');

async function getImages(chefId){
		let file = await Files.getFiles(chefId);
	 	file = {
			...file,
			src:`${file.path.replace("public", "")}`}
			 ;
	
        return file;
}

async function format(chef) {
	const files = await getImages(chef.file_id);
	chef.img = files
	
	return chef
}
const LoadService = {
	load(service, filter){
		return this[service]()	
	},
	async chef(){
		try{
			const chef = await Chefs.findOne(this.filter);
			return format(chef)
		}catch(error){
			console.error(error)
		}
	},
	async chefs(){
		try{
			const chefs = await Chefs.findAll(this.filter);
			const chefsPromise = chefs.map(format);
				return Promise.all(chefsPromise)
		}	catch(error){
				console.error(error);
		}
	},
	format,
	getImages
}

module.exports = LoadService;
