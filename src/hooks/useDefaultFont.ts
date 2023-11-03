import { listFontFamilies } from '@shopify/react-native-skia';
import { Platform } from 'react-native';

type UseDefaultFontPropsType = {
  labelSize: number;
};

/**
 * The function `useDefaultFont` she appropriate font family based on the platform and createselects t
 * a `fontStyle` object with the selected font family and font size.
 * @param {UseDefaultFontPropsType}  - - `labelSize`: The size of the label font.
 * @returns an object with a property called "fontStyle".
 */
const useDefaultFont = ({ labelSize }: UseDefaultFontPropsType) => {
  /**
   * Get the default font family from the available font families list.
   * @returns {string[]}
   */
  const defaultFont = listFontFamilies();

  /**
   * Select the appropriate font family based on the platform.
   * On iOS, Android, or any other platform, it defaults to the first font in the list.
   * @type {string}
   */
  const fontFamily: string = Platform.select({
    ios: defaultFont?.[0],
    android: defaultFont?.[0],
    default: defaultFont?.[0]
  });

  /**
   * Create a fontStyle object with the selected fontFamily and fontSize.
   */
  const fontStyle = {
    fontFamily,
    fontSize: labelSize
  };

  return { fontStyle };
};

export default useDefaultFont;
