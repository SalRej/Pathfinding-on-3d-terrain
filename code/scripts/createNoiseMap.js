import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import mapping from './mapping';
import { DoubleSide } from 'three';
import applyColor from './applyColor';
import createNode from './createNode';


const makeGreyImage = (triangleIndexes,positions,colors,points) =>{

    for(let i=0;i<triangleIndexes.length;i++){
        positions.push(
            points[triangleIndexes[i].a].x,points[triangleIndexes[i].a].y,points[triangleIndexes[i].a].z,
            points[triangleIndexes[i].b].x,points[triangleIndexes[i].b].y,points[triangleIndexes[i].b].z,
            points[triangleIndexes[i].c].x,points[triangleIndexes[i].c].y,points[triangleIndexes[i].c].z
        );
        
        const grey1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,1);
        const color1 = new THREE.Color(grey1,grey1,grey1);

        const grey2 = mapping(points[triangleIndexes[i].b].y,-1,1,0,1);
        const color2 = new THREE.Color(grey2,grey2,grey2);

        const grey3 = mapping(points[triangleIndexes[i].c].y,-1,1,0,1);
        const color3 = new THREE.Color(grey3,grey3,grey3);

        colors.push(
            color1.r,color1.g,color1.b,
            color2.r,color2.g,color2.b,
            color3.r,color3.g,color3.b
        )
        // const drawCount = 200000; // draw the first 2 points, only
    }
}
const makeColorImage =(triangleIndexes,points,mesh)=>{

    const numTimes = triangleIndexes.length;
    let i = 0;
    const interval = setInterval(()=>{

        if(i>=numTimes){
            clearInterval(interval);
        }

        for(let j = 0;j<10;j++){
            let color1={r:0,g:1,b:0};
            let color2={r:0,g:1,b:0};
            let color3={r:0,g:1,b:0};
    
            const y1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,20);
            const y2= mapping(points[triangleIndexes[i].b].y,-1,1,0,20);
            const y3= mapping(points[triangleIndexes[i].c].y,-1,1,0,20);
    
            applyColor(y1,y2,y3,color1,color2,color3);
            mesh.geometry.attributes.color.array[i*9]=color1.r;
            mesh.geometry.attributes.color.array[i*9+1]=color1.g;
            mesh.geometry.attributes.color.array[i*9+2]=color1.b;
            mesh.geometry.attributes.color.array[i*9+3]=color2.r;
            mesh.geometry.attributes.color.array[i*9+4]=color2.g;
            mesh.geometry.attributes.color.array[i*9+5]=color2.b;
            mesh.geometry.attributes.color.array[i*9+6]=color3.r;
            mesh.geometry.attributes.color.array[i*9+7]=color3.g;
            mesh.geometry.attributes.color.array[i*9+8]=color3.b;
    
            mesh.geometry.attributes.color.needsUpdate=true;
            i++;
        }
    },0)
}
const createNoiseMap = (width,height,scale,octaves,persistance,lacunarity,scene) =>{

    const noise2D = createNoise2D();
    const points = [];    //points which will form triangle
    const colors = [];    //colors for each vertex
    const triangleIndexes = [];     //indexes of points to draw a triangle
    const positionOffset = 1;      //resolutuion of map

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
    // draw range

    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const material = new THREE.MeshStandardMaterial( {
        side: THREE.DoubleSide,vertexColors: true
    });

    const mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);

    let t =0;
    const firstAnimationInterval = setInterval(()=>{
        t+=200;
        scene.children[3].geometry.setDrawRange(0,t);
        if(t>(width*height)*9){
            clearInterval(firstAnimationInterval);
            makeColorImage(triangleIndexes,points,mesh);

        }
    },0.01)
    
    const graph = [];

    // applyHeight();

    // for(let i=0;i<triangleIndexes.length;i++){

    //     //apply diffrent colors depending on vertex.y value
    //     applyColor(points[triangleIndexes[i].a].y,points[triangleIndexes[i].b].y,points[triangleIndexes[i].c].y,color1,color2,color3);

    //     //if y<3 this is going to be water so i make it all same haight
    //     if(points[triangleIndexes[i].a].y<=3){
    //         points[triangleIndexes[i].a].y=3
    //     }
    //     if(points[triangleIndexes[i].b].y<=3){
    //         points[triangleIndexes[i].b].y=3
    //     }
    //     if(points[triangleIndexes[i].c].y<=3){
    //         points[triangleIndexes[i].c].y=3
    //     }

    //     //push vertecies making a triangle in order
        

    //     colors.push(color1.r,color1.g,color1.b,color2.r,color2.g,color2.b,color3.r,color3.g,color3.b);
        
    //     const avrageY = (points[triangleIndexes[i].a].y+points[triangleIndexes[i].b].y+points[triangleIndexes[i].c].y)/3
    //     createNode(graph,i,avrageY,width)
    // }

    

    return{positions,colors,triangleIndexes,graph};
}
export default createNoiseMap;
