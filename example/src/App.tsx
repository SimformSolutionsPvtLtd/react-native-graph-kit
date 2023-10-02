import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BarChart, LineChart } from '../../src/components';
import { data } from './constants';
import { ApplicationStyles, Colors } from './theme';

const App = () => {
  return (
    <SafeAreaView style={ApplicationStyles.screen}>
      <View style={ApplicationStyles.chartContainer}>
        <BarChart
          chartData={data}
          barWidth={30}
          xAxisLength={90}
          horizontalGridLineColor={Colors.grey}
          labelSize={20}
          legendSize={20}
          yAxisMax={900}
          chartHeight={280}
        />
      </View>
      <View style={ApplicationStyles.chartContainer}>
        <LineChart
          chartData={data}
          xAxisLength={80}
          initialDistance={25}
          yAxisMax={700}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
