import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import mapping from './mapping';
import { DoubleSide } from 'three';
import applyColor from './applyColor';
import createNode from './createNode';

const createNoiseMap = (width,height,scale,octaves,persistance,lacunarity,scene) =>{

    const noise2D = createNoise2D();
    const points = [];    //points which will form triangle
    const colors = [];    //colors for each vertex
    const triangleIndexes = [];     //indexes of points to draw a triangle
    const positionOffset = 1;      //resolutuion of map

    //
    let vertexIndex = 0;
    let startY = 0 - height/2;

    const octvaeOffsets = [];
    for(let i=0;i<octaves;i++){
        const oX = Math.random()*20000 - 10000;
        const oY = Math.random()*20000 - 10000;
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

                const sampleX = j/scale *frequancy + octvaeOffsets[k].x;
                const sampleY=i/scale * frequancy + octvaeOffsets[k].y;
                
                noiseHeight +=noise2D(sampleX,sampleY)*amplitude;
                amplitude*=persistance;
                frequancy*=lacunarity;
            }

            //mapping the nosie value from one range to another
            noiseHeight=mapping(noiseHeight,-1,1,0,20);

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
    const positions =[];
    const graph = [];
    for(let i=0;i<triangleIndexes.length;i++){

        //3 colors for each vertex of the triangle
        let color1={r:0,g:1,b:0};
        let color2={r:0,g:1,b:0};
        let color3={r:0,g:1,b:0};

        //apply diffrent colors depending on vertex.y value
        applyColor(points[triangleIndexes[i].a].y,points[triangleIndexes[i].b].y,points[triangleIndexes[i].c].y,color1,color2,color3);

        //if y<3 this is going to be water so i make it all same haight
        if(points[triangleIndexes[i].a].y<=3){
            points[triangleIndexes[i].a].y=3
        }
        if(points[triangleIndexes[i].b].y<=3){
            points[triangleIndexes[i].b].y=3
        }
        if(points[triangleIndexes[i].c].y<=3){
            points[triangleIndexes[i].c].y=3
        }

        //push vertecies making a triangle in order
        positions.push(
            points[triangleIndexes[i].a].x,points[triangleIndexes[i].a].y,points[triangleIndexes[i].a].z,
            points[triangleIndexes[i].b].x,points[triangleIndexes[i].b].y,points[triangleIndexes[i].b].z,
            points[triangleIndexes[i].c].x,points[triangleIndexes[i].c].y,points[triangleIndexes[i].c].z
        );

        colors.push(color1.r,color1.g,color1.b,color2.r,color2.g,color2.b,color3.r,color3.g,color3.b);
        
        const avrageY = (points[triangleIndexes[i].a].y+points[triangleIndexes[i].b].y+points[triangleIndexes[i].c].y)/3
        createNode(graph,i,avrageY,width)
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,vertexColors: true
    });

    const mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);

    return{positions,colors,triangleIndexes,graph};
}
export default createNoiseMap;
