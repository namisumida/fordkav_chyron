	// Exiting functions
	function exit_screen1() {
		screen1.selectAll("text") // move all text out
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);

	}; // end exit_screen1
	function exit_screen2() {
		screen2.selectAll("text")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	 screen2.selectAll("tspan")
					.transition()
					.duration(600)
					.ease(d3.easeLinear)
					.attr("y", -500);
		screen2.selectAll("rect")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	}; // end exit_screen2()
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
		screen3.selectAll("rect")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	}; // end of exit_screen3
	function exit_screen4() {
		screen4.selectAll("text")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
		screen4.selectAll(".intro_text")
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
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
		screen5.selectAll(".intro_text")
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
		screen5.selectAll(".subtext")
					 .transition()
					 .duration(400)
					 .style("fill", "none");
		screen5.selectAll(".count_text")
					 .transition()
					 .duration(400)
					 .style("fill", "none");
	}; // end of exit_screen5
	function exit_screen6() {
		screen6.selectAll(".intro_text")
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	} // end exit_screen6()
	function exit_screen7() {
		screen7.selectAll(".intro_text")
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	} // end exit_screen7()
	function exit_screen8() {
		screen8.selectAll(".intro_text")
					 .selectAll("tspan")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500);
	} // end exit screen 8
	function exit_screen9() {
		screen9.selectAll("text")
					 .transition()
					 .duration(600)
					 .ease(d3.easeLinear)
					 .attr("y", -500)
	}; // end exit_screen9
	function exit_screen10() {
		screen10.selectAll("text")
					  .selectAll("tspan")
						.transition()
						.duration(600)
						.ease(d3.easeLinear)
						.attr("y", -500);
	} // end exit_screen10
	function exit_screen11() {
		screen11.selectAll(".grid_circle")
					  .transition()
	 					  .duration(600)
	 					  .ease(d3.easeLinear)
	 					  .attr("cy", -500)
						.style("stroke", "none")
						.style("fill", function(d) {
							if (d.network=="msnbc") {
								return yellow;
							}
							else if (d.network=="cnn") {
								return red;
							}
							else { return blue; }
						});
		screen11.selectAll(".intro_text")
						.selectAll("tspan")
					 	.transition()
						.duration(600)
	 					  .ease(d3.easeLinear)
	 					  .attr("y", -500);
	}; // end exit_screen11
