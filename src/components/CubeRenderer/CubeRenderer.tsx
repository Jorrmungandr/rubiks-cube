import { Canvas } from '@react-three/fiber';
import { Cube } from '../../types';
import { Cuboid, RendererOptions } from './components';
import { getCuboidsFromCubeState } from '../../helpers/getCuboidsFromCubeState';
import { CuboidManager } from './components/CuboidManager';

type CubeRendererProps = {
	cube: Cube;
}

export function CubeRenderer({ cube }: CubeRendererProps) {
	const cuboids = getCuboidsFromCubeState({ cube });

	return (
		<Canvas>
			<RendererOptions />

			<CuboidManager
				cubeSideLength={cube.up.length}
				cuboids={cuboids}
			/>
		</Canvas>
	);
}
