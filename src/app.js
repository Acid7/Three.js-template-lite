import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'

import './app.styl'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'



// Settings

const settings = {
	foo: 0,
	bar: 1,
}

// Tweakpane

const pane = new Pane()
pane.addInput(settings, 'foo', { min: 0, max: 10, step: 0.01 })
pane.addInput(settings, 'bar', { min: 0, max: 10, step: 0.01 })



// Scene

class Scene {
	constructor() {

		// Dimensions
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.clock = new THREE.Clock()

		// Init
		this.setRenderer()
		this.setCamera()
		this.addGeometry()
		this.render()
	}

	// Renderer

	setRenderer() {
		this.scene = new THREE.Scene()

		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('canvas'),
			antialias: true,
			alpha: true,
		})
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.renderer.setSize(this.width, this.height)

		// Resize
		window.addEventListener('resize', () => {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.renderer.setSize(this.width, this.height)
			this.camera.aspect = this.width / this.height
			this.camera.updateProjectionMatrix()
		})
	}

	// Camera

	setCamera() {
		this.camera = new THREE.PerspectiveCamera(
			45,
			this.width / this.height,
			0.1,
			100
		)

		this.camera.position.set(0, 0, 2)
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
	}

	// Geometry

	addGeometry() {
		const geometry = new THREE.PlaneGeometry(1, 1, 16, 16)
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
			},
			// wireframe: true,
		})
		this.mesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.mesh)
	}

	// Render

	render() {

		// Update uniforms
		this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime()

		// Render
		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.render.bind(this))
	}

}

new Scene()
