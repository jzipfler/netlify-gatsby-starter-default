import * as THREE from "three"
import React, { useMemo, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { Canvas, useFrame } from "react-three-fiber"
import { OrbitControls, HTML, PerspectiveCamera, Box } from "drei"

function Cube() {
  const cam = useRef()
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("orange")
    const target = new THREE.WebGLRenderTarget(1024, 1024)
    return [scene, target]
  }, [])

  useFrame(state => {
    cam.current.position.z =
      5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      <Box args={[2, 2, 2]}>
        <HTML scaleFactor={10}>
          <div class="content">HTML Content in Cube</div>
        </HTML>
        <meshStandardMaterial attach="material" map={target.texture} />
      </Box>
    </>
  )
}

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" />

      <h1>About</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <p>Welcome to about</p>
      <Link to="/">Go back to the homepage</Link>

      <Canvas colorManagement style={{
        position: 'absolute',
        width: '400px',
        height: 'calc(100% - 100px)',
        top: '100px',
        right:0
      }}>
        <ambientLight />
        <spotLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="red" />
        <Cube />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </Layout>
  )
}

export default AboutPage
