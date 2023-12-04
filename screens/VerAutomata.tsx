import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { BibliotecaNavigationStackParamList } from '../navigation/types/BibliotecaNavigationType'
import { StackScreenProps } from '@react-navigation/stack';

import { TablaEstadosView } from '../components/TablaEstadosView';

import { useTheme } from '../hooks/useTheme';

type BibliotecaNavigationProps = StackScreenProps<BibliotecaNavigationStackParamList, 'VerAutomata'>;

export default function VerAutomata({ route } : BibliotecaNavigationProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

  return (
    <View style={styles().mainContainer}>
      <TablaEstadosView automata={ route.params.automata } />
    </View>
  )
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		mainContainer: {
			height: "100%",
			width: "100%",
			backgroundColor: colors.background
		}
	});
