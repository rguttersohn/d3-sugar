# What is this? 
A D3.JS helper library designed to quickly make basic data visuals. 

# What data visuals are currently available?

- Vertical Bar Chart
- Horizontal Bar Chart
- Pie Chart
- Combo Chart
- Line Chart

# How to install

Install D3.JS. D3-Sugar should work with with v4 to v6.

`
npm install d3-sugar
`

Each visual can be imported individually using destructing. 

Example: 

```
import { PieChart } from "../d3-sugar.js";
```

# How to use D3-Sugar 

Let's go over an easy example by making an animated vertical bar chart. 

We'll use the below dataset for this example:

```
const data = [
  {
    year: "2001",
    value: 33,
  },
  {
    year: "2002",
    value: 44,
  },
  {
    year: "2003",
    value: 17,
  },
  {
    year: "2004",
    value: 23,
  },
];

```

1. Instantiate the class VerticalBarChart. The single argument required for the constructor will be the selector for the root HTML element. In this example, our root will have the ID if **bar-chart** _Note: No need to add an SVG tag in your HTML. That will be rendered for you._

```
let barChart = new VerticalBarChart("#bar-chart")

```

 D3-Sugar was designed with D3.JS in mind. From here, we write a series of methods that have included some encapsulated native-D3.JS code. 

 The first method we'll run is **barChart.createChart**. Here we'll set up some basic info including binding our data with the correct dataset, indicator and stat.

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value'
  })
```

The D3-Sugar vertical bar charts by default have width of 300 and height of 400. You can change that default setting using the .createChart method. Below, we'll make our visual a little wider.

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
```

Next we'll add the .addBars to ... well ... add our bars. 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars()
```

At this point, you should see four bars with black fills. Add colors by using the **color** option built into the .addBars method: 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"]
  })
```




