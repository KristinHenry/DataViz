var w = 850
var h = 400
var pad = 0


var yAxis = d3.svg.axis();


var dotChart = function(chart_w, chart_h, data, className, targSVG, xOffset, yOffset, dotColor, xname, yname, dx, r){

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,chart_h]);
    //yScale.domain([yMin, yMax]);
    yScale.domain([yMax, yMin]);

    var xMin = d3.min(data, function(d){return Math.floor(d[xname]); });
    var xMax = d3.max(data, function(d){return Math.floor(d[xname]); });
    var xScale = d3.scale.linear().range([0,chart_w]);
    xScale.domain([xMin, xMax]);

    var x = xOffset; //0;
    var y = yOffset +6;

    targSVG.append("text")
        .text(function(){ return yname + " by " + xname; })
        .attr("transform", "translate(" + x + "," + (y-6) + ")");


    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("circle")
        .attr("class", className)
        //.attr("cx", function(d){ return d[xname]*dx - dx/2; })
        .attr("cx", function(d){ return xScale(d[xname]); })
        // .attr("cy", function(d){ console.log(yname, d[yname]); return yOffset - yScale(d[yname]); })
        .attr("cy", function(d){return yScale(d[yname]); })
        .attr("r", function(d){ return r; })
        .attr("fill", function(d){ return dotColor; })
        .attr("opacity", .55)
        .attr("transform", "translate(" + x + "," + y + ")");

   
    targSVG.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + x + "," + y + ")")
        .call(d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(4)
                )
                
}


var barChart = function(chart_w, chart_h, data, className, targSVG, xOffset, yOffset, fillColor, xname, yname, dx, dy){
    console.log(className);

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,chart_h]);
    //yScale.domain([yMin, yMax]);
    yScale.domain([yMax, yMin]);

    var xMin = d3.min(data, function(d){return Math.floor(d[xname]); });
    var xMax = d3.max(data, function(d){return Math.floor(d[xname]); });
    var xScale = d3.scale.linear().range([0,chart_w]);
    xScale.domain([xMin, xMax]);


    var x = 0;
    var y = yOffset;

    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("rect")
        .attr("class", className)
        .attr("x", function(d){return xScale(d[xname]); }) //dx/4 + (d[xname]*dx - dx); })
        .attr("y", function(d){return yScale(d[yname]) ; })
        .attr("height", function(d){ return chart_h - yScale(d[yname]); })
        .attr("width", function(d){ return 2; })
        .attr("fill", fillColor)
        .attr("stroke", "black")
        .attr("opacity", .35)
        .attr("transform", "translate(" + x + "," + y + ")")


    targSVG.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + x + "," + y + ")")
        .call(d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(4)
                )

    y += chart_h;
    targSVG.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + x + "," + y + ")")
        .call(d3.svg.axis()
                .scale(xScale)
                .orient("botom")
                .ticks(0)
                )

    console.log("chart width: " , chart_w);

}




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    // this is the svg we'e drawing into
    var vis = d3.select("#chart");

    var charts_col_1 = 0;
    var charts_col_2 = w/2 + 30;

    var charts_row_1 = -10;
    var charts_row_2 = 140;
    var charts_row_3 = 200;
    var charts_row_4 = 300;

    var barWidth = 10;
    var yMult = 20;


    var graph_w = w/2 -10;
    var graph_h = 80; //120;
    
    //experimenting with abstracting chart drawing
   
    
    
    dotChart(graph_w, graph_h, data, "dot1", vis, charts_col_1, charts_row_1, "grey", "atomicNum", "meltingPoint", barWidth, 2);
    
    dotChart(graph_w, graph_h, data, "dot2", vis, charts_col_1, charts_row_2, "red", "atomicNum", "atomicRadius", barWidth, 2);

    barChart(graph_w, graph_h, data, "cell2", vis, charts_col_1, charts_row_4, "blue", "atomicNum", "atomicRadius", barWidth);


    dotChart(graph_w, graph_h, data, "dot3", vis, charts_col_2, charts_row_1, "purple", "atomicNum", "atomicWeight", barWidth, 2);

    dotChart(graph_w, graph_h, data, "dot4", vis, charts_col_2, charts_row_4, "blue", "atomicNum", "ionicRadius", barWidth, 2);

}




var init = function()
{
    console.log("init graphs");

    //setup the svg
    var svg = d3.select("#svg")
        .attr("width", w+100)
        .attr("height", h+100)
    

    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("fill", "none")


    svg.append("svg:g")
        .attr("id", "chart")
        .attr("transform", "translate(50,50)")         
    
}
