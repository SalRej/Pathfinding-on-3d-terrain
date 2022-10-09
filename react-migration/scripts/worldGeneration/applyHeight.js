import mapping from "../mapping";
const applyHeight = (mesh)=>{

    for(let i=0;i<mesh.geometry.attributes.position.array.length;i+=3){

        let y = mesh.geometry.attributes.position.array[i+1];
        y=mapping(y,-1,1,0,20);
        setTimeout(()=>{

            if(y<=3){
                mesh.geometry.attributes.position.array[i+1]=3;
                mesh.geometry.attributes.position.needsUpdate=true;
            }else{
                mesh.geometry.attributes.position.array[i+1]=y;
                mesh.geometry.attributes.position.needsUpdate=true;
            }
        },100)

    }

    setTimeout(()=>{
        mesh.geometry.computeVertexNormals()
    },1500);
}

export default applyHeight;