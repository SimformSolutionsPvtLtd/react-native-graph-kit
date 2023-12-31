<img src="./assets/reactGraph.gif" >

# react-native-graph-kit

[![@shopify/react-native-skia](https://img.shields.io/badge/%40shopify%2Freact--native--skia-0.1.228-blue.svg?style=flat-square)](https://github.com/Shopify/react-native-skia)
[![react-native-graph-kit on npm](https://img.shields.io/npm/v/react-native-graph-kit?style=flat-square&label=npm&color=blue)](https://www.npmjs.com/package/react-native-graph-kit) [![npm downloads](https://img.shields.io/npm/dm/react-native-graph-kit.svg?style=flat-square)](https://www.npmjs.com/package/react-native-graph-kit) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android&style=flat-square)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple&style=flat-square)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)

---

**React Native Graph Kit** is a powerful library that is built using @shopify/react-native-skia to provide LineChart and BarChart components with interactive tooltips for your React Native applications. With this library, you can effortlessly visualize your data in a clean and intuitive manner, making it easier than ever for users to understand complex datasets.

ℹ️ **Compatibility Notice:** This library is designed to work seamlessly with `@shopify/react-native-skia` version `<=0.1.228`. Make sure to use this version for optimal compatibility.

- It also provides an example app and a detailed usage overview of both the components.
- Both the available components are fully Android and iOS compatible.

## 🎬 Preview

| LineChart                                                       | BarChart                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="./assets/lineChart.gif"  style="border-radius:10px" > | <img src="./assets/barChart.gif"  style="border-radius:10px" > |

## Quick Access

[Installation](#installation) | [Charts](#charts) | [Properties](#properties) | [Example](#example) | [License](#license)

# Installation

##### 1. Install library and @shopify/react-native-skia

```bash
npm install react-native-graph-kit @shopify/react-native-skia
```

###### --- or ---

```bash
yarn add react-native-graph-kit @shopify/react-native-skia
```

##### 2. Install cocoapods in the ios project

```bash
cd ios && pod install
```

And you are good to begin.

---

# Charts

| BarChart                                                                 | LineChart                                                                    |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| <img src="./assets/barChartWithLegends.png" style="border-radius:10px" > | <img src="./assets/lineChartWithLegends.png"   style="border-radius:10px"  > |
|                                                                          |

- LineChart: Create elegant line charts to showcase trends and patterns in your data.
- BarChart: Display data using visually appealing bar charts, making comparisons at a glance.

### ChartDataType

```jsx
type ChartDataType = {
  xAxis: {
    labels: string[]
  },
  yAxis: {
    datasets: number[]
  }
};
```

### ChartDataFormat

```jsx
const data = {
  xAxis: {
    labels: [
      'Alice',
      'Bob',
      'Charlie',
      'Liam',
      'Mia',
      'Nora',
      'Oliver',
      'Penelope',
      'Quinn',
      'Ryan',
      'Sophia'
    ]
  },
  yAxis: {
    datasets: [230, 75, 100, 500, 387, 655, 30, 60, 400, 500, 687]
  }
};
```

#### Usage

##### Basic Example

```jsx
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-graph-kit';

const data = {
  xAxis: {
    labels: [
      'Alice',
      'Bob',
      'Charlie',
      'Liam',
      'Mia',
      'Nora',
      'Oliver',
      'Penelope',
      'Quinn',
      'Ryan',
      'Sophia'
    ]
  },
  yAxis: {
    datasets: [120, 350, 400, 70, 87, 655, 10, 20, 400, 70, 87]
  }
};

const App = () => (
  <SafeAreaView style={styles.screen}>
    <View style={styles.chartContainer}>
      <BarChart
        chartData={data}
        barWidth={30}
        barGap={70}
        horizontalGridLineColor={'grey'}
        chartHeight={300}
        yAxisMax={1000}
      />
    </View>
    <View style={styles.chartContainer}>
      <LineChart yAxisMax={1000} chartData={data} xAxisLength={70} initialDistance={30} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  chartContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    padding: 10,
    margin: 10,
    shadowColor: 'lightgrey',
    shadowOpacity: 1,
    backgroundColor: 'white',
    shadowOffset: {
      height: 6,
      width: 5
    }
  }
});

export default App;
```

---

# Properties

### Chart Props

| Prop                    | Default     | Type          | Description                                          | BarChart | LineChart |
| :---------------------- | :---------- | :------------ | :--------------------------------------------------- | -------- | --------- |
| **chartData\***         | null        | ChartDataType | Data to plot graphs                                  | ✔️       | ✔️        |
| chartHeight             | 500         | number        | Height of chart in BarChart                          | ✔️       | ⤫         |
| showLines               | true        | boolean       | Control visibility of Y Axis Ref lines on the chart  | ✔️       | ✔️        |
| lineHeight              | 2           | number        | Height of horizontal grid lines in BarChart          | ✔️       | ⤫         |
| lineWidth               | 3           | number        | The line width value of LineChart                    | ⤫        | ✔️        |
| lineColor               | #DE5E69     | ColorValue    | The line color of LineChart                          | ⤫        | ✔️        |
| barWidth                | 20          | number        | The width of the bars in BarChart                    | ✔️       | ⤫         |
| barColor                | #DE5E69     | ColorValue    | The color of the bars in BarChart                    | ✔️       | ⤫         |
| barRadius               | 0           | number        | The borderRadius of the bars in BarChart from top    | ✔️       | ⤫         |
| barGap                  | 50          | number        | X Axis length covered by bars                        | ✔️       | ⤫         |
| labelSize               | 18          | number        | The fontsize of labels on the chart                  | ✔️       | ✔️        |
| labelColor              | #000000     | ColorValue    | The font color of chart labels                       | ✔️       | ✔️        |
| labelFontFamily         | System Font | ColorValue    | The font path that will be applied to chart labels   | ✔️       | ✔️        |
| horizontalGridLineColor | #D3D3D3     | Color         | The Ref lines color                                  | ✔️       | ✔️        |
| yAxisMin                | 0           | number        | The minimum value for the YAxis Plotting             | ✔️       | ✔️        |
| yAxisMax                | auto        | number        | The maximum value for the YAxis Plotting             | ✔️       | ✔️        |
| initialDistance         | 10          | number        | The initial distance of chart from the Y Axis Labels | ✔️       | ✔️        |
| xAxisLength             | auto        | number        | Manual distance between x Axis Plotting              | ⤫        | ✔️        |
| verticalLabel           | false       | boolean       | Handle rotation of X-Axis Labels                     | ✔️       | ✔️        |
| verticalLabelHeight     | auto        | number        | Desired height of the X-Axis                         | ⤫        | ✔️        |
| chartBackgroundColor    | #FFFFFF     | Color         | Chart background color                               | ✔️       | ✔️        |
| xAxisLegend             | undefined   | string        | The X Axis Legend Value                              | ✔️       | ✔️        |
| yAxisLegend             | undefined   | string        | The Y Axis Legend Value                              | ✔️       | ✔️        |
| xLegendStyles           | Default     | TextStyle     | X Axis Legend styles                                 | ✔️       | ✔️        |
| yLegendStyles           | Default     | TextStyle     | Y Axis Legend styles                                 | ✔️       | ✔️        |

---

### Tooltip Props

| Prop                     | Default | Type    | Description                             | BarChart | LineChart |
| :----------------------- | :------ | :------ | :-------------------------------------- | -------- | --------- |
| displayTooltip           | false   | boolean | Flag to handle tooltip visibility       | ✔️       | ✔️        |
| toolTipLabelFontSize     | 12      | number  | Font size                               | ✔️       | ✔️        |
| toolTipColor             | #FF0000 | string  | Tooltip color                           | ✔️       | ✔️        |
| toolTipDataColor         | #FFFFFF | string  | Tooltip data color                      | ✔️       | ✔️        |
| toolTipHorizontalPadding | 20      | number  | Tooltip padding                         | ✔️       | ✔️        |
| toolTipFadeOutDuration   | 4000    | number  | Duration in ms to fade out tooltip      | ✔️       | ✔️        |
| circularPointerColor     | #000000 | string  | Color of circular pointer for LineChart | ⤫        | ✔️        |

---

# Example

A full working example project is here [Example](./example/src/App.tsx)

```sh
yarn
yarn example ios   // For ios
yarn example android   // For Android
```

# TODO

- [ ] Add option to enable Parametric Curve

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-graph-kit/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-graph-kit/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-graph-kit/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-graph-kit/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## Awesome Mobile Libraries

- Check out our other [available awesome mobile libraries](https://github.com/SimformSolutionsPvtLtd/Awesome-Mobile-Libraries)

## License

- [MIT License](./LICENSE)
