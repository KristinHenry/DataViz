var w = 850
var h = 400
var pad = 0


var yAxis = d3.svg.axis();


var dotChart = function(data, className, targSVG, yOffset, dotColor, xname, yname, dx, r){

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,120]);
    //yScale.domain([yMin, yMax]);
    yScale.domain([yMax, yMin]);

    var x = 0;
    var y = yOffset;


    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("circle")
        .attr("class", className)
        .attr("cx", function(d){ console.log(xname, d[xname]); return d[xname]*dx - dx/2; })
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


var barChart = function(h, data, className, targSVG, yOffset, fillColor, xname, yname, dx, dy){
    console.log(className);

    var yMin = d3.min(data, function(d){return Math.floor(d[yname]); });
    var yMax = d3.max(data, function(d){return Math.floor(d[yname]); });
    var yScale = d3.scale.linear().range([0,h]);
    //yScale.domain([yMin, yMax]);
    yScale.domain([yMax, yMin]);

    var xMin = d3.min(data, function(d){return Math.floor(d[xname]); });
    var xMax = d3.max(data, function(d){return Math.floor(d[xname]); });
    var xScale = d3.scale.linear().range([0,w]);
    xScale.domain([xMin, xMax]);


    var x = 0;
    var y = yOffset;

    targSVG.selectAll("." + className)
        .data(data)
        .enter().append("rect")
        .attr("class", className)
        .attr("x", function(d){return dx/4 + (d[xname]*dx - dx); })
        .attr("y", function(d){return yScale(d[yname]) ; })
        .attr("height", function(d){ return h - yScale(d[yname]); })
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
    y += h;
    targSVG.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + x + "," + y + ")")
        .call(d3.svg.axis()
                .scale(xScale)
                .orient("botom")
                .ticks(0)
                )


}




var bubbles = function(data){
    console.log("bubbles----------------------------------------");

    // this is the svg we'e drawing into
    var vis = d3.select("#chart");

    var baseBars = 300;
    var baseDots = 140;
    var baseDots2 = -20;

    var barWidth = 10;
    var yMult = 20;


    //experimenting with abstracting chart drawing
    barChart(140, data, "cell2", vis, baseBars, "blue", "atomicNum", "atomicRadius", barWidth);
    // dotChart(data, "dot3", vis, baseDots, "red", "atomicNum", "density", barWidth, 2);
    dotChart(data, "dot3", vis, baseDots, "red", "atomicNum", "atomicRadius", barWidth, 2);
    dotChart(data, "dot4", vis, baseDots2, "grey", "atomicNum", "meltingPoint", barWidth, 2);

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
