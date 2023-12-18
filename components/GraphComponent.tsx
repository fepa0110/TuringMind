import React, { useEffect } from "react";
import { View } from "react-native";
import { Svg, Circle, Line, Defs, Marker, Path, Text } from "react-native-svg";
import * as d3 from "d3";

const GraphComponent = () => {
	const estados = [
		{ name: "0", x: 50, y: 50 },
		{ name: "1", x: 150, y: 150 },
		{ name: "2", x: 250, y: 50 },
		{ name: "3", x: 350, y: 125 },
	];

	const transiciones = [
		{ from: 1, to: 2 },
		{ from: 0, to: 2 },
		{ from: 3, to: 1 },
	];

	const radioCircle = 20;

	return (
		<View>
			<Svg height="100%" width="100%">
				{/* <Line x1="15" y1="15" x2="40" y2="40" stroke="blue" strokeWidth="0.5"/> */}
				{transiciones.map((transicion) => {
					return (
						<Line
							key={"transicion" + transicion.from + transicion.to}
							x1={estados[transicion.from].x + radioCircle}
							y1={estados[transicion.from].y}
							x2={estados[transicion.to].x + radioCircle}
							y2={estados[transicion.to].y}
							stroke="green"
							strokeWidth="1"
						/>
					);
				})}
				{estados.map((estado, index) => {
					return (
						<View>
							<Circle
								key={"circle" + index + estado.x + estado.y}
								r={radioCircle}
								cx={estado.x}
								cy={estado.y}
								fill="navy"
							/>
							<Text
								fill="white"
								stroke="white"
								fontSize="20"
								fontWeight="normal"
								x={estado.x}
								y={estado.y+(radioCircle/2)}
								textAnchor="middle">
								{estado.name}
							</Text>
						</View>
					);
				})}
			</Svg>
		</View>
	);
};

export default GraphComponent;
