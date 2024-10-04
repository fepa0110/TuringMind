import {
	StyleSheet
} from "react-native";

import { MASK1_BOTTOM, MASK1_HEIGHT } from "../styles/masks";

const OFFSET = 0

const styles = StyleSheet.create({
    card1: {
      position: "absolute",
      bottom: MASK1_BOTTOM + MASK1_HEIGHT + OFFSET,
      alignSelf: "center",
    },
    // ...cards
  });