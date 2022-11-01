import createNode from "../graph/createNode";
import mapping from "../mapping";
const createGraph = (geometry,width,sclaeY) =>{
    
    const indecies = geometry.getIndex();
    const positions = geometry.getAttribute('position');
    const graph=[];

    for(let i = 0;i<indecies.array.length ; i+=3){
        
        const point1 = indecies.getX(i);
        const point2 = indecies.getY(i);
        const point3 = indecies.getZ(i);

        const x1 = positions.getX(point1);
        const y1 = positions.getY(point1);
        const z1 = positions.getZ(point1);

        const x2 = positions.getX(point2);
        const y2 = positions.getY(point2);
        const z2 = positions.getZ(point2);

        const x3 = positions.getX(point3);
        const y3 = positions.getY(point3);
        const z3 = positions.getZ(point3);

        const mappedY1 = mapping(y1,0,sclaeY,0,1);
        const mappedY2 = mapping(y2,0,sclaeY,0,1);
        const mappedY3 = mapping(y3,0,sclaeY,0,1);

        const avrageY = (mappedY1+mappedY2+mappedY3)/3;//needet to determine cost value of each node
        const position = [x1,y1+1,z1,x2,y2+1,z2,x3,y3+1,z3];//position of each triangle with y cordinate a bit higher so the mesh is above the other one
        createNode(graph,i/3,avrageY,width,position);
    }

    return graph;
}
export default createGraph;