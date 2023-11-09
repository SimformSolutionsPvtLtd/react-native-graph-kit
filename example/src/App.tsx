import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { BarChart, LineChart } from '../../src/components';
import { ApplicationStyles, Colors } from './theme';
import { generateDummyData } from './utils';

const App = () => {
  const [data, setData] = useState(generateDummyData(8));

  const myOperation = () => {
    const numberOfData = Math.floor(Math.random() * 10);
    const updateData = generateDummyData(numberOfData > 3 ? numberOfData : 4);
    setData(updateData);
  };

  useEffect(() => {
    const intervalId = setInterval(myOperation, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SafeAreaView style={ApplicationStyles.screen}>
      <View style={ApplicationStyles.chartContainer}>
        <BarChart
          chartData={data}
          barWidth={30}
          xAxisLength={70}
          horizontalGridLineColor={Colors.grey}
          initialDistance={5}
          chartHeight={300}
          yAxisMax={1000}
        />
      </View>
      <View style={ApplicationStyles.chartContainer}>
        <LineChart
          yAxisMax={1000}
          chartData={data}
          xAxisLength={80}
          initialDistance={30}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
