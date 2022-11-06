import React , {useContext , useRef , useEffect} from 'react'
import worldDataContext from './contex';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

function ExportFile() {

    const {THREEScene} = useContext(worldDataContext);
    const downloadLink = useRef(null);
    function save( blob, filename ) {

        if(downloadLink.current!=null){
            downloadLink.current.href = URL.createObjectURL( blob );
            downloadLink.current.download = filename;
            downloadLink.current.click();
        }
    }

    function saveString( text, filename ) {

        save( new Blob( [ text ], { type: 'text/plain' } ), filename );

    }

    const download = () =>{
        const {scene} = THREEScene;
        const gltfExporter = new GLTFExporter();
        const input = scene.getObjectByName('worldMesh');

        gltfExporter.parse(
            input,
            function ( result ) {
                if ( result instanceof ArrayBuffer ) {
                    saveArrayBuffer( result, 'scene.glb' );
                } else {
                    const output = JSON.stringify( result, null, 2 );
                    console.log( output );
                    saveString( output, 'scene.gltf' );
                }
            },
            function ( error ) {
                console.log( 'An error happened during parsing', error );
            }
        )
    }
    
    return (
        <main>
            <a ref={downloadLink} >
                <button onClick={download}>Export now
                    <img src='download.png'></img>
                </button>
            </a>
        </main>
    )
}

export default ExportFile