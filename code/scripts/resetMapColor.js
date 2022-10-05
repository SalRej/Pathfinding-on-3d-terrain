import applyColor from "./applyColor";

const resetMapColor = (verteciesId,scene) =>{
    
    verteciesId.forEach(vertex=>{
        const j = vertex*9;//index of vertex in geometry buffer array
        const color1={r:0,g:0,b:0};
        const color2={r:0,g:0,b:0};
        const color3={r:0,g:0,b:0};

        const y1 = scene.children[3].geometry.attributes.position.array[j+1];
        const y2 = scene.children[3].geometry.attributes.position.array[j+4];
        const y3 = scene.children[3].geometry.attributes.position.array[j+7];

        applyColor(y1,y2,y3,color1,color2,color3);

        scene.children[3].geometry.attributes.color.array[j]=color1.r;
        scene.children[3].geometry.attributes.color.array[j+1]=color1.g;
        scene.children[3].geometry.attributes.color.array[j+2]=color1.b;

        scene.children[3].geometry.attributes.color.array[j+3]=color2.r;
        scene.children[3].geometry.attributes.color.array[j+4]=color2.g;
        scene.children[3].geometry.attributes.color.array[j+5]=color2.b;

        scene.children[3].geometry.attributes.color.array[j+6]=color3.r;
        scene.children[3].geometry.attributes.color.array[j+7]=color3.g;
        scene.children[3].geometry.attributes.color.array[j+8]=color3.b;
        
    })
}

export default resetMapColor;