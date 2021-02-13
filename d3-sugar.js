class Core {
    constructor(selector) {
      this.selector = selector;
      this.height = 0;
      this.width = 0;
      this.margin = 50;
      this.legend = [];
      this.domain = [];
      this.padding = "";
      this.wrapperWidth = 0;
    }
    //getters
    get root() {
      return d3.select(this.selector);
    }
  
    get setParentDimension() {
      return this.root
        .style("width", this.width + this.margin + "px")
        .style("margin-top", "50px");
    }
  
    //number and  text formatting
  
    get commaFormatter() {
      return d3.format(",");
    }
    get percentFormatter() {
      return d3.format(",.1%");
    }
  
    get localMin() {
      return d3.min(this.data, (d) => d[`${this.stat}`]);
    }
  
    get localMax() {
      return d3.max(this.data, (d) => d[`${this.stat}`]);
    }
  
  
    //axis formatting
    get hideLineY() {
      return d3
        .selectAll(`${this.selector} svg .y-axis .domain`)
        .style("visibility", "hidden");
    }
  
    get hideLineX() {
      return d3
        .select(`${this.selector} svg .x-axis .domain`)
        .style("visibility", "hidden");
    }
  
    //errors
    get createChartError() {
      return console.error(
        `createChart requires two parameters: width and height`
      );
    }
  
    get addLegendError() {
      return console.error(
        `No color detected. "addColor" must be added to the visual chain before "addLegend"`
      );
    }
  
    get formatPunctuationError() {
      return console.error(
        `CCCDataViz has two options for formatting number punctuation: "addPercent" or "commaSeparate". "commaSeparate" is the default setting.`
      );
    }
  
    get addColorsError() {
      return console.error(
        "addColors requires the colors be an array of colors. Numbers must  be either one or equal to the data being visualized"
      );
    }
  
    get addColorError() {
      return console.error("Color must be a string");
    }
  
    get axisLabelsError() {
      return console.error("axisLabels must be an array");
    }
  
    get verticalAxisError() {
      return console.error(
        "Vertical axis orientation only accepts two paramters:'left' and 'right'."
      );
    }
  
    //scales
    get flatten() {
      return this.data.forEach((obj) => {
        Object.values(obj).map((el) => {
          if (typeof el !== "string") {
            this.domain.push(el);
          }
        });
      });
    }
  
    get max() {
      return Math.max(...this.domain);
    }
  
    get min() {
      return Math.min(...this.domain);
    }
  
    get lineFunc() {
      return d3
        .line()
        .x((d) => {
          return (
            this.scaleBandHorizontal(d[`${this.indicator}`]) +
            this.scaleBandHorizontal.bandwidth() / 2
          );
        })
        .y((d) => {
          return this.scaleLinearVertical(d[this.stat]);
        })
        .curve(d3.curveLinear);
    }
  
    get scaleBandHorizontal() {
      return d3
        .scaleBand()
        .range([0, this.width])
        .domain(
          this.data.map((d) => {
            return d[`${this.indicator}`];
          })
        )
        .padding(this.padding);
    }
  
    get scaleBandVertical() {
      return d3
        .scaleBand()
        .range([0, this.height])
        .domain(
          this.data.map((d) => {
            return d[`${this.indicator}`];
          })
        )
        .padding(this.padding);
    }
  
    get scaleLinearHorizontal() {
      return d3
        .scaleLinear()
        .range([0, this.width])
        .domain(this.min >= 0 ? [0, this.max + 5] : [this.min - 5, this.max + 5]);
    }
  
    get scaleLinearVertical() {
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain(this.min >= 0 ? [0, this.max + 5] : [this.min - 5, this.max + 5]);
    }
  
    //methods
    addHeader(headerText) {
      this.root.insert("h3", "svg");
      d3.select(`${this.selector} h3`)
        .style("text-align", "center")
        .style("width", this.wrapperWidth + this.margin * 2 + "px")
        .text(() => {
          if (headerText) {
            return headerText;
          } else {
            return console.error(
              `${this.addHeader.name} requires one argument: headerText. headerText should be written as a string`
            );
          }
        });
      return this;
    }
  
    addLegend({ legendLabel } = {}) {
      this.root
        .append("div")
        .attr("class", "legend")
        .style("margin", "auto")
        .style("display", "flex")
        .style("width", this.wrapperWidth + this.margin * 2 + "px")
        .style("justify-content", "space-evenly")
        .style("align-items", "flex-start")
        .selectAll("div")
        .data(this.legend)
        .enter()
        .append("div")
        .style("display", "flex")
        .style("align-items", "baseline")
        .html(`<i></i><span></span>`);
  
      d3.selectAll(`${this.selector} .legend i`)
        .attr("class", "legend-icon")
        .style("display", "inline-block")
        .style("margin-right", "5px")
        .style("width", "15px")
        .style("height", "15px")
        .data(this.data)
        .style("background-color", (d, i) => this.legend[i].color);
  
      d3.selectAll(`${this.selector} .legend span`)
        .attr("class", "legend-label")
        .data(this.data)
        .text((d, i) => {
          if (!legendLabel) {
            return this.legend[i].indicator;
          } else if (Array.isArray(legendLabel)) {
            return legendLabel[i];
          } else {
            return d[legendLabel];
          }
        });
      return this;
    }
  }
  
  class CCCVerticalBarChart extends Core {
    constructor(data, selector, domain) {
      super(selector, domain);
      this.data = data;
      this.indicator = "";
      this.stat = "";
    }
  
    //methods
    createChart(w, h, { indicator = "indicator", stat = "stat" } = {}) {
      this.indicator = indicator;
      this.stat = stat;
      for (let i = 0; i < this.data.length; i++) {
        this.legend.push({});
        this.legend[i].indicator = this.data[i][`${this.indicator}`];
      }
      this.width = w;
      this.wrapperWidth = w;
      this.height = h;
      if (w && h) {
        this.flatten;
        this.setParentDimension;
        this.root
          .append("svg")
          .attr("width", this.width + this.margin * 2)
          .attr("height", this.height + this.margin);
        return this;
      } else {
        this.createChartError;
      }
    }
  
    addBars({ padding = 0.2, opacity = 1 } = {}) {
      this.padding = padding;
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "bars")
        .selectAll("rect")
        .data(this.data)
        .enter()
        .append("rect")
        .attr("height", ()=> { return this.height - this.scaleLinearVertical(0); }) // always equal to 0
        .attr("y", ()=> { return this.scaleLinearVertical(0); })
        .attr("x", (d) => this.scaleBandHorizontal(d[`${this.indicator}`]))
        .attr("width", this.scaleBandHorizontal.bandwidth())
        .attr("transform", `translate(${this.margin},${this.margin / 2})`)
        .style("opacity", opacity)
        .transition()
        .duration(300)
        .attr("y", (d) => {
          if (this.min >= 0) {
            return this.scaleLinearVertical(d[`${this.stat}`]);
          } else {
            if (d[`${this.stat}`] < 0) {
              return this.scaleLinearVertical(0);
            }
            return this.scaleLinearVertical(d[`${this.stat}`]);
          }
        })
        .attr("height", (d) => {
          if (this.min >= 0) {
            return this.height - this.scaleLinearVertical(d[`${this.stat}`]);
          } else {
            return (
              this.scaleLinearVertical(0) -
              this.scaleLinearVertical(Math.abs(d[`${this.stat}`]))
            );
          }
        });
  
      if (this.min < 0) {
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", "dividing-line")
          .append("line")
          .attr("x1", this.margin)
          .attr("x2", this.margin + this.width)
          .attr("y1", this.scaleLinearVertical(0) + this.margin / 2)
          .attr("y2", this.scaleLinearVertical(0) + this.margin / 2)
          .style("stroke", "lightgray")
          .style("stroke-width", "1px");
      }
      return this;
    }
  
    addXAxis({
      tickSizeOuter = 0,
      tickSizeInner = null,
      tickPadding = 3,
      hideLine = false,
      axisLabels,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + "  svg")
          .append("g")
          .attr("class", "x-axis")
          .attr(
            "transform",
            `translate(${this.margin},${this.height + this.margin / 2})`
          )
          .call(
            d3
              .axisBottom(this.scaleBandHorizontal)
              .tickSizeOuter(tickSizeOuter)
              .tickSizeInner(tickSizeInner)
              .tickPadding(tickPadding)
          );
        if (hideLine) {
          this.hideLineX;
        }
        if (Array.isArray(axisLabels)) {
          d3.selectAll(`${this.selector} svg .x-axis .tick text`).html(
            (d, i) => axisLabels[i]
          );
        } else if (axisLabels) {
          this.axisLabelsError;
        }
        return this;
      } else {
        console.error(
          `${this.addXAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addYAxis({
      formatPunctuation = "commaSeparate",
      ticks = 10,
      tickSizeOuter = 0,
      tickSizeInner = null,
      tickValues = null,
      tickPadding = 3,
      hideLine = false,
      axisLabel,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${this.margin},${this.margin / 2})`)
          .call(
            d3
              .axisLeft(this.scaleLinearVertical)
              .tickFormat((d) => {
                if (formatPunctuation === "addPercent") {
                  return d + "%";
                } else if (
                  formatPunctuation === "commaSeparate" ||
                  formatPunctuation === false
                ) {
                  return this.commaFormatter(d);
                } else this.formatPunctuationError;
              })
              .ticks(ticks)
              .tickSizeOuter(tickSizeOuter)
              .tickSizeInner(tickSizeInner)
              .tickValues(tickValues)
              .tickPadding(tickPadding)
          );
        d3.selectAll(`${this.selector} svg .y-axis .tick line`).style(
          "stroke",
          "gainsboro"
        );
        if (hideLine) {
          this.hideLineY;
        }
        if (Array.isArray(axisLabel)) {
          d3.selectAll(`${this.selector} svg .y-axis .tick text`).html(
            (d, i) => axisLabel[i]
          );
        } else if (axisLabel) {
          console.error("Axislabel must be an array");
        }
        return this;
      } else {
        console.error(
          `${this.addYAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addLabels({
      formatPunctuation = "commaSeparate",
      dx = 0,
      dy = 0,
      color = "black",
      fontWeight = "normal",
      fontSize = null,
      show = false,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", "labels")
          .selectAll("text")
          .data(this.data)
          .enter()
          .append("text")
          .text((d) => {
  
            if (Array.isArray(show)) {
              let valuesArray = Array.from(this.data.map(obj=>obj[`${this.stat}`]))
              if(show.includes('first')){
                if(d[`${this.stat}`]===valuesArray[0]){
                  return d[`${this.stat}`]
                }
              }
              if (show.includes('last')){
                if(d[`${this.stat}`]===valuesArray[valuesArray.length-1]){
                  return(d[`${this.stat}`])
                }
              }
  
              if (show.includes("max")) {
                if (d[`${this.stat}`] === this.localMax) {
                  return d[`${this.stat}`];
                }
              } if (show.includes("min")) {
                if (d[`${this.stat}`] === this.localMin) {
                  return d[`${this.stat}`];
                }
              } 
            } else if (!show) {
              return d[`${this.stat}`];
            } else {
              return console.error(
                "'show' must be an array. The array's elements should be 'max' and/or 'min'"
              );
            }
          })
  
          .attr("y", (d) => this.scaleLinearVertical(d[`${this.stat}`]) + 20)
          .attr("dy", dy)
          .attr(
            "x",
            (d) =>
              this.scaleBandHorizontal(d[`${this.indicator}`]) +
              this.scaleBandHorizontal.bandwidth() / 2
          )
          .attr("dx", dx)
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${this.margin},0)`)
          .attr("fill", color)
          .style("font-family", "sans-serif")
          .style("font-weight", fontWeight)
          .style("font-size", fontSize);
  
        if (formatPunctuation) {
          let labels = document.querySelectorAll(
            `${this.selector} svg .labels text`
          );
          for (let label of labels) {
            if (label.textContent) {
              if (formatPunctuation === "addPercent") {
                label.textContent = label.textContent + "%";
              }
              else if (
                formatPunctuation === "commaSeparate" ||
                formatPunctuation === false
              ) {
                label.textContent = this.commaFormatter(label.textContent);
              } else {
                this.formatPunctuationError;
              }
            }
          }
        }
  
        return this;
      } else {
        console.error(
          `${this.addLabels.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addColors(colorSet) {
      for (let i = 0; i < colorSet.length; i++) {
        this.legend[i].color = colorSet[i];
      }
      d3.selectAll(`${this.selector} svg .bars rect`)
        .data(this.data)
        .attr("fill", (d, i) => {
          if (Array.isArray(colorSet)) {
            if (colorSet.length === 1) {
              return colorSet[0];
            } else {
              return this.legend[i].color;
            }
          } else {
            this.addColorsError;
          }
        });
  
      return this;
    }
  }
  
  class CCCHorizontalBarChart extends Core {
    constructor(data, selector) {
      super(selector);
      this.data = data;
      this.indicator = "";
      this.stat = "";
    }
  
    //methods
    createChart(w, h, { indicator = "indicator", stat = "stat" } = {}) {
      this.indicator = indicator;
      this.stat = stat;
      for (let i = 0; i < this.data.length; i++) {
        this.legend.push({});
        this.legend[i].indicator = this.data[i][`${this.indicator}`];
      }
      this.width = w;
      this.wrapperWidth = w
      this.height = h;
      if (w && h) {
        this.flatten;
        this.setParentDimension;
        this.root
          .append("svg")
          .attr("width", this.width + this.margin * 2)
          .attr("height", this.height + this.margin)
          .append("g")
          .attr("class", "bars");
        return this;
      } else {
        this.createChartError;
      }
    }
  
    addBars({ padding = 0.2, opacity = 1 } = {}) {
      this.padding = padding;
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "bars")
        .append("g")
        .selectAll("rect")
        .data(this.data)
        .enter()
        .append("rect")
        .attr("x", ()=> { return this.scaleLinearHorizontal(0); })
        .attr("y", (d) => this.scaleBandVertical(d[`${this.indicator}`]))
        .attr("transform", `translate(0,${this.margin / 2})`)
        .style("opacity", opacity)
        .attr("height", (d) => this.scaleBandVertical.bandwidth())
        .transition()
        .duration(300)
        .attr("x", (d) => {
          if (this.min >= 0) {
            return this.margin;
          } else {
            if (d[`${this.stat}`] >= 0) {
              return this.scaleLinearHorizontal(0) + this.margin;
            } else {
              return this.margin + this.scaleLinearHorizontal(d[`${this.stat}`]);
            }
          }
        })
        .attr("width", (d) => {
          if (this.min >= 0) {
            return this.scaleLinearHorizontal(d[`${this.stat}`]);
          } else {
            return Math.abs(
              this.scaleLinearHorizontal(d[`${this.stat}`]) -
                this.scaleLinearHorizontal(0)
            );
          }
        });
  
      if (this.min < 0) {
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", "dividing-line")
          .append("line")
          .attr("y1", 0)
          .attr("y2", this.height + this.margin / 2)
          .attr("x1", this.scaleLinearHorizontal(0) + this.margin)
          .attr("x2", this.scaleLinearHorizontal(0) + this.margin)
          .style("stroke", "lightgray")
          .style("stroke-width", "1px");
      }
      return this;
    }
  
    addYAxis({
      tickSizeOuter = 0,
      tickSizeInner = 3,
      tickPadding = 3,
      hideLine = false,
      axisLabels,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${this.margin},${this.margin / 2})`)
          .call(
            d3
              .axisLeft(this.scaleBandVertical)
              .tickSizeOuter(tickSizeOuter)
              .tickSizeInner(tickSizeInner)
              .tickPadding(tickPadding)
          );
  
        if (hideLine) {
          this.hideLineY;
        }
        if (Array.isArray(axisLabels)) {
          d3.selectAll(`${this.selector} svg .y-axis .tick text`).html(
            (d, i) => axisLabels[i]
          );
        } else if (axisLabels) {
          this.axisLabelsError;
        }
        return this;
      } else {
        console.error(
          `${this.addYAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addXAxis({
      formatPunctuation = "commaSeparate",
      ticks = 10,
      tickSizeOuter = 0,
      tickSizeInner = 3,
      tickValues = null,
      tickPadding = 10,
      hideLine = false,
      axisLabels,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + "  svg")
          .append("g")
          .attr("class", "x-axis")
          .attr(
            "transform",
            `translate(${this.margin},${this.height + this.margin / 2})`
          )
          .call(
            d3
              .axisBottom(this.scaleLinearHorizontal)
              .tickFormat((d) => {
                if (formatPunctuation === "addPercent") {
                  return d + "%";
                } else if (
                  formatPunctuation === "commaSeparate" ||
                  formatPunctuation === false
                ) {
                  return this.commaFormatter(d);
                } else this.formatPunctuationError;
              })
              .ticks(ticks)
              .tickSizeOuter(tickSizeOuter)
              .tickSizeInner(tickSizeInner)
              .tickValues(tickValues)
              .tickPadding(tickPadding)
          );
        d3.selectAll(`${this.selector} svg .x-axis .tick line`).style(
          "stroke",
          "gainsboro"
        );
        if (hideLine) {
          this.hideLineX;
        }
        if (Array.isArray(axisLabels)) {
          d3.selectAll(`${this.selector} svg .x-axis .tick text`).html(
            (d, i) => axisLabels[i]
          );
        } else if (axisLabels) {
          this.axisLabelsError;
        }
        return this;
      } else {
        console.error(
          `${this.addXAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
    addLabels({
      formatPunctuation = "commaSeparate",
      dx = 0,
      dy = 0,
      color = "black",
      fontWeight = "normal",
      fontSize = null,
      show = false
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", "labels")
          .selectAll("text")
          .data(this.data)
          .enter()
          .append("text")
          .text((d) => {
            if (Array.isArray(show)) {
              let valuesArray = Array.from(this.data.map(obj=>obj[`${this.stat}`]))
              if(show.includes('first')){
                if(d[`${this.stat}`]===valuesArray[0]){
                  return d[`${this.stat}`]
                }
              }
              if (show.includes('last')){
                if(d[`${this.stat}`]===valuesArray[valuesArray.length-1]){
                  return(d[`${this.stat}`])
                }
              }
  
              if (show.includes("max")) {
                if (d[`${this.stat}`] === this.localMax) {
                  return d[`${this.stat}`];
                }
              } if (show.includes("min")) {
                if (d[`${this.stat}`] === this.localMin) {
                  return d[`${this.stat}`];
                }
              } 
            } else if (!show) {
              return d[`${this.stat}`];
            } else {
              return console.error(
                "'show' must be an array. The array's elements should be 'max' and/or 'min'"
              );
            }
          })
          .attr("x", (d) => this.scaleLinearHorizontal(d[`${this.stat}`]) + 20)
          .attr("dx", dx)
          .attr(
            "y",
            (d) =>
              this.scaleBandVertical(d[`${this.indicator}`]) +
              this.scaleBandVertical.bandwidth() / 2
          )
          .attr("dy", dy)
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${this.margin},${this.margin / 2})`)
          .attr("fill", color)
          .style("font-family", "sans-serif")
          .style("font-weight", fontWeight)
          .style("font-size", fontSize);
  
          if (formatPunctuation) {
            let labels = document.querySelectorAll(
              `${this.selector} svg .labels text`
            );
            for (let label of labels) {
              if (label.textContent) {
                if (formatPunctuation === "addPercent") {
                  label.textContent = label.textContent + "%";
                }
                else if (
                  formatPunctuation === "commaSeparate" ||
                  formatPunctuation === false
                ) {
                  label.textContent = this.commaFormatter(label.textContent);
                } else {
                  this.formatPunctuationError;
                }
              }
            }
          }
  
          
        return this;
      } else {
        console.error(
          `${this.addLabels.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addColors(colorSet) {
      for (let i = 0; i < colorSet.length; i++) {
        this.legend[i].color = colorSet[i];
      }
      d3.selectAll(`${this.selector} svg .bars rect`)
        .data(this.data)
        .attr("fill", (d, i) => {
          if (Array.isArray(colorSet)) {
            if (colorSet.length === 1) {
              return colorSet[0];
            } else {
              return this.legend[i].color;
            }
          } else {
            this.addColorsError;
          }
        });
  
      return this;
    }
  }
  
  class CCCPieChart extends Core {
    constructor(data, selector, colors) {
      super(selector, colors);
      this.data = data;
      this.indicator = "";
      this.stat = "";
    }
  
    //getters
    get pie() {
      return d3.pie().value((d) => d.stat)(this.data);
    }
  
    //methods
    get arc() {
      return d3
        .arc()
        .innerRadius(10)
        .outerRadius(this.width / 2)
        .padAngle(0.05)
        .padRadius(50);
    }
  
    createChart(w, h, { indicator = "indicator", stat = "stat" } = {}) {
      this.indicator = indicator;
      this.stat = stat;
      for (let i = 0; i < this.data.length; i++) {
        this.legend.push({});
        this.legend[i].indicator = this.data[i][`${this.indicator}`];
      }
      this.height = h;
      this.width = w;
      this.wrapperWidth = w;
      if (w && h) {
        this.flatten;
        this.setParentDimension;
        this.root
          .append("svg")
          .attr("width", this.width + this.margin * 2)
          .attr("height", this.height + this.margin * 2)
          .append("g")
          .attr("class", "pie-chart")
          .attr(
            "transform",
            `translate(${this.width / 2 + this.margin},${
              this.height / 2 + this.margin
            })`
          )
          .selectAll("path")
          .data(this.pie)
          .enter()
          .append("path")
          .attr("stroke", "gray")
          .attr("stroke-width", "lightgray")
          .attr("d", this.arc);
        return this;
      } else {
        this.createChartError;
      }
    }
  
    addLabels({
      formatPunctuation = "commaSeparate",
      dx = 0,
      dy = 0,
      color = "black",
      fontWeight = "normal",
      fontSize = null,
      show=false
    } = {}) {
      let vm = this;
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "pie-chart-labels")
        .attr(
          "transform",
          `translate(${this.width / 2 + this.margin},${
            this.height / 2 + this.margin
          })`
        )
        .selectAll("text")
        .data(this.pie)
        .enter()
        .append("text")
        .each(function (d) {
          const center = vm.arc.centroid(d);
          d3.select(this).attr("x", center[0]).attr("y", center[1]);
        })
        .attr("dx", dx)
        .attr("dy", dy)
        .attr("text-anchor", "middle")
        .text((d) => {
          if (Array.isArray(show)) {
            let valuesArray = Array.from(this.data.map(obj=>obj[`${this.stat}`]))
            if(show.includes('first')){
              if(d.value===valuesArray[0]){
                return d.value
              }
            }
            if (show.includes('last')){
              if(d.value===valuesArray[valuesArray.length-1]){
                return(d.value)
              }
            }
  
            if (show.includes("max")) {
              if (d.value === this.localMax) {
                return d.value;
              }
            } if (show.includes("min")) {
              if (d.value === this.localMin) {
                return d.value;
              }
            } 
          } else if (!show) {
            return d.value;
          } else {
            return console.error(
              "'show' must be an array. The array's elements should be 'max' and/or 'min'"
            );
          }
  
        })
        .attr("fill", color)
        .style("font-family", "sans-serif")
        .style("font-weight", fontWeight)
        .style("font-size", fontSize);
  
        if (formatPunctuation) {
          let labels = document.querySelectorAll(
            `${this.selector} svg .pie-chart-labels text`
          );
          for (let label of labels) {
            if (label.textContent) {
              if (formatPunctuation === "addPercent") {
                label.textContent = label.textContent + "%";
              }
              else if (
                formatPunctuation === "commaSeparate" ||
                formatPunctuation === false
              ) {
                label.textContent = this.commaFormatter(label.textContent);
              } else {
                this.formatPunctuationError;
              }
            }
          }
        }
  
      return this;
    }
  
    addColors(colorSet) {
      for (let i = 0; i < colorSet.length; i++) {
        this.legend[i].color = colorSet[i];
      }
      d3.selectAll(`${this.selector} svg .pie-chart path`)
        .data(this.data)
        .attr("fill", (d, i) => {
          if (Array.isArray(colorSet)) {
            if (colorSet.length === 1) {
              return colorSet[0];
            } else {
              return this.legend[i].color;
            }
          } else {
            this.addColorsError;
          }
        });
  
      return this;
    }
  }
  
  class CCCLineChart extends Core {
    constructor(data, selector, domain) {
      super(selector, domain);
      this.data = data;
      this.stat = "";
      this.indicator = "";
      this.lineIteration = 0;
      this.dotIteration = 0;
      this.labelIteration = 0;
    }
  
    //methods
    createChart(w, h, { indicator = "indicator", stat = "stat" } = {}) {
      this.indicator = indicator;
      this.stat = stat;
      this.width = w;
      this.wrapperWidth = w
      this.height = h;
      if (w && h) {
        this.flatten;
        this.setParentDimension;
        this.root
          .append("svg")
          .attr("width", this.width + this.margin)
          .attr("height", this.height + this.margin + this.margin)
          .append("g");
        return this;
      } else {
        this.createChartError;
      }
    }
  
    addXAxis({
      tickSizeOuter = 0,
      tickSizeInner = null,
      tickPadding = 3,
      hideLine = false,
      axisLabels,
    } = {}) {
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "x-axis")
        .attr(
          "transform",
          `translate(${this.margin},${this.height + this.margin})`
        )
        .call(
          d3
            .axisBottom(this.scaleBandHorizontal)
            .tickSizeOuter(tickSizeOuter)
            .tickSizeInner(tickSizeInner)
            .tickPadding(tickPadding)
        );
      if (hideLine) {
        this.hideLineX;
      }
      if (Array.isArray(axisLabels)) {
        d3.selectAll(`${this.selector} svg .x-axis .tick text`).html(
          (d, i) => axisLabels[i]
        );
      } else if (axisLabels) {
        this.axisLabelsError;
      }
      return this;
    }
  
    addYAxis({
      formatPunctuation = "commaSeparate",
      ticks = 10,
      tickSizeOuter = 0,
      tickSizeInner = 3,
      tickValues = null,
      tickPadding = 10,
      hideLine = false,
      axisLabels,
    } = {}) {
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${this.margin},${this.margin})`)
        .call(
          d3
            .axisLeft(this.scaleLinearVertical)
            .tickFormat((d) => {
              if (formatPunctuation === "addPercent") {
                return d + "%";
              } else if (
                formatPunctuation === "commaSeparate" ||
                formatPunctuation === false
              ) {
                return this.commaFormatter(d);
              } else this.formatPunctuationError;
            })
            .ticks(ticks)
            .tickSizeOuter(tickSizeOuter)
            .tickSizeInner(tickSizeInner)
            .tickValues(tickValues)
            .tickPadding(tickPadding)
        );
        d3.selectAll(`${this.selector} svg .y-axis .tick line`).style(
          "stroke",
          "gainsboro"
        );
      if (hideLine) {
        this.hideLineY;
      }
      if (Array.isArray(axisLabels)) {
        d3.selectAll(`${this.selector} svg .y-axis .tick text`).html(
          (d, i) => axisLabels[i]
        );
      } else if (axisLabels) {
        this.axisLabelsError;
      }
      return this;
    }
  
    addLine(s, color = "black") {
      this.stat = s;
      this.lineIteration++;
      let obj = {};
      obj.color = color;
      obj.indicator = s;
      this.legend.push(obj);
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", `line-${this.lineIteration}`)
        .append("path")
        .attr("d", this.lineFunc(this.data))
        .attr("transform", `translate(${this.margin},${this.margin})`)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("fill", "none");
  
      let line = d3.select(`${this.selector} svg .line-${this.lineIteration} path`)
      let length = line._groups[0][0].getTotalLength()
      line.attr('stroke-dasharray',length)
      .attr('stroke-dashoffset',length)
      .transition()
      .duration(500)
      .attr('stroke-dashoffset',0)
  
  
      return this;
    }
  
    addLabels(
      {
        stat,
        formatPunctuation = "commaSeparate",
        dx = 0,
        dy = 0,
        color = "black",
        fontWeight = "normal",
        fontSize = null,
        show=false
      } = {}
    ) {
      this.labelIteration++;
      !stat ? stat = this.stat : this.stat = stat;
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", `labels-${this.labelIteration}`)
          .selectAll("text")
          .data(this.data)
          .enter()
          .append("text")
          .text((d) => {
            if (Array.isArray(show)) {
              let valuesArray = Array.from(this.data.map(obj=>obj[`${this.stat}`]))
              if(show.includes('first')){
                if(d[`${this.stat}`]===valuesArray[0]){
                  return d[`${this.stat}`]
                }
              }
              if (show.includes('last')){
                if(d[`${this.stat}`]===valuesArray[valuesArray.length-1]){
                  return(d[`${this.stat}`])
                }
              }
  
              if (show.includes("max")) {
                if (d[`${this.stat}`] === this.localMax) {
                  return d[`${this.stat}`];
                }
              } if (show.includes("min")) {
                if (d[`${this.stat}`] === this.localMin) {
                  return d[`${this.stat}`];
                }
              } 
            } else if (!show) {
              return d[`${this.stat}`];
            } else {
              return console.error(
                "'show' must be an array. The array's elements should be 'max' and/or 'min'"
              );
            }
          })
          .attr("y", (d) => this.scaleLinearVertical(d[this.stat]) + 20)
          .attr("dy", dy)
          .attr(
            "x",
            (d) =>
              this.scaleBandHorizontal(d[`${this.indicator}`]) +
              this.scaleBandHorizontal.bandwidth() / 2
          )
          .attr("dx", dx)
          .attr("text-anchor", "middle")
          .attr("fill", color)
          .attr("transform", `translate(${this.margin},${this.margin / 2})`)
          .style("font-family", "sans-serif")
          .style("font-weight", fontWeight)
          .style("font-size", fontSize);
  
          if (formatPunctuation) {
            let labels = document.querySelectorAll(
              `${this.selector} svg .labels-${this.labelIteration} text`
            );
            for (let label of labels) {
              if (label.textContent) {
                if (formatPunctuation === "addPercent") {
                  label.textContent = label.textContent + "%";
                }
                else if (
                  formatPunctuation === "commaSeparate" ||
                  formatPunctuation === false
                ) {
                  label.textContent = this.commaFormatter(label.textContent);
                } else {
                  this.formatPunctuationError;
                }
              }
            }
          }
  
        return this;
      } else {
        console.error(
          `${this.addLabels.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addDots(color = "black", {
      stat,
      r = 5 } = {}) {
      this.dotIteration++;
      !stat ? stat = this.stat : this.stat = stat;
      if (this.width !== 0 || this.height !== 0) {
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", `dots-${this.dotIteration}`)
          .selectAll("circle")
          .data(this.data)
          .enter()
          .append("circle")
          .attr("cx", (d) => {
            return (
              this.scaleBandHorizontal(d[`${this.indicator}`]) +
              this.scaleBandHorizontal.bandwidth() / 2
            );
          })
          .attr("cy", (d) => {
            return this.scaleLinearVertical(d[this.stat]);
          })
          .attr("r", r)
          .attr("transform", `translate(${this.margin},${this.margin})`)
          .attr("fill", color);
        return this;
      } else {
        return console.error(
          `${this.addDots.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  }
  
  class CCCCombinationChart extends Core {
    constructor(data, selector, domain) {
      super(selector, domain);
      this.data = data;
      this.indicator = "";
      this.stat = "";
      this.lineIteration = 0;
      this.dotIteration = 0;
      this.labelIteration = 0;
    }
  
    //methods
    createChart(w, h, { indicator = "indicator", stat = "stat" } = {}) {
      this.indicator = indicator;
      this.stat = stat;
      this.width = w;
      this.wrapperWidth = w;
      this.height = h;
      if (w && h) {
        this.flatten;
        this.setParentDimension;
        this.root
          .append("svg")
          .attr("width", this.width + this.margin * 2)
          .attr("height", this.height + this.margin);
        return this;
      } else {
        this.createChartError;
      }
    }
  
    addBars(
      stat,
      color,
      {
        data,
        width,
        indicator,
        padding = 0.2,
        opacity = 1,
        translateX = 0,
        translateY = 0,
        spreadX = 1,
      } = {}
    ) {
      this.padding = padding;
      !data ? (data = this.data) : (this.data = data);
      !width ? (width = this.width) : (this.width = width);
      !stat ? (stat = this.stat) : (this.stat = stat);
      !indicator ? (indicator = this.indicator) : (this.indicator = indicator);
  
      if (color) {
        let obj = {};
        obj.color = color;
        obj.indicator = stat;
        this.legend.push(obj);
      } else {
        return console.error("color is a required parameter");
      }
  
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "bars")
        .attr("width", this.width)
        .selectAll("rect")
        .data(this.data)
        .enter()
        .append("rect")
        .attr(
          "x",
          (d) => this.scaleBandHorizontal(d[`${this.indicator}`]) * spreadX
        )
        .attr("width", this.scaleBandHorizontal.bandwidth())
        .attr(
          "transform",
          `translate(${this.margin + translateX},${this.margin / 2 + translateY})`
        )
        .style("opacity", opacity)
        .attr("fill", (d, i) => {
          if (typeof color === "string") {
            return color;
          } else {
            this.addColorError;
          }
        })
        .attr("height", ()=> { return this.height - this.scaleLinearVertical(0); }) // always equal to 0
        .attr("y", ()=> { return this.scaleLinearVertical(0); })
        .transition()
        .duration(300)
        .attr("y", (d) => {
          if (this.min >= 0) {
            return this.scaleLinearVertical(d[`${this.stat}`]);
          } else {
            if (d[`${this.stat}`] < 0) {
              return this.scaleLinearVertical(0);
            }
            return this.scaleLinearVertical(d[`${this.stat}`]);
          }
        })
        .attr("height", (d) => {
          if (this.min >= 0) {
            return this.height - this.scaleLinearVertical(d[`${this.stat}`]);
          } else {
            return (
              this.scaleLinearVertical(0) -
              this.scaleLinearVertical(Math.abs(d[`${this.stat}`]))
            );
          }
        });
  
      d3.select(`${this.selector} svg g`);
  
      if (this.min < 0) {
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", "dividing-line")
          .append("line")
          .attr("x1", this.margin)
          .attr("x2", this.margin + this.wrapperWidth)
          .attr("y1", this.scaleLinearVertical(0) + this.margin / 2)
          .attr("y2", this.scaleLinearVertical(0) + this.margin / 2)
          .style("stroke", "lightgray")
          .style("stroke-width", "1px");
      }
      return this;
    }
  
    addLine(
      stat,
      color = "black",
      { data, width, indicator, translateX = 0, translateY = 0 } = {}
    ) {
      this.lineIteration++;
      !data ? (data = this.data) : (this.data = data);
      !width ? (width = this.width) : (this.width = width);
      !stat ? (stat = this.stat) : (this.stat = stat);
      !indicator ? (indicator = this.indicator) : (this.indicator = indicator);
      let obj = {};
      obj.color = color;
      obj.indicator = stat;
      this.legend.push(obj);
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", `line-${this.lineIteration}`)
        .attr("width", this.width)
        .append("path")
        .attr("d", this.lineFunc(this.data))
        .attr("transform", `translate(${this.margin},${this.margin})`)
        .attr("stroke", (d, i) => {
          if (typeof color === "string") {
            return color;
          } else {
            this.addColorError;
          }
        })
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr(
          "transform",
          `translate(${this.margin + translateX},${this.margin / 2 + translateY})`
        );
  
        let line = d3.select(`${this.selector} svg .line-${this.lineIteration} path`)
        let length = line._groups[0][0].getTotalLength()
        line.attr('stroke-dasharray',length)
        .attr('stroke-dashoffset',length)
        .transition()
        .duration(500)
        .attr('stroke-dashoffset',0)
  
      return this;
    }
  
    addPlotPoints(
      stat,
      color,
      {
        data,
        width,
        indicator,
        padding = 0.2,
        opacity = 1,
        translateX = 0,
        translateY = 0,
        spreadX = 1,
        r = 20,
        stroke = null,
        strokeWidth = 0,
      } = {}
    ) {
      this.padding = padding;
      !data ? (data = this.data) : (this.data = data);
      !width ? (width = this.width) : (this.width = width);
      !stat ? (stat = this.stat) : (this.stat = stat);
      !indicator ? (indicator = this.indicator) : (this.indicator = indicator);
  
      if (color) {
        let obj = {};
        obj.color = color;
        obj.indicator = stat;
        this.legend.push(obj);
      } else {
        return console.error("color is a required parameter");
      }
  
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "plot-point-lines")
        .selectAll("line")
        .data(this.data)
        .enter()
        .append("line")
        .attr(
          "x1",
          (d) =>
            this.scaleBandHorizontal(d[`${this.indicator}`]) * spreadX +
            this.scaleBandHorizontal.bandwidth() / 2
        )
        .attr(
          "x2",
          (d) =>
            this.scaleBandHorizontal(d[`${this.indicator}`]) * spreadX +
            this.scaleBandHorizontal.bandwidth() / 2
        )
        .attr("stroke-width", "1px")
        .attr("stroke", "gray")
        .attr("stroke-dasharray", 3)
        .attr(
          "transform",
          `translate(${this.margin + translateX},${this.margin / 2 + translateY})`
        )
        .attr('y1',this.scaleLinearVertical(0))
        .attr('y2',this.scaleLinearVertical(0))
        .transition()
        .duration(300)
        .attr("y1", (d) => this.scaleLinearVertical(d[`${this.stat}`]))
        .attr("y2", () => {
          if (this.min >= 0) {
            return this.height;
          } else {
            return this.scaleLinearVertical(0);
          }
        });
  
      d3.select(`${this.selector} svg`)
        .append("g")
        .attr("class", "plot-points")
        .attr("width", this.width)
        .selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr(
          "cx",
          (d) =>
            this.scaleBandHorizontal(d[`${this.indicator}`]) * spreadX +
            this.scaleBandHorizontal.bandwidth() / 2
        )
        .attr('cy', this.scaleLinearVertical(0))
        .attr("r", r)
        .attr(
          "transform",
          `translate(${this.margin + translateX},${this.margin / 2 + translateY})`
        )
        .style("opacity", opacity)
        .attr("fill", (d, i) => {
          if (typeof color === "string") {
            return color;
          } else {
            this.addColorError;
          }
        })
        .attr("stroke", stroke)
        .attr("strokeWidth", strokeWidth)
        .transition()
        .duration(300)
        .attr("cy", (d) => {
          if (this.min >= 0) {
            return this.scaleLinearVertical(d[`${this.stat}`]);
          } else {
            if (d[`${this.stat}`] < 0) {
              return (
                this.height -
                this.scaleLinearVertical(Math.abs(d[`${this.stat}`]))
              );
            }
            return this.scaleLinearVertical(d[`${this.stat}`]);
          }
        });
  
      if (this.min < 0) {
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", "dividing-line")
          .append("line")
          .attr("x1", this.margin)
          .attr("x2", this.margin + this.wrapperWidth)
          .attr("y1", this.scaleLinearVertical(0) + this.margin / 2)
          .attr("y2", this.scaleLinearVertical(0) + this.margin / 2)
          .style("stroke", "lightgray")
          .style("stroke-width", "1px");
      }
      return this;
    }
  
    addDots(
      color = "black",
      { data, stat, indicator, r = 5, width, translateX = 0, translateY = 0 } = {}
    ) {
      this.dotIteration++;
      if (this.width !== 0 || this.height !== 0) {
        !data ? (data = this.data) : (this.data = data);
        !width ? (width = this.width) : (this.width = width);
        !stat ? (stat = this.stat) : (this.stat = stat);
        !indicator ? (indicator = this.indicator) : (this.indicator = indicator);
        d3.select(`${this.selector} svg`)
          .append("g")
          .attr("class", `dots-${this.dotIteration}`)
          .attr("width", this.width)
          .selectAll("circle")
          .data(this.data)
          .enter()
          .append("circle")
          .attr("cx", (d) => {
            return (
              this.scaleBandHorizontal(d[`${this.indicator}`]) +
              this.scaleBandHorizontal.bandwidth() / 2
            );
          })
          .attr("cy", (d) => {
            return this.scaleLinearVertical(d[this.stat]);
          })
          .attr("r", r)
          .attr(
            "transform",
            `translate(${this.margin + translateX},${
              this.margin / 2 + translateY
            })`
          )
          .attr("fill", color);
        return this;
      } else {
        return console.error(
          `${this.addDots.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addXAxis({
      tickSizeOuter = 0,
      tickSizeInner = null,
      tickPadding = 3,
      hideLine = false,
      axisLabels,
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        d3.select(this.selector + "  svg")
          .append("g")
          .attr("class", "x-axis")
          .attr(
            "transform",
            `translate(${this.margin},${this.height + this.margin / 2})`
          )
          .call(
            d3
              .axisBottom(this.scaleBandHorizontal)
              .tickSizeOuter(tickSizeOuter)
              .tickSizeInner(tickSizeInner)
              .tickPadding(tickPadding)
          );
        if (hideLine) {
          this.hideLineX;
        }
        if (Array.isArray(axisLabels)) {
          d3.selectAll(`${this.selector} svg .x-axis .tick text`).html(
            (d, i) => axisLabels[i]
          );
        } else if (axisLabels) {
          this.axisLabelsError;
        }
        return this;
      } else {
        console.error(
          `${this.addXAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addYAxis({
      data,
      formatPunctuation = "commaSeparate",
      ticks = 10,
      tickSizeOuter = 0,
      tickSizeInner = null,
      tickValues = null,
      tickPadding = 3,
      hideLine = false,
      axisLabel,
      orient = "left",
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        !data ? (data = this.data) : (this.data = data);
        this.domain = [];
        this.flatten;
        if (orient === "left") {
          d3.select(this.selector + " svg")
            .append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${this.margin},${this.margin / 2})`)
            .call(
              d3
                .axisLeft(this.scaleLinearVertical)
                .tickFormat((d) => {
                  if (formatPunctuation === "addPercent") {
                    return d + "%";
                  } else if (
                    formatPunctuation === "commaSeparate" ||
                    formatPunctuation === false
                  ) {
                    return this.commaFormatter(d);
                  } else this.formatPunctuationError;
                })
                .ticks(ticks)
                .tickSizeOuter(tickSizeOuter)
                .tickSizeInner(tickSizeInner)
                .tickValues(tickValues)
                .tickPadding(tickPadding)
            );
        } else if (orient === "right") {
          d3.select(this.selector + " svg")
            .append("g")
            .attr("class", "y-axis")
            .attr(
              "transform",
              `translate(${this.margin + this.wrapperWidth},${this.margin / 2})`
            )
            .call(
              d3
                .axisRight(this.scaleLinearVertical)
                .tickFormat((d) => {
                  if (formatPunctuation === "addPercent") {
                    return d + "%";
                  } else if (
                    formatPunctuation === "commaSeparate" ||
                    formatPunctuation === false
                  ) {
                    return this.commaFormatter(d);
                  } else this.formatPunctuationError;
                })
                .ticks(ticks)
                .tickSizeOuter(tickSizeOuter)
                .tickSizeInner(tickSizeInner)
                .tickValues(tickValues)
                .tickPadding(tickPadding)
            );
        } else {
          this.verticalAxisError;
        }
  
        d3.selectAll(`${this.selector} svg .y-axis .tick line`).style(
          "stroke",
          "gainsboro"
        );
        if (hideLine) {
          this.hideLineY;
        }
        if (Array.isArray(axisLabel)) {
          d3.selectAll(`${this.selector} svg .y-axis .tick text`).html(
            (d, i) => axisLabel[i]
          );
        } else if (axisLabel) {
          console.error("Axislabel must be an array");
        }
        return this;
      } else {
        console.error(
          `${this.addYAxis.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  
    addLabels({
      stat,
      indicator,
      formatPunctuation = "commaSeparate",
      dx = 0,
      dy = 0,
      color = "black",
      fontWeight = "normal",
      fontSize = null,
      show = false
    } = {}) {
      if (this.width !== 0 || this.height !== 0) {
        !stat ? stat = this.stat : this.stat = stat;
        !indicator ? (indicator = this.indicator) : (this.indicator = indicator);
        this.labelIteration++
        d3.select(this.selector + " svg")
          .append("g")
          .attr("class", `labels-${this.labelIteration}`)
          .selectAll("text")
          .data(this.data)
          .enter()
          .append("text")
          .text((d) => {
            if (Array.isArray(show)) {
              let valuesArray = Array.from(this.data.map(obj=>obj[`${this.stat}`]))
              if(show.includes('first')){
                
                if(d[`${this.stat}`]===valuesArray[0]){
                  return d[`${this.stat}`]
                }
              }
              if (show.includes('last')){
                if(d[`${this.stat}`]===valuesArray[valuesArray.length-1]){
                  return(d[`${this.stat}`])
                }
              }
  
              if (show.includes("max")) {
                if (d[`${this.stat}`] === this.localMax) {
                  return d[`${this.stat}`];
                }
              } if (show.includes("min")) {
                if (d[`${this.stat}`] === this.localMin) {
                  return d[`${this.stat}`];
                }
              } 
            } else if (!show) {
              return d[`${this.stat}`];
            } else {
              return console.error(
                "'show' must be an array. The array's elements should be 'max' and/or 'min'"
              );
            }
          })
          .attr("y", (d) => this.scaleLinearVertical(d[`${this.stat}`]) + 20)
          .attr("dy", dy)
          .attr(
            "x",
            (d) =>
              this.scaleBandHorizontal(d[`${this.indicator}`]) +
              this.scaleBandHorizontal.bandwidth() / 2
          )
          .attr("dx", dx)
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${this.margin},0)`)
          .attr("fill", color)
          .style("font-family", "sans-serif")
          .style("font-weight", fontWeight)
          .style("font-size", fontSize);
  
  if (formatPunctuation) {
          let labels = document.querySelectorAll(
            `${this.selector} svg .labels-${this.labelIteration} text`
          );
          
          for (let label of labels) {
            if (label.textContent) {
              if (formatPunctuation === "addPercent") {
                label.textContent = label.textContent + "%";
              }
              else if (
                formatPunctuation === "commaSeparate" ||
                formatPunctuation === false
              ) {
                label.textContent = this.commaFormatter(label.textContent);
              } else {
                this.formatPunctuationError;
              }
            }
          }
        }
  
  
        return this;
      } else {
        console.error(
          `${this.addLabels.name}: width and height not established. Ensure createChart is the first function in the chain and that it includes two parameters: width and height`
        );
      }
    }
  }

  // exports
  export { CCCVerticalBarChart, CCCHorizontalBarChart, CCCPieChart, CCCLineChart, CCCCombinationChart}
  