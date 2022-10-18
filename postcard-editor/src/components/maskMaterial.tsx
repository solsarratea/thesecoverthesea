import * as THREE from 'three';
import { RGBAColor } from '../types/common';

const rgbtohsl = `
vec3 hsl2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}


vec3 rgb2hsl( in vec3 c ){
  float h = 0.0;
	float s = 0.0;
	float l = 0.0;
	float r = c.r;
	float g = c.g;
	float b = c.b;
	float cMin = min( r, min( g, b ) );
	float cMax = max( r, max( g, b ) );

	l = ( cMax + cMin ) / 2.0;
	if ( cMax > cMin ) {
		float cDelta = cMax - cMin;
        
        //s = l < .05 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) ); Original
		s = l < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
        
		if ( r == cMax ) {
			h = ( g - b ) / cDelta;
		} else if ( g == cMax ) {
			h = 2.0 + ( b - r ) / cDelta;
		} else {
			h = 4.0 + ( r - g ) / cDelta;
		}

		if ( h < 0.0) {
			h += 6.0;
		}
		h = h / 6.0;
	}
	return vec3( h, s, l );
}
`

const customMaterial = ( texture: any,
    color: RGBAColor,
    deltaColor: number,
    deltaSmooth: number) => ({
  uniforms: {
    uColor: { value: new THREE.Vector4(color.r / 255, color.g / 255, color.b / 255, color.a / 255.) },
    uSource: { value: texture },
    uDc: { value: deltaColor },
    uDs: { value: deltaSmooth }
        
  },
  vertexShader: `
    precision mediump float;
    varying vec2 vUv;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec4 uColor;
    uniform sampler2D uSource;
    uniform float uDc;
    uniform float uDs;
    ${ rgbtohsl }
    void main() {
      vec2 uv = vUv; vec3 color;
      vec3 tex = texture2D(uSource, vUv).rgb;

      //Make colors more vivid
      tex.rgb = rgb2hsl(tex.rgb);
      tex.b = pow( tex.b,.6);
      tex.g = pow( tex.g,.6);
      tex.rgb = hsl2rgb(tex.rgb);

      float dc = uDc;
      float mask = smoothstep(dc, dc+uDs*0.5,length(tex.rgb-uColor.rgb));
      color.rgb = mix(vec3(1.,0.,0.),tex.rgb, mask);

      gl_FragColor = vec4(color, 1.);
    }
  `
});

export default  customMaterial;