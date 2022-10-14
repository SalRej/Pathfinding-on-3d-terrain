import React , {useState} from 'react'
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';

function Home() {
    const [showGetStarted,setShowGetStarted] = useState(true);

    return (
    <div>
        <video autoPlay="autoplay" muted loop id="background-video">
        <source src="/video/earth-rotation.mp4" type="video/mp4"></source>
        </video>

        <CSSTransition in={showGetStarted}
        timeout={1000}
        classNames='get-started'
        >
        <div className='holder'>
            <h1>Create you own world</h1>
            <button onClick={()=>setShowGetStarted(false)}>Get started now</button>
        </div>
        </CSSTransition>

        {showGetStarted===false &&
            <div className='holder two-buttons animate__fadeInUp animate__animated'>
                <p>Make your choice</p>
                <Link to='/noiseGeneration'>
                    <button>Generete world with perlin noise</button>
                </Link>
                <Link to='/heightMapGeneration'>
                    <button>Import height map image</button>
                </Link>
            </div>
        }
    </div>
    )
}

export default Home