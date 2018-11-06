function enter_tool() {
  screen11.transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("transform", "translate(0,-500)");
  screen3.selectAll(".brand_text")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", -500);

  // Show slider
  document.getElementById("slider").style.visibility="visible";

  // Enter group
  screen_tool.transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("transform", "translate(0,0)");

  // Intro text
  screen_tool.selectAll(".intro_text")
             .selectAll("tspan")
             .transition()
             .duration(600)
             .ease(d3.easeLinear)
             .attr("y", 20);

  // Move in brand_text
  // Move brand text
	screen3.selectAll(".brand_text")
         .attr("y", -500)
  			 .transition()
  			 .duration(600)
  			 .ease(d3.easeLinear)
  			 .attr("y", function(d) {
           if (d.network=="msnbc") {
             return 160+h_headlines/2;
           }
           else if (d.network=="cnn") {
             return 160+h_headlines*1.5+tool_margin.h_between;
           }
           else { return 160+h_headlines*2.5+tool_margin.h_between*2; }
         })
         .attr("x", 50);

  d3.csv("Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

    var dataset = data; // Once loaded, copy to dataset

    // TImeline section
    screen_tool.select(".timeline_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(0," + (tool_margin.top+tool_margin.intro_text+30) + ")");

    // Headline section
    screen_tool.select(".headline_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(" + (tool_margin.left+w_headlines*2+tool_margin.w_between+20) + "," + (tool_margin.top+h_timeline+tool_margin.intro_text+30) + ")")

    // Move in dot_section
    screen_tool.select("#dot_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(" + 120 + "," + (tool_margin.top+h_timeline+tool_margin.intro_text+30) + ")");


    }); // end d3.csv
}
