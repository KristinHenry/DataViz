

var w = 850;
var h = 500;
var pad = 10;
var colors = ["#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"];
var colors = ["#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c"];


var yAxis = d3.svg.axis();


var groupedBarChart = function(data, targSVG, chart_w, chart_h, chart_pad, chart_colors){
    console.log(data);

    var margin = {top: chart_pad*2, right: chart_pad*2, bottom: chart_pad*3 + 30, left: chart_pad*4},//{top: 20, right: 20, bottom: 30, left: 40},
    width = chart_w - margin.left - margin.right,
    height = chart_h - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(chart_colors);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select(targSVG).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "age_group" && key !== 'total' && key !== 'num_replies'; });
      

      var ageCounts = [];
      data.forEach(function(d){
        ageCounts.push({'agegroup': d.age_group, 'num': d.num_replies});
      });
      

      data.forEach(function(d) {
        d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
        console.log(d.ages);
      });

      x0.domain(data.map(function(d) { return d.age_group; }));
      x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Average Number of Things");

      var xgroup = svg.selectAll(".xgroup")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.age_group) + ",0)"; });

      xgroup.selectAll("rect")
          .data(function(d) { return d.ages; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(ageNames.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

      // for N values
      var legend2group = svg.append("g")
        .attr('transform', function(d){return 'translate(' + -600 + ',0)'})
      var legend2 = legend2group.selectAll(".legend2")
          .data(ageCounts)
        .enter().append("g")
          .attr("class", "legend2")
          .attr("transform", function(d, i) { return "translate(" + (i*100)  +"," + 460 + ")"; });

      legend2.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d.agegroup + ": "; });

      legend2.append("text")
          .attr("x", width - 16)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function(d) { return ' N = ' + d.num;});

}


d3.csv("dataSummary.csv", function(error, data) {
      if (error) throw error;
 
      var targSVG = "#chart";
      groupedBarChart(data, targSVG, w, h, pad, colors);
});

var init = function()
{
    //setup the svg
    var svg = d3.select("#svg")
        .attr("width", w+100)
        .attr("height", h+100)
    

    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#CCC")
        .attr("fill", "none")


    svg.append("svg:g")
        .attr("id", "chart")
        .attr("transform", "translate(10,10)")         
    
}


init();
