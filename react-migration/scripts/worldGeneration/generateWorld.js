import createNode from "../createNode";
import mapping from "../mapping";
import applyColor from "../applyColor";
import * as THREE from 'three';

const generateWorld = (data) =>{
    const {
        positions,
        points,
        triangleIndexes,
        graph,
        colors,
        width,
        scene,
        geometry,
        material,
        scaleY

    } = data;

    for(let i=0;i<triangleIndexes.length;i++){

        //3 colors for each vertex of the triangle
        let color1={r:0,g:1,b:0};
        let color2={r:0,g:1,b:0};
        let color3={r:0,g:1,b:0};

        //apply diffrent colors depending on vertex.y value
        
        let y1 = points[triangleIndexes[i].a].y;
        let y2 = points[triangleIndexes[i].b].y;
        let y3 = points[triangleIndexes[i].c].y;
        
        const x1 = points[triangleIndexes[i].a].x;
        const x2 = points[triangleIndexes[i].b].x;
        const x3 = points[triangleIndexes[i].c].x;
        
        const z1 = points[triangleIndexes[i].a].z;
        const z2 = points[triangleIndexes[i].b].z;
        const z3 = points[triangleIndexes[i].c].z;
        
        let isWater = false;
        applyColor(y1,y2,y3,color1,color2,color3);

        //chesck if the pints is too low this means its water so make it one level of height
        y1 = mapping(points[triangleIndexes[i].a].y,-1,1,0,scaleY);
        y2 = mapping(points[triangleIndexes[i].b].y,-1,1,0,scaleY);
        y3 = mapping(points[triangleIndexes[i].c].y,-1,1,0,scaleY);

        const checkY1 = mapping(y1,0,scaleY,0,1);
        const checkY2 = mapping(y2,0,scaleY,0,1);
        const checkY3 = mapping(y3,0,scaleY,0,1);

        if(checkY1 <= 0.15){
            y1=mapping(0.15,0,1,0,scaleY);
        }
        if(checkY2 <= 0.15){
            y2=mapping(0.15,0,1,0,scaleY);
        } 
        if(checkY3 <= 0.15){
            y3=mapping(0.15,0,1,0,scaleY);
        } 
        
        
        positions.push(
            x1,y1,z1,
            x2,y2,z2,
            x3,y3,z3
        );

        colors.push(color1.r,color1.g,color1.b,color2.r,color2.g,color2.b,color3.r,color3.g,color3.b);

        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y a bit higher so the mesh is above the othe one
        //needed later for animation of pathfinding
        const avrageY = (y1+y2+y3)/3;//needet to determine cost value of each node
        createNode(graph,i,avrageY,width,position);
    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ));
    geometry.computeVertexNormals();//needed for light to work
    geometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 3 ));

    const mesh = new THREE.Mesh( geometry, material );
    mesh.name='worldMesh';
    scene.add(mesh);
}
export default generateWorld;