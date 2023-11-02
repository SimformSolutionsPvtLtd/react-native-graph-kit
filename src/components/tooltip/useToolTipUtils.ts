import { useValue } from '@shopify/react-native-skia';
import { useRef, useState } from 'react';
import type { PointDataType, SetWindowSizeArgsType, WindowSizeDataType } from './ToolTipTypes';
import type { NativeScrollEvent } from 'react-native';

const useToolTipUtils = () => {
  const windowSize = useRef<WindowSizeDataType>({
    x: 0,
    y: 0
  });
  const xForWindow = useRef<number>(0);
  const xCoordinateForDataPoint = useValue(0);
  const yCoordinateForDataPoint = useValue(0);
  const [pointData, setPointData] = useState<PointDataType>({
    x: '0',
    y: '0'
  });

  const setXForWindow = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    xForWindow.current = nativeEvent.contentOffset.x;
  };

  const setWindowSize = ({ nativeEvent }: SetWindowSizeArgsType) => {
    windowSize.current.x = nativeEvent.layout.width;
    windowSize.current.y = nativeEvent.layout.height;
  };

  return {
    windowSize,
    xForWindow,
    pointData,
    setPointData,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint,
    setXForWindow,
    setWindowSize
  };
};

export default useToolTipUtils;
