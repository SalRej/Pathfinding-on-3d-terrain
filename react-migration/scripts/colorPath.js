const colorPath = (path,scene)=>{
    const mesh = scene.getObjectByName("worldMesh");
    path.forEach(index=>{
        const j = index*9;//index of the colors array

        for(let i = 0 ; i < 9 ; i+=3){
            mesh.geometry.attributes.color.array[j+i]=1;
            mesh.geometry.attributes.color.array[j+i+1]=0;
            mesh.geometry.attributes.color.array[j+i+2]=0;
        }
        mesh.geometry.attributes.color.needsUpdate=true;
    })
}

export default colorPath;