import mapping from "./mapping";
const setColor = (color1,color2)=>{
    color1.r=color2.r;
    color1.g=color2.g;
    color1.b=color2.b;
}

const blendColors = (y,color,colorsAndValues,i) =>{
    
    const currentValue = colorsAndValues[i].value;
    const nextValue = colorsAndValues[i+1].value;

    const currentColor = colorsAndValues[i].color;
    const nextColor = colorsAndValues[i+1].color;
    
    const newColor = {r:0,g:0,b:0};

    newColor.r = mapping(y,currentValue,nextValue,currentColor.r,nextColor.r)
    newColor.g = mapping(y,currentValue,nextValue,currentColor.g,nextColor.g)
    newColor.b = mapping(y,currentValue,nextValue,currentColor.b,nextColor.b)
    setColor(color,newColor);
}
const applyColor = (y1,color1,colorsAndValues) => {

    setColor(color1,{r:0,g:0.3,b:0.6});

    for(let i = 0;i<colorsAndValues.length;i++){

        if(y1>colorsAndValues[i].value){

        
            if(i+1<colorsAndValues.length){
                blendColors(y1,color1,colorsAndValues,i);
            }else {
                setColor(color1,colorsAndValues[i].color)
            };
        }
    }
}
export default applyColor;