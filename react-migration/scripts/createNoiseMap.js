import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import mapping from './mapping';
import { DoubleSide } from 'three';
import applyColor from './applyColor';
import createNode from './createNode';
import makeGreyImage from './worldGeneration/makeGreyImage';
import makeColorImage from './worldGeneration/makeColorImage';

const createNoiseMap = (width,height,scale,octaves,persistance,lacunarity,seed,scene,doAnimate) =>{

    const noise2D = createNoise2D();
    const points = [];    //points which will form triangle
    const colors = [];    //colors for each vertex
    const triangleIndexes = [];     //indexes of points to draw a triangle
    const positionOffset = 1;      //resolutuion of map


    let vertexIndex = 0;
    let startY = 0 - height/2;
    let myrng = new Math.seedrandom(seed);

    const octvaeOffsets = [];
    for(let i=0;i<octaves;i++){
        const oX = myrng()*20000 - 10000;
        const oY = myrng()*20000 - 10000;
        octvaeOffsets.push({x:oX,y:oY});
    }

    for(let i = 0;i<height;i++){
        let startX = 0 - width/2;
        for(let j=0;j<width;j++){

            //work on noise values
            let amplitude = 1;
            let frequancy = 1;
            let noiseHeight = 0;
            for(let k=0;k<octaves;k++){

                const sampleX = j/scale * frequancy + octvaeOffsets[k].x;
                const sampleY=i/scale * frequancy + octvaeOffsets[k].y;
                
                noiseHeight +=noise2D(sampleX,sampleY)*amplitude;
                amplitude*=persistance;
                frequancy*=lacunarity;
            }

            //mapping the nosie value from one range to another
            //prev code //noiseHeight=mapping(noiseHeight,-1,1,0,20);
            points.push({x:startX,y:noiseHeight,z:startY});
            
            if(j < width-1 && i < height-1){
                triangleIndexes.push({a:vertexIndex,b:vertexIndex+width+1,c:vertexIndex+width});
                triangleIndexes.push({a:vertexIndex+width+1,b:vertexIndex,c:vertexIndex+1});
            }
            
            vertexIndex++;
            startX+=positionOffset;
        }
        startY+=positionOffset;
    }

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    makeGreyImage(triangleIndexes,positions,colors,points,geometry);
    
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    // draw range
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,vertexColors: true
    });
    const mesh = new THREE.Mesh( geometry, material );
    mesh.receiveShadow = true;
    const graph = [];
    
    scene.add(mesh);

    if(doAnimate==true){
        let step =0;
        const firstAnimationInterval = setInterval(()=>{
            step+=200;
            scene.children[3].geometry.setDrawRange(0,step);
            if(step>(width*height)*9){
                clearInterval(firstAnimationInterval);
                makeColorImage(triangleIndexes,points,mesh);
            }
        },1)
        //creates graph
        for(let i=0;i<triangleIndexes.length;i++){
            
            const x1 = points[triangleIndexes[i].a].x;
            const x2 = points[triangleIndexes[i].b].x;
            const x3 = points[triangleIndexes[i].c].x;

            const y1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,20);
            const y2 = mapping(points[triangleIndexes[i].b].y,-1,1,0,20);
            const y3 = mapping(points[triangleIndexes[i].c].y,-1,1,0,20);

            const z1 = points[triangleIndexes[i].a].z;
            const z2 = points[triangleIndexes[i].b].z;
            const z3 = points[triangleIndexes[i].c].z;

            const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y a bit higher so the mesh is above the othe one
            //needed later for animation of pathfinding
            const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
            createNode(graph,i,avrageY,width,position);
        }

    }else{
    }


    
    return{positions,colors,triangleIndexes,graph};
}
export default createNoiseMap;