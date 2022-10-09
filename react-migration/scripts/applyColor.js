const setColor = (color,r,g,b)=>{
    color.r=r;
    color.g=g;
    color.b=b;
}
const applyColor = (y1,y2,y3,color1,color2,color3) => {

    setColor(color1,0,0.3,0.6);
    setColor(color2,0,0.3,0.6);
    setColor(color3,0,0.3,0.6);

    //lightGreen
    if(y1>3){
        setColor(color1,0.3,0.9,0.3);
    }
    if(y2>3){
        setColor(color2,0.3,0.9,0.3);

    }
    if(y3>3){
        setColor(color3,0.3,0.9,0.3);
    }

    //dark green
    if(y1>8){
        setColor(color1,0.3,0.7,0.3);
    }
    if(y2>8){
        setColor(color2,0.3,0.7,0.3);

    }
    if(y3>8){
        setColor(color3,0.3,0.7,0.3);
    }

    //light brown
    if(y1>12){
        setColor(color1,0.5,0.2,0.1);
    }
    if(y2>12){
        setColor(color2,0.5,0.2,0.1);

    }
    if(y3>12){
        setColor(color3,0.5,0.2,0.1);

    }

    //dark brown
    if(y1>15){
        setColor(color1,0.3,0.19,0.05);
    }
    if(y2>15){
        setColor(color2,0.3,0.19,0.05);

    }
    if(y3>15){
        setColor(color3,0.3,0.19,0.05);

    }

    //white
    if(y1>18){
        setColor(color1,1,1,1);

    }
    if(y2>18){
        setColor(color2,1,1,1);

    }
    if(y3>18){
        setColor(color3,1,1,1);
    }
    
}
export default applyColor;