import { listFontFamilies } from '@shopify/react-native-skia';
import { Platform } from 'react-native';

type UseDefaultFontPropsType = {
  labelSize: number;
};

const useDefaultFont = ({ labelSize }: UseDefaultFontPropsType) => {
  const defaultFont = listFontFamilies();
  const fontFamily = Platform.select({
    ios: defaultFont?.[0],
    android: defaultFont?.[0],
    default: defaultFont?.[0]
  });
  const fontStyle = {
    fontFamily,
    fontSize: labelSize
  };

  return { fontStyle };
};

export default useDefaultFont;
