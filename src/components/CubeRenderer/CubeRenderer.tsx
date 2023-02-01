import { Canvas } from '@react-three/fiber';
import { Cube } from '@/types';
import { Cuboid, RendererOptions } from './components';
import { getCuboidsFromCubeState } from '../../helpers/getCuboidsFromCubeState';

type CubeRendererProps = {
	cube: Cube;
}

export function CubeRenderer({ cube }: CubeRendererProps) {
	const cuboids = getCuboidsFromCubeState({ cube });

	return (
		<Canvas>
			<RendererOptions />

			{cuboids.map(({	position, colorIndexes }) => (
				<Cuboid position={position} colorIndexes={colorIndexes} />
			))}
		</Canvas>
	);
}
