import { CubePanorama, Viewer, Infospot, DataImage  } from 'panolens'
import LoadAndMerge from './load_merge';
import { Vector3 } from 'three';

const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");

let imagesLoaded, viewer, panorama, panorama2, currentPanorama = 0, infospot, infospot2;

function onFocus(e){
    console.log("Hotspot clicked", e);
    //infospot.dispose();
    if (currentPanorama == 0){
        currentPanorama = 1;
        generateNewPanorama();
        /*panorama2.fadeIn();
        panorama2.addEventListener("enter-fade-complete", () => {
            panorama.dispose()
            viewer.remove(panorama);
        })*/
        
    }else{
        currentPanorama = 0;
        generateNewPanorama();
        /*panorama2.remove(infospot);
        addInfospot(panorama, 1)
        panorama.fadeIn();
        panorama2.fadeOut();*/
    }
    
}

function addInfospot(pano, n){
    infospot2 = new Infospot( 250, 'assets/imgs/hotspot.png', false );
    infospot2.position.set( -2611.80, -2224.52, 5000.00 );
    infospot2.addHoverText( 'Infospot' + n );
    infospot2.addEventListener( 'click', (e) => {
        onFocus(e);
    } );
    pano.add(infospot2)
}

function generateNewPanorama(){
    panorama.dispose()
    viewer.remove(panorama);
    console.log("imagesLoaded", imagesLoaded)
    panorama = new CubePanorama( imagesLoaded[currentPanorama] );
    
    var infospot = new Infospot( 250, 'assets/imgs/hotspot.png', false );
    infospot.position.set( -26.80, -2224.52, 5000.00 );
    infospot.addHoverText( 'Infospot 2' );
    infospot.addEventListener( 'click', (e) => {
        onFocus(e);
    } );

    panorama.add( infospot );
    viewer.add( panorama );
}
const loadPanorama = () => {


    var pano1 = LoadAndMerge({ 
        folder: 'assets/imgs/textures/pano1/'
    });

    var pano2 = LoadAndMerge({ 
        folder: 'assets/imgs/textures/pano2/'
    });
    Promise.all([pano1, pano2]).then((images) => {

        imagesLoaded = images;
        console.log("Pano images loaded");
        panorama = new CubePanorama( images[0] );

        panorama2 = new CubePanorama( images[1] );

        infospot = new Infospot( 250, 'assets/imgs/hotspot.png', false );
        infospot.position.set( -2611.80, -222.52, 5000.00 );
        infospot.addHoverText( 'Infospot 1' );
        infospot.addEventListener( 'click', (e) => {
            onFocus(e);
        } );

        panorama.add( infospot );


        infospot2 = new Infospot( 250, 'assets/imgs/hotspot.png', false );
        infospot2.position.set( -2611.80, -2224.52, 5000.00 );
        infospot2.addHoverText( 'Infospot2' );
        infospot2.addEventListener( 'click', (e) => {
            onFocus(e);
        } );

        panorama2.add(infospot2)

        viewer = new Viewer({
           container: container,
           viewIndicator: true,
           autoRotate: true,
           output: 'console',
           autoHideInfospot: false
        });

        viewer.add( panorama, panorama2 );
        viewer.tweenControlCenter(new Vector3(-2611.80, -2224.52, 5000.00),0)

        /*

        
        var viewer2 = new Viewer({
           container: container2,
           viewIndicator: true,
           autoRotate: true,
           output: 'console',
           autoHideInfospot: false
        });
        viewer.add( panorama2 );*/

        //viewer.tweenControlCenter(new THREE.Vector3(-4204.25,123.08,2684.97),0)

        /*
        viewer.addUpdateCallback(function() {
                viewer.panorama.rotation.y -= 0.001;
        });
        */
        /*document.querySelector(".merged").src = pano1Images[2]
        document.querySelector(".merged2").src = pano2Images[2]
        document.querySelector(".merged").style= ""
        document.querySelector(".merged2").style= ""*/
    
    })

    /*var pano1 = LoadAndMerge({ 
        folder: 'assets/imgs/textures/pano1/'
    }).then((pano1Images) => {

        console.log("Pano images loaded")
        var panorama = new CubePanorama( pano1Images );

        var infospot = new Infospot( 250, 'assets/imgs/hotspot.png', false );
        infospot.position.set( -26.80, -2224.52, 5000.00 );
        infospot.addHoverText( 'Infospot' );
        infospot.addEventListener( 'click', onFocus );
        panorama.add( infospot );

        var viewer = new Viewer({
           container: container,
           viewIndicator: true,
           autoRotate: true,
           output: 'console',
           autoHideInfospot: false
        });
        viewer.add( panorama );
    })*/
    
}

loadPanorama();