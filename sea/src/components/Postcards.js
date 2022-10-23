import Layers from "./Layers.js";
import { useState } from "react";
import { Vector3 } from 'three';
const data = require('../postcards.json');

function Postcards() {
    const [postcards, ]= useState(data.postcards)
    return (
        <>
        {
            (postcards.length > 0) ?
                <>
                    {postcards.map((props) => {
                        const position = {
                            x: Math.random()*400-200,
                            y: Math.random()*20,
                            z: Math.random()*500-250,
                        }    
                        return (<Layers
                            position={new Vector3(position.x, position.y, position.z)}
                            key={`${props.author}-${props.artwork}-postcard`}
                            {...props} />)
                    })}
                </> : null
            }
            </>)
}
export default Postcards;
