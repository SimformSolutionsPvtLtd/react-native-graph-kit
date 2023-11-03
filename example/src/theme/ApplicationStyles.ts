import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from './Metrics';
import Colors from './Colors';

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
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: moderateScale(10),
    margin: moderateScale(10),
    shadowColor: Colors.grey,
    shadowOpacity: 1,
    backgroundColor: Colors.white,
    shadowOffset: {
      height: verticalScale(6),
      width: horizontalScale(5),
    },
  },
});

export default applicationStyles;
