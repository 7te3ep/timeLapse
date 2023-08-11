const genGrid = ()=>{
   var data = new Array();
   var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
   var ypos = 1;
   // iterate for rows	
   for (var row = 0; row < 100; row++) {
      data.push( new Array() );
      // iterate for cells/columns inside rows
      for (var column = 0; column < 100; column++) {
         data[row].push({
            x: xpos,
            y: ypos,
            width:10,
            height: 10,
            id :[row,column] ,
         })
         // increment the x position. I.e. move it over by 50 (width variable)
         xpos += 10;
      }
      // reset the x position after a row is complete
      xpos = 1;
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += 10;	
   }
   return data;
}

let gridData = genGrid()
console.log(gridData);

const zoom = d3
.zoom()
.scaleExtent([0.5, 18])
.on("zoom", () => grid.attr("transform", d3.event.transform));

var grid = d3.select("#grid")
   .call(zoom)
   .append("svg")
   .attr("width",`${1000}px`)
   .attr("height",`${1000}px`)
   .style("position",`absolute`)
   .style('scale','0.6')

var row = grid.selectAll(".row")
   .data(gridData)
   .enter().append("g")
   .attr("class", "row");

var column = row.selectAll(".square")
   .data(function(d) { return d; })
   .enter().append("rect")
   .attr("class","square")
   .attr("x", function(d) { return d.x; })
   .attr("y", function(d) { return d.y; })
   .attr("width", function(d) { return d.width; })
   .attr("height", function(d) { return d.height; })
   .attr("id", function(d) { return d.id; })
   .style("fill",function(){
      return "#FFF"
   })
   .style('stroke-width', "0.1px")
   .style("stroke", "#222")



fetch('pixelwar-43efd-default-rtdb-export.json')
.then(response => response.json())
.then(response => {
   var history = Object.values(response.data)
   var index = 0
   var mainLoopId = setInterval(function(){
      for (let i = 0;i < 20; i ++){
         if (history[index] == undefined) clearInterval(mainLoopId)
         index++
         let color
         if (history[index].color == "g") color = "#00FF8C"
         if (history[index].color == "r") color = "#FF4800"
         if (history[index].color == "p") color = "#7200FF"
         if (history[index].color == "n") color = "#ffffff"
         document.getElementById(`${history[index].id[0]},${history[index].id[1]}`).style.fill = color
      }
   }, 50);
   })
