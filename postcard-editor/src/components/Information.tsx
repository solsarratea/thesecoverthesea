
import React, { useEffect } from 'react';
import '../styles/information.css'
function Information(props: any) {
    const onHover = (item: any, section: string) => {
        item.addEventListener("mouseover", (v: any) => {
            const elements = document.getElementsByClassName(section);
            Array.from(elements).forEach((e:any) => {
                e.style.setProperty('background', 'var(--font-color)');
                e.style.setProperty('color', 'var(--background)');
            });
            

        }, false);
        item.addEventListener("mouseout", (v: any) => {
            const elements = document.getElementsByClassName(section);
            Array.from(elements).forEach((e:any) => {
                e.style.setProperty('background', 'var(--background)');
                e.style.setProperty('color',  'var(--font-color)');
            });
        }
            , false);
    }
    useEffect(() => {
        var elements = document.getElementsByClassName("section1");
        Array.from(elements).forEach((e) => onHover(e, "section1"));
        
        elements = document.getElementsByClassName("section2");
        Array.from(elements).forEach((e) => onHover(e, "section2"));
        
        elements = document.getElementsByClassName("section30");
        Array.from(elements).forEach((e) => onHover(e, "section30"));
        elements = document.getElementsByClassName("section31");
        Array.from(elements).forEach((e) => onHover(e, "section31"));
        elements = document.getElementsByClassName("section33");
        Array.from(elements).forEach((e) => onHover(e, "section33"));
        elements = document.getElementsByClassName("section34");
        Array.from(elements).forEach((e)=> onHover(e,"section34"));

    }, [])
    

    const { blockSize1, blockSize2 } = props;

    return <>
        <section id="information"
            className="block-info"
            style={{
                bottom: blockSize1.top,
                left: blockSize1.left,
                width: blockSize1.width,
                height: blockSize1.height,
                overflowY: "scroll",
                padding: "0 0"
            }}>
            <div className="sub-block section1 text">
                <h1>SECTION I : Gallery</h1>
                <p>
                Pick the source image by using the arrows
                </p>
                <p>You can zoom in/out and rotate the source image.</p>
                
            </div>
            <div className="sub-block section2 text">
                <h1>SECTION II : Mask editor</h1>
                <p>Enable controls by pressing on the <b>| mask |</b> button.</p>
              
                <p>
                Generate a chromatic mask from the source image.
                </p> 
                <h2>{"HOW>"}</h2>
                    <p>Pick a color.</p>
                    <p>All pixels whose color values are within the threshold number will be seen as red, which later will become the mask.</p>
                    <p>The smoothness parameter will control the edges.</p>
                   
            </div>
            <div className="sub-block section30 text no-border">
                <h1>SECTION III: Layers editor</h1>
                <p>Enable controls by pressing on the <b>| layer |</b> button.</p>
                
                <p><b>{"button |+|"}</b> Add the layer, translate it and rotate it with the pivot controls.</p>
                <p>Change the output color, and you con <b>mix</b> it with original source</p>
                {/* <p><b>{"button"}</b><i className="icon" src="icons/axis.jpeg"/> Show and hide the pivot controls</p> */}
            
            
            </div>
            <div className="sub-block section31 text no-border">
                <p> Combine using <b>| mask |</b> + <b>| layer |</b> buttons to add multiple layers</p>
            </div>
            <div className="sub-block section33 text no-border">
                <p> Enable orbit controls with <b> | 3D |</b> button. </p>
                <p> Toggle to screen mode with <b> | 2D |</b> button. </p>
                <p> Reset camera position with <b> | R |</b> button. </p>
            </div>
            <div className="sub-block section34 text no-border">
            <p> Try your design in dark mode</p>
            </div>


        </section>
        <section id="demo"
            className="block-info"
            style={{
                bottom: blockSize2.top,
                left: blockSize2.left,
                width: blockSize2.width,
                height: blockSize2.height,
                overflowY: "scroll",
                padding: "0 0"
              }}
        
        >
            <div className="sub-block section1">
                <video autoPlay controls={false} src="./section1.mp4" />      
            </div>
            <div className="sub-block section2">
                <video autoPlay controls={false}  src="./section2.mp4" ></video>            
            </div>
            <div className="sub-block section30 no-border">
                <video autoPlay controls={false} src="./section30.mp4" ></video>
            </div>
            <div className="sub-block section31 no-border">
                <video autoPlay controls={false} src="./section31.mp4" ></video>
                <video  autoPlay controls={false} src="./section32.mp4" ></video>
            </div>
            <div className="sub-block section33 no-border">
                <video autoPlay controls={false} src="./section33.mp4" ></video>
            </div>
            <div className="sub-block section34">
                <video autoPlay controls={false} src="./section34.mp4" ></video>
            </div>
        </section>
           </>
}


export default Information;