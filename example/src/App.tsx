import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-graph-kit';
import { data } from './constants';
import { ApplicationStyles, Colors } from './theme';

const App = () => {
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
