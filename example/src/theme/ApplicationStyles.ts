import { StyleSheet } from 'react-native';
import { moderateScale } from './Metrics';

/**
 * A StyleSheet object that contains all of the application's styles.
 * @param {ThemeMode} theme - The theme of the application.
 * @returns {StyleSheet} - A StyleSheet object containing all of the application's styles.
 */
const applicationStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  chartContainer: {
    flex: 1,
    borderWidth: 1,
    padding: moderateScale(10),
    margin: moderateScale(10),
  },
});

export default applicationStyles;
