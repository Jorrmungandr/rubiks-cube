import { CameraControls, Stats } from '@react-three/drei';

export function RendererOptions() {
  return (
    <>
      <CameraControls />
      <Stats />
      <ambientLight />
      {/* <axesHelper args={[5]} /> */}
    </>
  );
}
