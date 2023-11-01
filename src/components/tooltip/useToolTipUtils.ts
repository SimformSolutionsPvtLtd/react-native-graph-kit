import { useValue } from '@shopify/react-native-skia';
import { useRef, useState } from 'react';
import type { PointDataType, WindowSizeDataType } from './ToolTipTypes';

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

  return {
    windowSize,
    xForWindow,
    pointData,
    setPointData,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint
  };
};

export default useToolTipUtils;
