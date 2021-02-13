# d3-sugar
A D3 utility plugin designed to make visualizing with D3.JS faster


CCCDAtaViz is dependent on the Javascript library D3.JS version 6.

Tutorial


Setting It Up:

The first step in rendering a CCCDataViz chart is to decide where in your HTML you want it render. This is done by giving an ID to a root element. The visual will render between the tags of the element. See the visual below:

 
In the body of your page, add a <div> element and provide it a unique ID. For example: 

<div id="bar-chart"></div>

In the above example, we give a <div> element the id of "bar-chart". The id can be called anything, but keep in mind you'll have to remember the id name when declaring the graph. Also, if you have multiple graphs on the same page, you'll want the ID names to be practical and easy to follow. 

The next step is to add your <script> elements. 

Because CCCDataViz is dependent on D3.JS version 6, the order of your script tags will be: 

<script src="https://d3js.org/d3.v6.min.js"></script>
<script src="https://www.cccnewyork.org/wp-content/uploads/apps/library/CCCDataViz.js"></script>
<script></script>

Between the third <script> tags is where you'll begin to write your CCCDataViz code. 

Making Your First Data Visual:

Now that you have the setup done, you can begin writing code. 

The First step is pasting in your data. Right now, CCCDataViz can parse data only in JSON format. 

Click here to convert CSV to JSON. 

After pasting in the JSON data, assign it to variable by using the keyword "let" and then the variable name of your choice.

See the below example:

let exampleData = [
  {
    "category": "cat 1",
    "stat": 22
  },
  {
    "category": "cat 2",
    "stat": 34
  },
  {
    "category": "cat 3",
    "stat": 16
  },
  {
    "category": "cat 4",
    "stat": 46
  }
]


The second step, we declare the type of visual we want to render and then assign it to variable. See below example on how to do this. We will be making a vertical bar chart: 


<script src="https://d3js.org/d3.v6.min.js"></script>
<script src="https://www.cccnewyork.org/wp-content/uploads/apps/library/CCCDataViz.js"></script>
    <script>

let exampleData = [
  {
    "category": "cat 1",
    "stat": 22
  },
  {
    "category": "cat 2",
    "stat": 34
  },
  {
    "category": "cat 3",
    "stat": 16
  },
  {
    "category": "cat 4",
    "stat": 46
  }
]
let barChart = new CCCVerticalBarChart()


Now that you've declared the graph, you'll need to write in the parenthesis the dataset you want to pass to the visual and the id of the <div> element where you want the visual to render. Using our example dataset and the example ID we created above, your code should look like this:


let barChart = new CCCVerticalBarChart(exampleData, "#bar-chart")


    Note: Notice the ID is preceded by # and is in quotes. Both the quotes and the # are necessary. 

 Now that the visual is declared, the hard part is over. Note that at this point, your visual will not be rendering. What we did above is give you access to all the functionality that are available to the visual ‚ – in this case a vertical bar chart.

    The next step is to begin chaining the visual components together. Let's render the visual first in the below example: 

 let barChart = new CCCVerticalBarChart(exampleData,"#bar-chart")
  barChart.createChart(300,300)



Note: 'createChart()' requires two parameters to be written in its parenthesis. First value is the width of the visual. The second value is the height.

After saving and refreshing your page, you should see your vertical bar chart rendered. It should look something like this: 
 

If not, please check your console for errors. 

Note: For some visuals such as CCCLineChart, you will not see anything rendered just yet, but you should see the svg with the width and height you selected 

Now that we visual rendering, let's chain some other components to our visual: 'addXAxis()','addYAxis()', & 'addLabels()'

See the below example: 


```
let barChart = new CCCVerticalBarChart(exampleData,"#bar-chart")
  barChart.createChart(300,300)
  .addYAxis().addXAxis().addLabels()
```


Refresh and save, and you should see the x-axis and y-axis and labels atop the bars:
 

Now let’s add some colors using the addColors(). Your colorset should be an array of colors equal to the number of elements being visualized. See below for an example:

    
.addColors(['coral','pink','orang','lightblue'])


Your bar chart should now look like this:  

 

One more step before wrapping up this open tutorial. You'll notice the label numbers likely represent a percent, but because figures like “22%” are considered strings (or letters) and not numbers, percent symbols need to be added superficially.

By default, labels and figures in the axes are formatted separating thousands by commas. To add percents to both the labels and the y axis, we access these components’ options. (A list of available options in each component are in the list of visuals).

In the below example, we are changing the formatPunctuation setting from “commaSeparate” to “addPercent”:


.addYAxis({formatPunctuation:"addPercent"})

&&

.addLabels({formatPunctuation:"addPercent"})


Notice how accessing optional parameters requires curly brackets AND the name of the option you wish to manipulate.

Your bar chart should look like this:

 

Almost done. The last step is to add a header to the visual using the componenet 'addHeader()'. With addHeader, you'll write the header for the visual between its parenthesis. 

Your code will look like this: 

        
.addHeader("This is a bar chart")



Result:

 

One last note. You can also chain your visual components as multiple lines if it helps. See below: 


let barChart = new CCCVerticalBarChart(exampleData,"#bar-chart")
  barChart
  .createChart(300,300)
  .addYAxis({formatPunctuation:"addPercent"})
  .addXAxis().addLabels({formatPunctuation:"addPercent"})
  .addColors(['coral','pink','orange','lightblue'])
  .addHeader("This is a bar chart")


List of Visuals
Legend:

Red parameters are required.
Parameters between {} are optional.
Parameters between [] must be written as an array.

Vertical Bar Chart

Components and their options:


CCCVerticalBarChart(data,#root)
	Data: This is the dataset you are visualizing.
Root: The root HTML element where you want the visualization to render. Root must be proceeded by # and placed within quotes.


.createChart(width,height, {indicator, stat})
	Width: Width of the visual plus its parent element.
	Height: Height of the visual. This does not include the height of the parent element.
indicator: This is the data subset that will be referenced to make a visual’s scale band. By default, it will pull from a subset with the key name “indicator.”
stat: This is the data subset that will be referenced to make a visual’s linear scale and its labels. By default, it will from a subset with the key name “stat.”


.addXAxis({tickSizeOuter, tickSizeInner, tickPadding})
	tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.


.addYAxis({formatPunctuation, ticks,tickSizeOuter,tickSizeInner,tickValues,tickPadding})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis. 
ticks:  Numer of ticks in the axis
tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.


.addLabels({formatPunctuation,dx,dy,color,fontWeight,fontSize})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis.
dx: Transform the labels horizontally. Negative values move the element left. Positive values move the element right.
dy: Transform the labels vertically. Negative values move the element up. Positive values move the element down.
color: color fill. Default is black.
fontWeight: the weight of the font. Default is normal.
fontSize: size of the font. Default is initial.


.addColors([colorSet])
colorSet: an array of just one color or colors equal to the number of data elements being visualized. An array with just one color will fill all visual elements with that same color. Colors must be inside brackets, separated by commas, and surrounded by quotes.
	
.addHeader(headerText)
headerText: write header between quotes. Header will render above the visual. Quotes required.

.addLegend({legendLabel})
legendLabel: by default, the legend label will be the data indicator used to determine the scaleBand. The legend label can be populated by any subset of the dataset. Write the name of the subset in quotes instead. The Legend label can also be written in as an parameter by using an array. 


Horizontal Bar Chart

CCCHorizontalBarChart(data, root)
	Data: This is the dataset you are visualizing.
Root: The root HTML element where you want the visualization to render. Root must be proceeded by # and placed within quotes.

.createChart(width,height,{indicator, stat})
	Width: Width of the visual plus its parent element.
	Height: Height of the visual. This does not include the height of the parent element.
indicator: This is the data subset that will be referenced to make a visual’s scale band. By default, it will pull from a subset with the key name “indicator.”
stat: This is the data subset that will be referenced to make a visual’s linear scale and its labels. By default, it will from a subset with the key name “stat.”



.addXAxis({formatPunctuation, ticks,tickSizeOuter,tickSizeInner,tickValues,tickPadding})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis. 
ticks:  Numer of ticks in the axis
tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.


.addYAxis({tickSizeOuter,tickSizeInner,tickPadding})
tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.


.addLabels({formatPunctuation,dx,dy, color, fontWeight,fontSize })
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis.
dx: Transform the labels horizontally. Negative values move the element left. Positive values move the element right.
dy: Transform the labels vertically. Negative values move the element up. Positive values move the element down.
color: color fill. Default is black.
fontWeight: the weight of the font. Default is normal.
fontSize: size of the font. Default is initial.


.addColors([“colorSet”])
colorSet: an array of just one color or colors equal to the number of data elements being visualized. An array with just one color will fill all visual elements with that same color. Colors must be inside brackets, separated by commas, and surrounded by quotes.
	
.addHeader(headerText)
headerText: write header between quotes. Header will render above the visual. Quotes required.

.addLegend({legendLabel})
legendLabel: by default, the legend label will be the data indicator used to determine the scaleBand. The legend label can be populated by any subset of the dataset. Write the name of the subset in quotes instead. The Legend label can also be written in as an parameter by using an array. 


Pie Chart

CCCPieChart(data, #root)
	Data: This is the dataset you are visualizing.
Root: The root HTML element where you want the visualization to render. Root must be proceeded by # and placed within quotes.



.createChart(width, height,  {indicator, stat}))
	Width: Width of the visual plus its parent element.
	Height: Height of the visual. This does not include the height of the parent element.
indicator: This is the data subset that will be referenced to make a visual’s scale band. By default, it will pull from a subset with the key name “indicator.”
stat: This is the data subset that will be referenced to make a visual’s linear scale and its labels. By default, it will from a subset with the key name “stat.”


.addLabels({formatPunctuation})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis.

.addColors([colorSet])
colorSet: an array of just one color or colors equal to the number of data elements being visualized. An array with just one color will fill all visual elements with that same color. Colors must be inside brackets, separated by commas, and surrounded by quotes.

.addLabels({formatPunctuation, dx, dy, color, fontWeight, fontSize})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis.
dx: Transform the labels horizontally. Negative values move the element left. Positive values move the element right.
dy: Transform the labels vertically. Negative values move the element up. Positive values move the element down.
color: color fill. Default is black.
fontWeight: the weight of the font. Default is normal.
fontSize: size of the font. Default is initial.




Line Chart

CCCLineChart(data, root)
	Data: This is the dataset you are visualizing.
Root: The root HTML element where you want the visualization to render. Root must be proceeded by # and placed within quotes.


.createChart(width,height, ,{indicator}))
	Width: Width of the visual plus its parent element.
	Height: Height of the visual. This does not include the height of the parent element.
indicator: This is the data subset that will be referenced to make a visual’s scale band. By default, it will pull from a subset with the key name “indicator.”

.addLine(stat,lineColor)
	stat: this is the stat the line will visualize
	lineColor: this is the color of the line. Default color is black.


.addDots(stat,dotColor)
	stat: this is the stat the dots will visualize
	lineColor: this is the color of the line. Default color is black.


.addLabels(stat,{formatPunctuation,dx,dy, color, fontWeight, fontSize})
stat: indicator from the data you want to apply labels to.
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis.
dx: Transform the labels horizontally. Negative values move the element left. Positive values move the element right.
dy: Transform the labels vertically. sNegative values move the element up. Positive values move the element down.
color: color fill. Default is black.
fontWeight: the weight of the font. Default is normal.
fontSize: size of the font. Default is initial.


.addLegend({legendLabel})
legendLabel: by default, the legend label will be the data indicator used to determine the scaleBand. The legend label can be populated by any subset of the dataset. Write the name of the subset in quotes instead. The Legend label can also be written in as an parameter by using an array. 


.addXAxis({tickSizeOuter, tickSizeInner, tickPadding})
	tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.


.addYAxis({formatPunctuation, ticks,tickSizeOuter,tickSizeInner,tickValues,tickPadding})
formatPunctuation: Optional argument. Default setting is “commaSeparate”. To add percent symbols to the yAxis labels, type “addPercent” between parenthesis. 
ticks:  Number of ticks in the axis
tickSizeOuter: the length of the outer axis ticks, Default is 0.
	tickSizeInner:  the length of the axis ticks. Default is 0.
	tickPadding: the distance between the axis label and the tick. Default is 3.

