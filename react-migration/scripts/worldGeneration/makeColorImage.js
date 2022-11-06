import mapping from "../mapping";
import applyColor from "../applyColor";
import applyHeight from "./applyHeight";
const makeColorImage =(triangleIndexes,points,mesh)=>{

    const numTimes = triangleIndexes.length;
    let i = 0;
    const interval = setInterval(()=>{

        if(i>=numTimes){
            clearInterval(interval);
            applyHeight(mesh);
        }

        for(let j = 0;j<100;j++){
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

export default makeColorImage;