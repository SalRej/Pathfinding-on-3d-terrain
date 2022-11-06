const colorPath = (path,scene)=>{

    path.forEach(index=>{
        const j = index*9;//index of the colors array

        for(let i = 0 ; i < 9 ; i+=3){
            scene.children[3].geometry.attributes.color.array[j+i]=1;
            scene.children[3].geometry.attributes.color.array[j+i+1]=0;
            scene.children[3].geometry.attributes.color.array[j+i+2]=0;
        }
    })
}

export default colorPath;