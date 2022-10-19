import DisplayInfo from "./DisplayInfo.js";
import React from 'react';
import "../styles/ui.css";

/* eslint-disable */
const boat = `
              |    |    |              
             )_)  )_)  )_)             
            )___))___))___)           
          )____)____)_____)\\          
        _____|____|____|____\\\__      
---------\                   /---------
^^^^^ ^^^^^^^^^^^^^^^^^^^^^
          ^^^^      ^^^^     ^^^    ^^
      ^^^^      ^^^
`


function UI({show,init, ...props}) {
  return (
    <main>
      {init ? <DisplayInfo id="helpContainer" src="UI/Question.png" styleClass="help" show={show}> 
        <p></p>
        <div style={{whiteSpace:"pre"}}>
      {boat}
        </div>
        
          <button className="enter">NAVIGATE</button> 
      </DisplayInfo>
      : null}
      <DisplayInfo
        openText="THESE COVERS THE SEA"
        styleClass="about"
        show={false}
        {...props}
      >
        <h2 className="about-subtitle">Creating New Dimensions</h2>
        <h1 className="about-title">THESE COVERS THE SEA</h1>
        <div className="about-text" id="about">
          <div className="about-motiv glow" id="">
            <p> Imagine diving into something unkown for the first time.  </p>
            <p> With new perspectives on known objects. </p>
          </div>
       
          <p> Navigate through the sea covered by chromatic layers </p>
          <p>& find the cards posted by peers around the world.</p>
          <br></br>
          <div className="center">
            <p>+ Observe the chromatic composition</p>

            <p>+ Observe flora and fauna</p>

            <p>+ Observe feathers and eyes</p>
          </div>
      
          <br></br>
         <p>Explore Georg Forsters's sketches from his observations during James Cook's second circumnavigation in the South Sea.</p>

          <div className="about-text-invert">
              <a href="https://postcard-editor.solsarratea.world/" className="invert">
              <img alt="postcard-src" src="UI/favicon.ico" />
                <p>Design your own post card, and post it to the sea.
              
              </p></a>
            </div>
        
        </div>


        <div className="social-networks" >
          <a href="https://hackdash.org/projects/634ab7a16d202d739f69ce81"className="invert" >
            <img alt="hackdash-src" src="UI/Web.png" />
       
          </a>
          <a href="https://github.com/solsarratea/thesecoverthesea"  >
            <img alt="github-src" src="UI/github.png" />
       
          </a>
          
        </div>
      </DisplayInfo>
    </main>
  );
}

export default UI;
