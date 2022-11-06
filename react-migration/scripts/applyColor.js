import mapping from "./mapping";
const setColor = (color,r,g,b)=>{
    color.r=r;
    color.g=g;
    color.b=b;
}

const applyColor = (y1,y2,y3,color1,color2,color3) => {

    setColor(color1,0,0.3,0.6);
    setColor(color2,0,0.3,0.6);
    setColor(color3,0,0.3,0.6);

    // y1 = mapping(y1,-1,1,0,1);
    // y2 = mapping(y2,-1,1,0,1);
    // y3 = mapping(y3,-1,1,0,1);

    //yellow
    if(y1>0.15){
        setColor(color1,1,0.8,0);
    }
    if(y2>0.15){
        setColor(color2,1,0.8,0);

    }
    if(y3>0.15){
        setColor(color3,1,0.8,0);
    }

    //lightGreen
    if(y1>0.225){
        setColor(color1,0.3,0.9,0.3);
    }
    if(y2>0.225){
        setColor(color2,0.3,0.9,0.3);

    }
    if(y3>0.225){
        setColor(color3,0.3,0.9,0.3);
    }

    //dark green
    if(y1>0.4){
        setColor(color1,0.3,0.7,0.3);
    }
    if(y2>0.4){
        setColor(color2,0.3,0.7,0.3);

    }
    if(y3>0.4){
        setColor(color3,0.3,0.7,0.3);
    }

    //light brown
    if(y1>0.6){
        setColor(color1,0.5,0.2,0.1);
    }
    if(y2>0.6){
        setColor(color2,0.5,0.2,0.1);

    }
    if(y3>0.6){
        setColor(color3,0.5,0.2,0.1);

    }

    //dark brown
    if(y1>0.75){
        setColor(color1,0.3,0.19,0.05);
    }
    if(y2>0.75){
        setColor(color2,0.3,0.19,0.05);

    }
    if(y3>0.75){
        setColor(color3,0.3,0.19,0.05);

    }

    //white
    if(y1>0.9){
        setColor(color1,1,1,1);

    }
    if(y2>0.9){
        setColor(color2,1,1,1);

    }
    if(y3>0.9){
        setColor(color3,1,1,1);
    }
}
export default applyColor;