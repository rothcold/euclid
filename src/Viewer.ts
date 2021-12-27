import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'

class Viewer {
  parentElement: HTMLElement
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(parentElement.clientWidth, parentElement.clientHeight)
    this.parentElement.appendChild(this.renderer.domElement)

    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    this.scene.add(cube)
    // this.scene.background = new Color(0xffffff)

    this.camera.position.z = 5
    this.animate()
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    this.renderer.render(this.scene, this.camera)
  }
}

export default Viewer
