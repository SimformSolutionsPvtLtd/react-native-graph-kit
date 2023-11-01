import { StyleSheet } from 'react-native';
import { globalMetrics, horizontalScale, moderateScale, verticalScale, width } from './Metrics';

/**
 * A StyleSheet object that contains all of the application's styles.
 * @param {ThemeMode} theme - The theme of the application.
 * @returns {StyleSheet} - A StyleSheet object containing all of the application's styles.
 */
const applicationStyles = StyleSheet.create({
  bottomLine: {
    borderBottomWidth: horizontalScale(0.8)
  },
  buttonBorderStyle: {
    borderRadius: horizontalScale(5),
    borderStyle: 'solid',
    borderWidth: horizontalScale(2)
  },
  buttonBottomMargin: {
    marginBottom: globalMetrics.isAndroid ? verticalScale(35) : verticalScale(40)
  },
  buttonContainer: {
    flex: 0,
    zIndex: 0
  },
  buttonTopMargin: {
    marginTop: verticalScale(15)
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  normalLine: {
    height: horizontalScale(0.8),
    width: '100%'
  },
  screen: {
    flex: 1
  },
  spinnerButton: {
    borderRadius: globalMetrics.isAndroid ? horizontalScale(25) : horizontalScale(20),
    height: globalMetrics.isAndroid ? horizontalScale(50) : horizontalScale(40),
    width: width - horizontalScale(40)
  },
  textLabel: {
    fontSize: moderateScale(14)
  }
});

export default applicationStyles;
