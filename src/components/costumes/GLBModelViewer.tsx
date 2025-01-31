'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'

type Props = {
  modelUrl: string
}

const GLBModelViewer = ({ modelUrl }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(THREE.Color.NAMES.white)

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    const ambientLight = new THREE.AmbientLight(0xffffff, 5)
    scene.add(ambientLight)
    const loadingManager = new THREE.LoadingManager()
    loadingManager.onStart = () => {
      console.log('Loading started')
    }
    loadingManager.onLoad = () => {
      console.log('Loading complete')
      if (containerRef.current) {
        containerRef.current.removeChild(loadingScreen)
      }
    }
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(`Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files.`)
    }
    loadingManager.onError = (url) => {
      console.log(`There was an error loading ${url}`)
    }

    const loadingScreen = document.createElement('div')
    loadingScreen.innerText = 'Loading...'
    loadingScreen.style.position = 'absolute'
    loadingScreen.style.top = '50%'
    loadingScreen.style.left = '50%'
    loadingScreen.style.transform = 'translate(-50%, -50%)'
    loadingScreen.style.fontSize = '24px'
    loadingScreen.style.color = '#000'
    if (containerRef.current) {
      containerRef.current.appendChild(loadingScreen)
    }

    const loader = new GLTFLoader(loadingManager)
    const dracoLoader: DRACOLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/lib/')
    loader.setDRACOLoader(dracoLoader)
    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene
      model.position.set(0, -1, 0)
      scene.background = new THREE.Color(0xffffff)
      scene.add(model)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
      controls.screenSpacePanning = false
      controls.maxPolarAngle = Math.PI / 2

      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        if (sceneRef.current && cameraRef.current && rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
      }
      animate()
    })
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 1
    const animate = () => {
      requestAnimationFrame(animate)
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }
    animate()
  }, [modelUrl])

  return <div ref={containerRef} className='select-none' />
}

export default GLBModelViewer
