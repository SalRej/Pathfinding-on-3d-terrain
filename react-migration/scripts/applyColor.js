import mapping from "./mapping";
const setColor = (color1,color2)=>{
    color1.r=color2.r;
    color1.g=color2.g;
    color1.b=color2.b;
}

const applyColor = (y1,y2,y3,color1,color2,color3) => {

    setColor(color1,{r:0,g:0.3,b:0.6});
    setColor(color2,{r:0,g:0.3,b:0.6});
    setColor(color3,{r:0,g:0.3,b:0.6});

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
            value:0.9,
            color:{r:1,g:1,b:1}
        }
    ]

    for(let i = 0;i<colorsAndValues.length;i++){

        if(y1>colorsAndValues[i].value){
            setColor(color1,colorsAndValues[i].color);
        }
        if(y2>colorsAndValues[i].value){
            setColor(color2,colorsAndValues[i].color);
        }
        if(y3>colorsAndValues[i].value){
            setColor(color3,colorsAndValues[i].color);
        }
    }
}
export default applyColor;