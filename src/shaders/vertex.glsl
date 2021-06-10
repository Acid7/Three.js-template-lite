// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)

uniform float uTime;
uniform float uFoo;
uniform float uBar;

varying vec2 vUv;

void main() {

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	vUv = uv;

}
