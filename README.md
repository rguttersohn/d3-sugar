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

At this point, you should see four bars with black fills. Add colors by using the **color** array option built into the .addBars method: 

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
We can also make other adjustments to the bars using some additional options. We'll add some additional space between the bars by using the padding option: 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding: .4
  })
```
I guess now would be good time to add the axes. vertical bar chart comes with two methods to handle the axes: addYAxis and addXAxis.

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding: .4
  })
  .addYAxis()
  .addXAxis()
```
You should see a set of axes now. Notice the indicator names appearing in the x-axis. Out of the box these look OK. But I am going to add some additional options to make these more to my looking. 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding:.4
  })
  .addYAxis({
    formatPunctuation:"addPercent",
    hideLine:true,
    tickSizeInner:0,
    tickSizeOuter:0,
    ticks:5
  })
  .addXAxis({
    tickPadding: 5,
    hideLine:true
  })
```
And now, let's add some labels. Note, I'll be using the formatPunctuation option on the labels - similar to our addYAxis method: 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding:.4
  })
  .addYAxis({
    formatPunctuation:"addPercent",
    hideLine:true,
    tickSizeInner:0,
    tickSizeOuter:0,
    ticks:5
  })
  .addXAxis({
    tickPadding: 5,
    hideLine:true
  })
  .addLabels({
    formatPunctuation:"addPercent"
  })
```

Now let's add a transiton to the bars using the addTransiton method. We'll also set the options **duration** and **delay** 

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding:.4
  })
  .addTransition({
    duration:1000,
    delay:(d,i)=>i*300
  })
  .addYAxis({
    formatPunctuation:"addPercent",
    hideLine:true,
    tickSizeInner:0,
    tickSizeOuter:0,
    ticks:5
  })
  .addXAxis({
    tickPadding: 5,
    hideLine:true
  })
  .addLabels({
    formatPunctuation:"addPercent"
  })
```

_Note: In this case, the addTransition could have gone at the end of the method chain, but in more complex charts where you have multiple visuals, you'll want the addTranstion method to follow directly behind the element you to visualize. 

Now let's finish this visual by adding adding a legend and a header.

```
let barChart = new VerticalBarChart("#bar-chart")
  .createChart({
    data: data,
    indicator: "year",
    stat: 'value',
    width: 400
  })
  .addBars({
    color:["#0099cd","#75b1d4","#afc9db","#e2e2e2"],
    padding:.4
  })
  .addTransition({
    duration:1000,
    delay:(d,i)=>i*300
  })
  .addYAxis({
    formatPunctuation:"addPercent",
    hideLine:true,
    tickSizeInner:0,
    tickSizeOuter:0,
    ticks:5
  })
  .addXAxis({
    tickPadding: 5,
    hideLine:true
  })
  .addLabels({
    formatPunctuation:"addPercent"
  })
  .addLegend()
  .addHeader('This Is a Bar Chart')
```
# Switching to native D3.JS

D3-Sugar is extremely opinionated. Therefore there may be times when you need to use native D3.JS. For example D3-Sugar does not come with a way to add event handlers. In that case, you'll need to switch back to native D3.JS.

Doing so is pretty easy without having to reselect the root svg element or reselect bars other visuals that have already rendered. All native d3.JS elements are stored in the *.parts* object as you make them. 

Let's continue with the previous example by adding a click event to the bars. Let's say on click, we want them to change to orange. 

```
...

  barChart.parts.bars
  .on('click',(event)=>{
    event.target.fill = "orange
  })
```

