
const createPoints = (numPointsX,numPointsY) =>{

    const points = [];
    let pointIndex = 0;
    const pointsOfTriangleIndexes = [];

    const mapWidth = 100;
    const mapHeight = 100;

    let xCordinate = 0 - (mapWidth/2);
    let zCordinate = 0 - (mapHeight/2);

    const stepX =  mapWidth / numPointsX;
    const stepY = mapHeight / numPointsY;

    for(let i = 0;i < numPointsY; i++){
        xCordinate = 0 - (mapHeight/2);
        
        for(let j = 0;j < numPointsX; j++){
            
            const y = 0;
            points.push({x:xCordinate,y:y,z:zCordinate});

            if(j < numPointsX-1 && i < numPointsY-1){

                //index of points in points array
                let indexOfPoint1 = pointIndex;
                let indexOfPoint2 = pointIndex + numPointsX + 1;
                let indexOfPoint3 = pointIndex + numPointsX;
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});

                //set the points for 2 triangles
                indexOfPoint1 = pointIndex + numPointsX + 1;
                indexOfPoint2 = pointIndex;
                indexOfPoint3 = pointIndex + 1;
                
                pointsOfTriangleIndexes.push({a:indexOfPoint1,b:indexOfPoint2,c:indexOfPoint3});
            }
            pointIndex++;
            xCordinate+=stepX;
        }
        zCordinate+=stepY;
    }

    return {points , pointsOfTriangleIndexes };
}
export default createPoints;