function exit_screen3() {
	screen3.selectAll("text")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);
  screen3.selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);
	screen3.selectAll(".introText")
				 .style("fill", "none");
}; // end of exit_screen3
function exit_screen4() {
	screen4.selectAll("text")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);
	screen4.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
	screen4.select("#ford_descrip")
				 .selectAll("tspan")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	screen4.select("#ford_line")
				 .transition()
				 .duration(400)
				 .style("stroke", "none");
}; // end of exit_screen4()
function exit_screen5() {
	screen5.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
	screen5.selectAll(".subtext")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	screen5.selectAll(".countText")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
}; // end of exit_screen5
function exit_screen6() {
	screen6.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
} // end exit_screen6()
function exit_screen7() {
	screen7.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
} // end exit_screen7()
function exit_screen8() {
	screen8.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
} // end exit screen 8
