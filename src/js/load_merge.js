import mergeImages from 'merge-images';

//resolution, default 2
//folder, default ?
//size, default 512
//document, default ? 
const loadAndMerge = (config) => {
	console.log("Load Started")
	const dimensions = ["right", "left", "top", "bottom", "front", "back"];
	const resolution = config.resolution == undefined ? 2 : config.resolution;
	const iLimit = resolution * 2;
	const jLimit = resolution * 2;
	const size = config.size == undefined ? 512 : config.size;
	var images = [];
	var imagesRotated = 0;
	console.log("Images", images.length, imagesRotated);
	const assetsFolder = config.folder;
	const document = config.document ? config.document : window.document;
	let resolvePromise, rejectPromise;

	const DegToRad = (d) => d * 0.01745;

	const rotateImage = (img, angle) => {
	    var canvas = window.document.createElement('canvas');
	    canvas.width = iLimit * size;
	    canvas.height = jLimit * size;
	    var context = canvas.getContext('2d');
	    context.translate(img.width * 0.5, img.height * 0.5);
	    context.rotate(DegToRad(angle));
	    context.translate(-img.width * 0.5, -img.height * 0.5);  
	    context.drawImage(img, 0, 0);
	    var b64 = canvas.toDataURL('image/jpeg', {
	        quality: .92,
	        progressive: false
	    });
	    return b64;
	}

	/*const verifyImagesAndResolve = () => {
		console.log("total rotation", imagesRotated, config.folder)
		if (imagesRotated < 2){
	        return;
	    }
	    console.log("All Images Rotated", config.folder)
	    resolvePromise(images);
	}*/

	const rotateImages = () => {
		console.log("rotateImages", images.length)
		if (images.length < dimensions.length){
			return;
		}
		console.log("All images loaded")

		let rotatePromises = [];
		var rotatePromise1 = new Promise( (resolve, reject) => {
		    const img = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
		    img.crossOrigin = '';
		    img.onerror = () => reject(new Error('Couldn\'t load image'));
		    img.onload = () => {
		        console.log("img loaded", config.folder)
		        var base64= rotateImage(img, -90);
		        //images[2] = base64;
		        //imagesRotated++;
		        //verifyImagesAndResolve();
		        resolve(base64);
		    };
		    img.src = images[2];
		})
		rotatePromises.push(rotatePromise1);

		var rotatePromise2 = new Promise( (resolve, reject) => {
		    const img1 = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
		    img1.crossOrigin = '';
		    img1.onerror = () => reject(new Error('Couldn\'t load image'));
		    img1.onload = () => {
		        console.log("img loaded", config.folder)
		        var base64= rotateImage(img1, 90);
		        //images[3] = base64;
		        //imagesRotated++;
		        //verifyImagesAndResolve();
		        resolve(base64);
		    };
		    img1.src = images[3];
		});
		rotatePromises.push(rotatePromise2);

		Promise.all( rotatePromises ).then( ([ rotatedImage1, rotatedImage2 ]) => {
			images[2] = rotatedImage1;
			images[3] = rotatedImage2;
			console.log("All Images Rotated", config.folder);
			resolvePromise(images);
		})
	    
	}

	const load = () => {
		let imagesPromises = [];
		for (var k=0; k<dimensions.length; k++){
			var tempDimensionImages = [];
			for (var i=0; i<iLimit; i++){
				for (var j=0; j<jLimit; j++){
					var y = (jLimit - i-1) * size;
					var x = j * size;
					tempDimensionImages.push({ src: assetsFolder + resolution+"k_"+dimensions[k]+"_"+i+"_"+j+".jpg", x: x, y:y });
				}
			}
			imagesPromises.push(mergeImages(tempDimensionImages, {
			  width: iLimit * size,
			  height: jLimit * size,    
			  format: 'image/jpeg'
			}));
		}
		Promise.all(imagesPromises).then( (mergedImages) => {
			images = mergedImages;
			rotateImages()
		});
	}

	return new Promise( (resolve, reject ) => {
		resolvePromise = resolve;
		rejectPromise = reject;
		load();
	})
}

export default loadAndMerge;