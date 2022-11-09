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
const applyColor = (y1,color1) => {

    setColor(color1,{r:0,g:0.3,b:0.6});

    const colorsAndValues =[
        {
            value:0.15,
            color:{r:1,g:0.8,b:0}//yellow
        },
        {
            value:0.225,
            color:{r:0.3,g:0.9,b:0.3}//light green
        },
        {
            value:0.4,
            color:{r:0.3,g:0.7,b:0.3}//darker green
        },
        {
            value:0.6,
            color:{r:0.5,g:0.2,b:0.1}//lighter brown
        },
        {
            value:0.75,
            color:{r:0.3,g:0.19,b:0.05}//darker brown
        },
        {
            value:1.0,
            color:{r:1,g:1,b:1}//white
        },
    ]

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