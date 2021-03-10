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

1. Instantiate the class VerticalBarChart. The single argument required for the constructor will be the selector for the roo HTML element. In this example, our root will have the ID if *bar-chart* _Note: No need to add an SVG tag in your HTML. That will be rendered for you._

```


```
