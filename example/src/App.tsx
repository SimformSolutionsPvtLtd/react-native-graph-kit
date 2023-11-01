import React from 'react';
import { SafeAreaView } from 'react-native';
import { BarChart } from '../../src/components';
import { data } from './constants';
import { ApplicationStyles } from './theme';
import Colors from './theme/Colors';

const App = () => {
  return (
    <SafeAreaView style={ApplicationStyles.centerAlign}>
      <BarChart
        chartData={data}
        barWidth={30}
        xAxisLength={90}
        horizontalGridLineColor={Colors.grey}
        labelSize={20}
        legendSize={20}
        xLegendColor={'red'}
        yAxisMax={900}
      />
    </SafeAreaView>
  );
};

export default App;
