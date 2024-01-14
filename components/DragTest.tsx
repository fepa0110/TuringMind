import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const END_POSITION = 300;

export function DragTest() {
	const onLeft = useSharedValue(true);
	const position = useSharedValue(0);
	const radioCircle = 30;
	const [circlePosition, setCirclePosition] = useState({ x: radioCircle, y: radioCircle });

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
            if (onLeft.value) {
                position.value = e.translationX;
			} 
            else {
                // position.value = END_POSITION + e.translationX;
                position.value = e.translationX
			}
            // setCirclePosition({...circlePosition, x: e.x})
		})
		.onEnd((e) => {
			if (position.value > END_POSITION) {
				position.value = withTiming(END_POSITION, { duration: 100 });
				onLeft.value = false;
			} 
            else if (position.value <=0){
				position.value = withTiming(0, { duration: 100 });
				onLeft.value = true;
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: position.value }],
	}));

	return (
		// <View style={{width: "100%", height: "100%"}}>
		<GestureDetector gesture={panGesture}>
			{/* <Animated.View
				style={[
					{
						borderWidth: 1,
						width: radioCircle * 2,
						height: radioCircle * 2,
					},
					animatedStyle,
				]}> */}
				<Svg height="100%" width="100%">
					<Circle
						r={radioCircle}
						cx={circlePosition.x}
						cy={circlePosition.y}
						fill="orange"
					/>
				</Svg>
			{/* </Animated.View> */}
		</GestureDetector>
		// </View>
	);
}

const styles = StyleSheet.create({
	box: {
		height: 120,
		width: 120,
		backgroundColor: "#b58df1",
		borderRadius: 60,
		marginBottom: 30,
	},
});
