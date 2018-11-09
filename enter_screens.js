// Third screen - first grid
function enter_screen3() {
  // Enter elements
  // Intro text
  screen3.selectAll(".intro_text")
         .selectAll("tspan")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", 20);
  screen3.selectAll(".brand_text")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", pos_brandtext-30);
  screen3.selectAll(".grid_rect")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (d.network=="msnbc") {
             return pos_gridstart+Math.floor(i / 10) % max_rows * sq_spacing;
           }
           else if (d.network=="cnn") {
             return pos_gridstart+Math.floor((i-103) / 10) % max_rows * sq_spacing;
           }
           else { return pos_gridstart+Math.floor((i-173) / 10) % max_rows * sq_spacing; }
         })
         .style("opacity", 0.4)
         .style("fill", function(d) {
           if (d.network=="msnbc") {
             return yellow;
           }
           else if (d.network=="cnn") {
             return red;
           }
           else { return blue; }
         })
         .style("stroke", "none");
  screen3.selectAll(".chyron_back")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", pos_chyronback)
         .style("fill", "white");
  screen3.selectAll(".count_text")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", pos_counttext)
         .text(function(d) {
           if (d.network=="msnbc") {
             return "103";
           }
           else if (d.network=="cnn") {
             return "70";
           }
           else { return "61"; }
         });

  // move out screen 2 elements
  exit_screen4();

}; // End enter_screen3()

// Fourth screen - Ford grid
function enter_screen4() {

	// Remove necessary screens
	// Remove elements from screen5
	exit_screen5();
	screen3.selectAll(".grid_rect")
				 .filter(function(d) {
					 return (d.time>=ford_start & d.time<=ford_end);
				 })
				 .on("mouseover", function(d) {});
	// Remove intro text from screen3
	screen3.selectAll(".intro_text")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);

	// Intro text
	screen4.select("#intro4_1")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 12);
	screen4.select("#intro4_2")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 60);

	// Description/labels
	screen4.select("#ford_line")
					.transition()
					.delay(1000)
					  .duration(600)
					.style("stroke", "gray");
	screen4.select("#ford_descrip")
					.selectAll("tspan")
					.transition()
					.delay(1000)
					.duration(600)
					.style("fill", "gray");

	// Modify screen3's waffle chart/grid
	screen3.selectAll(".grid_rect")
				 .style("opacity", .25)
				 .on("mouseover", function(d) {} ) // remove mouseover feature
				 .transition()
				 .duration(600)
				 .filter(function(d) {
					 return (d.time>=ford_start & d.time<=ford_end);
				 })
				 .style("opacity", 1)
				 .style("fill", function(d) {
					 if (d.network=="msnbc") {
						 return light_yellow;
					 }
					 else if (d.network=="cnn") {
						 return light_red;
					 }
					 else { return light_blue; }
				 })
				 .style("stroke", function(d) {
					 if (d.network=="msnbc") {
						 return dark_yellow;
					 }
					 else if (d.network=="cnn") {
						 return dark_red;
					 }
					 else { return dark_blue; }
				 })
				 .style("stroke-width", 2);

	// Enter count text
	screen3.selectAll(".count_text")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else {
						 return pos_belowcount-80;
					 }
				 })
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "54";
					 }
					 else if (d.network=="cnn") {
						 return "42";
					 }
					 else { return "20"; }
				 })
				 .style("fill", "black");

	screen3.selectAll(".chyron_back")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else {
						 return pos_belowcount-80;
					 }
				 })
				 .style("fill", "none");

} // end enter_screen4();

// 5th screen
function enter_screen5() {

	// Screen 4 transitions
	screen3.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
  screen4.selectAll(".intro_text")
 				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);

	// Screen 6 transitions
	screen6.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	exit_screen6();
	screen6.select("#kav_descrip")
				 .selectAll("tspan")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	screen6.select("#kav_line")
				 .transition()
				 .duration(400)
				 .style("stroke", "none");

	// Intro text
	screen5.select("#intro5_1")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 12);
	screen5.select("#intro5_2")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 110);

	// Count text
	screen5.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "black");

	// Enter subtext
	screen5.selectAll(".subtext")
				 .transition()
				 .duration(400)
				 .style("fill", "black");

	// Rect grids
	screen3.selectAll(".grid_rect") // change opacity
				 .transition()
				 .duration(600)
				 .style("opacity", 1)
				 .filter(function(d) {
					 return (d.time<ford_start | d.time>ford_end);
				 })
				 .style("opacity", 0.25);

	screen3.selectAll(".grid_rect") // add mouseover feature
				 .filter(function(d) {
					 return (d.time>=ford_start & d.time<=ford_end);
				 })
			 	 .on("mouseover", function(d) {
					 var network = d.network;
					 screen5.append("rect")
					 				.attr("id", "mouseover_rect")
									.attr("x", function(d) {
                    if (network=="msnbc") {
        							return margin.left_chyron;
        						}
        						else if (network=="cnn") {
        							return margin.left_chyron+margin.btwn_chyron+w_chyron;
        						}
        						else { return margin.left_chyron+margin.btwn_chyron*2+w_chyron*2; }
									})
									.attr("y", function(d) {
										if (network=="msnbc") {
				 						 return pos_squaremouse;
				 					 	}
										else { return pos_squaremouse-80; }
									})
									.style("fill", function(d) {
										if (network=="msnbc") {
				 						 return yellow;
				 					 	}
				 					 	else if (network=="cnn") {
				 						 return red;
				 					 	}
				 					 	else { return blue; }
									})
									.attr("width", w_chyron)
				 				  .attr("height", h_chyron)
									.style("opacity", 0.5);

						var chyron = d.chyron;
						screen5.append("text")
							 		 .attr("id", "mouseover_text")
									 .text(chyron)
									 .attr("x", function(d) {
                     if (network=="msnbc") {
         							return margin.left_chyron+w_chyron/2;
         						 }
         						 else if (network=="cnn") {
         							 return margin.left_chyron+margin.btwn_chyron+(w_chyron/2)*3;
         						 }
         						 else { return margin.left_chyron+margin.btwn_chyron*2+(w_chyron/2)*5; }
									 })
									 .attr("y", function() {
										  labelWidth = this.getComputedTextLength();
											availWidth = w_chyron-10;
											lines = Math.ceil(labelWidth/availWidth);
											if (network=="msnbc") {
												if (lines <= 5) {
													return pos_squaremouse+30;
												}
												else {
													return pos_squaremouse+20;
												}
											}
											else {
												if (lines <= 5) {
													return pos_squaremouse-80+30;
												}
												else {
													return pos_squaremouse-80+20;
												}
											}
									 })
									 .style("text-anchor", "middle")
									 .style("font-size", function() {
										if (lines <= 4) {
											return 14;
										}
                    else if (lines <=5) {
                      return 14 - Math.ceil(lines/4)*.5 + "px";
                    }
										else {
                      return 14 - Math.ceil(lines/2)*.5 + "px";
										}
									})
								   .style("font-weight", 400)
									 .call(wrap, w_chyron-10);
				 })
				 .on("mouseout", function() {
					 screen5.select("#mouseover_rect").remove();
					 screen5.select("#mouseover_text").remove();
				 });

} // end enter_screen5()

// 6th screen
function enter_screen6() {

	// Transition from screen 5
	exit_screen5();
	screen3.selectAll(".grid_rect")
				 .filter(function(d) {
					 return (d.time>=ford_start & d.time<=ford_end);
				 })
				 .on("mouseover", function(d) {});
	// Transition from screen 7
	screen7.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	exit_screen7();

	// Intro text
	screen6.selectAll(".intro_text")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 30);

	// Description/labels
	screen6.select("#kav_line")
					.transition()
					.delay(1000)
					  .duration(600)
					.style("stroke", "gray");
	screen6.select("#kav_descrip")
					.selectAll("tspan")
					.transition()
					.delay(1000)
					.duration(600)
					.style("fill", "gray");

	// Modify screen3's waffle chart/grid
	screen3.selectAll(".grid_rect")
				 .on("mouseover", function(d) {}) // remove mouseover feature
				 .filter(function(d) {
					 return (d.time>=kav_start & d.time<=kav_end);
				 })
				 .transition()
				 .delay(500)
				 .duration(600)
				 .style("opacity", 1);

	screen6.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "black");
} // end enter_screen6

// 7th screen
function enter_screen7() {
	// Transition from screen 6
	screen6.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "none");
	exit_screen6();
	// transition from screen 8
	screen3.selectAll(".chyron_back")
				 .transition()
				 .duration(400)
				 .attr("y", function(d) {
           if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return 340; }
         })
				 .style("fill", "none");
	screen8.selectAll(".chyron_back8")
				 .transition()
				 .duration(400)
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "none");
	screen8.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .attr("y", 340)
				 .style("fill", "none");
	exit_screen8();

	// Intro text
	screen7.select("#intro7_1")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 20);
	screen7.select("#intro7_2")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 73);

	// Show %
	screen7.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .style("fill", "black")
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 }); // need this for transition 8 ->7

	// Enter subtext - same as used in screen 5
	screen5.selectAll(".subtext")
				 .transition()
				 .duration(400)
				 .style("fill", "black");

	// Waffle chart/grid
	// Rect grids
	screen3.selectAll(".grid_rect") // add mouseover feature
				 .filter(function(d) {
					 return (d.time>=kav_start & d.time<=kav_end);
				 })
			 	 .on("mouseover", function(d) {
					 var network = d.network;
					 screen7.append("rect")
					 				.attr("id", "mouseover_rect")
									.attr("x", function(d) {
										if (network=="msnbc") {
				 						 return margin.left_chyron;
				 					  }
				 					  else if (network=="cnn") {
				 						 return margin.left_chyron+margin.btwn_chyron+w_chyron;
				 					  }
				 					  else { return (margin.left_chyron+margin.btwn_chyron*2+w_chyron*2); }
									})
									.attr("y", function(d) {
										if (network=="msnbc") {
				 						 return pos_squaremouse;
				 					 	}
										else { return pos_squaremouse-80; }
									})
									.style("fill", function(d) {
										if (network=="msnbc") {
				 						 return yellow;
				 					 }
				 					 else if (network=="cnn") {
				 						 return red;
				 					 }
				 					 else { return blue; }
									})
									.attr("width", w_chyron)
				 				  .attr("height", h_chyron)
									.style("opacity", 0.5);

						var chyron = d.chyron;
						screen7.append("text")
							 		 .attr("id", "mouseover_text")
									 .text(chyron)
									 .attr("x", function(d) {
                     if (network=="msnbc") {
 				 						  return margin.left_chyron+w_chyron/2;
 				 					   }
 				 					   else if (network=="cnn") {
 				 						  return margin.left_chyron+margin.btwn_chyron+w_chyron*3/2;
 				 					   }
 				 					   else { return (margin.left_chyron+margin.btwn_chyron*2+w_chyron*5/2); }
									 })
									 .attr("y", function() {
										  labelWidth = this.getComputedTextLength();
											availWidth = w_chyron-10;
											lines = Math.ceil(labelWidth/availWidth);
										  if (network=="msnbc") {
											 if (lines <= 5) {
												 return pos_squaremouse+30;
											 }
											 else {
												 return pos_squaremouse+20;
											 }
										  }
										else {
											if (lines <= 5) {
												return pos_squaremouse-80+30;
											}
											else {
												return pos_squaremouse-80+20;
											}
										}
									 })
									 .style("text-anchor", "middle")
									 .style("font-size", function() {
                     if (lines <= 4) {
 											return 14;
 										}
                     else if (lines <=5) {
                       return 14 - Math.ceil(lines/4)*.5 + "px";
                     }
 										else {
                       return 14 - Math.ceil(lines/2)*.5 + "px";
 										}
									})
								   .style("font-weight", 400)
									 .call(wrap, w_chyron-10);
				 })
				 .on("mouseout", function() {
					 d3.select("#mouseover_rect").remove();
					 d3.select("#mouseover_text").remove();
				 });

} // end enter_screen7

function enter_screen8() {

	// transition from screen 7
	screen5.selectAll(".subtext")
		 		 .transition()
				 .duration(400)
				 .style("fill", "none");
	exit_screen7();
	screen3.selectAll(".grid_rect") // remove mouseover function
				 .on("mouseover", function(d) {} );

/*	// Transition from screen 9
	screen3.selectAll(".grid_rect")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", function(d,i) {
					 if (d.network=="msnbc") {
						 return pos_gridstart+Math.floor(i / 10) % max_rows * sq_spacing;
					 }
					 else if (d.network=="cnn") {
						 return pos_gridstart+Math.floor((i-103) / 10) % max_rows * sq_spacing;
					 }
					 else { return pos_gridstart+Math.floor((i-173) / 10) % max_rows * sq_spacing; }
				 });
	screen9.selectAll("text")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);
	screen9.selectAll(".chyron_rect")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500);
	screen3.selectAll(".brand_text")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", pos_brandtext-30)
         .attr("x", function(d) {
           if (d.network=="msnbc") {
             return margin.left_chyron+w_chyron/2;
           }
           else if (d.network=="cnn") {
             return margin.left_chyron+margin.btwn_chyron+(w_chyron/2)*3;
           }
           else { return margin.left_chyron+margin.btwn_chyron*2+(w_chyron/2)*5; }
         });
	screen6.select("#kav_line") // label lines
				 .transition()
				 .duration(400)
				 .style("stroke", "gray");
	screen4.select("#ford_line") // label lines
				 .transition()
				 .duration(400)
				 .style("stroke", "gray");
	screen4.selectAll(".description") // label text
		 		 .selectAll("tspan")
				 .transition()
				 .duration(400)
				 .style("fill", "gray");
	screen6.selectAll(".description") // label text
		 		 .selectAll("tspan")
				 .transition()
				 .duration(400)
				 .style("fill", "gray");*/

	// Move or add or adjust

	// Intro text
	screen8.selectAll(".intro_text")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", 20);

	// Opacity of rectangles
	screen3.selectAll(".grid_rect")
				 .transition()
				 .duration(400)
				 .ease(d3.easeLinear)
				 .attr("y", function(d,i) { // for screen 9 -> 8 transition
					 if (d.network=="msnbc") {
					 	return pos_gridstart+Math.floor(i / 10) % max_rows * sq_spacing;
					 }
					 else if (d.network=="cnn") {
					 	return pos_gridstart+Math.floor((i-103) / 10) % max_rows * sq_spacing;
					 }
					 else { return pos_gridstart+Math.floor((i-173) / 10) % max_rows * sq_spacing; }
				 })

	// Add in white rects for Ford's %
	screen8.selectAll(".chyron_back8")
				 .transition()
				 .duration(400)
				 .ease(d3.easeLinear)
				 .attr("y", function(d) {
					 if (d.network=="fox") {
						 return pos_gridstart + 3+2;
					 }
					 else { return pos_gridstart + sq_spacing+1; }
				 })
				 .style("fill", "white");

	// Move in white rects for Ford %
	screen8.selectAll(".count_text")
				 .transition()
				 .duration(400)
				 .ease(d3.easeLinear)
				 .style("fill", "black")
				 .attr("y", function(d) {
					 if (d.network=="fox") {
						 return pos_gridstart + sq_spacing+5;
					 }
					 else { return pos_gridstart + 2* sq_spacing; }
				 });

	// Move chyron backs for Kav's %
	screen3.selectAll(".chyron_back")
				 .transition()
				 .delay(300)
				 .duration(400)
				 .ease(d3.easeLinear)
				 .style("fill", "white") // this is here because of the transition needed from 8 -> 7
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_gridstart + 7.5*sq_spacing;
					 }
					 else if (d.network=="cnn") {
						 return pos_gridstart+ 5*sq_spacing+4;
					 }
					 else { return pos_gridstart + 3* sq_spacing+10; }
				 })

	// Move kav % up
	screen7.selectAll(".count_text")
				 .transition()
				 .delay(300)
				 .duration(400)
				 .ease(d3.easeLinear)
				 .style("fill", "black")
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_gridstart + 8.5*sq_spacing;
					 }
					 else if (d.network=="cnn") {
						 return pos_gridstart+ 6*sq_spacing+3;
					 }
					 else { return pos_gridstart + 4* sq_spacing+9; }
				 });

} // end enter_screen8

// Transitions for screen 11
function enter_screen11() {
  // Transition for Ford circles
  screen11.selectAll(".grid_circle")
          .filter(function(d) {
            return d.chyron.includes("FORD:");
          })
          .transition()
          .delay(500)
          .duration(600)
          .style("opacity", 1)
          .style("fill", function(d) {
            if (d.network=="msnbc") {
                return light_yellow;
              }
              else if (d.network=="cnn") {
               return light_red;
              }
              else { return light_blue; }
          })
          .style("stroke", function(d) {
            if (d.network=="msnbc") {
              return dark_yellow;
            }
            else if (d.network=="cnn") {
              return dark_red;
            }
            else { return dark_blue; }
          })
          .style("stroke-width", 2);

  // Description/labels
  screen11.select("#ford_line")
          .transition()
          .delay(1000)
          .duration(600)
          .style("stroke", "gray");
  screen11.select("#ford_descrip")
          .selectAll("tspan")
          .transition()
          .delay(1000)
          .duration(600)
          .style("fill", "gray");

  // Transition for Kav circles
  screen11.selectAll(".grid_circle")
          .filter(function(d) {
            return d.chyron.includes("KAVANAUGH:");
          })
          .transition()
          .delay(1500)
          .duration(600)
          .style("opacity", 1)
          .style("fill", function(d) {
            if (d.network=="msnbc") {
              return yellow;
            }
            else if (d.network=="cnn") {
              return red;
            }
            else { return blue; }
          });

  // Description/labels
  screen11.select("#kav_line")
      .transition()
      .delay(2000)
      .duration(600)
      .style("stroke", "gray");
  screen11.select("#kav_descrip")
          .selectAll("tspan")
          .transition()
          .delay(2000)
          .duration(600)
          .style("fill", "gray");

  // Mouseover feature of grid circles
  screen11.selectAll(".grid_circle")
          .filter(function(d) {
            return d.chyron.includes("FORD:") | d.chyron.includes("KAVANAUGH:");
          })
          .on("mouseover", function(d) {
            var network = d.network;
            screen11.append("rect")
                    .attr("id", "chyron_rect")
                   .attr("x", function() {
                    if (network=="msnbc") {
                      return margin.left_chyron - (sq_size-8);
                    }
                    else if (network=="cnn") {
                      return margin.left_chyron+margin.btwn_chyron+w_chyron - (sq_size-8);
                    }
                    else { return margin.left_chyron+margin.btwn_chyron*2+w_chyron*2 - (sq_size-8); }
                   })
                   .attr("y", function() {
                     if (network=="msnbc") {
                      return pos_circlemouse;
                     }
                     else { return pos_circlemouse-80; }
                   })
                   .style("fill", function() {
                     if (network=="msnbc") {
                      return yellow;
                    }
                    else if (network=="cnn") {
                      return red;
                    }
                    else { return blue; }
                   })
                   .attr("width", w_chyron)
                   .attr("height", h_chyron)
                   .style("opacity", 0.5);

             var chyron = d.chyron;
             screen11.append("text")
                    .attr("id", "chyron_text")
                    .text(chyron)
                    .attr("x", function() {
                      if (network=="msnbc") {
                        return margin.left_chyron+w_chyron/2 - (sq_size-8);
                      }
                      else if (network=="cnn") {
                        return margin.left_chyron+margin.btwn_chyron+(w_chyron/2)*3 - (sq_size-8);
                      }
                      else { return margin.left_chyron+margin.btwn_chyron*2+(w_chyron/2)*5 - (sq_size-8); }
                    })
                    .attr("y", function() {
                     labelWidth = this.getComputedTextLength();
                     availWidth = w_chyron-10;
                     lines = Math.ceil(labelWidth/availWidth);
                     if (network=="msnbc") {
                       if (lines <= 5) {
                         return pos_circlemouse+30;
                       }
                       else {
                         return pos_circlemouse+20;
                       }
                     }
                     else {
                       if (lines <= 5) {
                         return pos_circlemouse-80+30;
                       }
                       else {
                         return pos_circlemouse-80+20;
                       }
                     }
                    })
                    .style("text-anchor", "middle")
                    .style("font-size", function() {
                      if (lines <= 4) {
                        return 14;
                      }
                      else if (lines <=5) {
                        return 14 - Math.ceil(lines/4)*.5 + "px";
                      }
                      else {
                        return 14 - Math.ceil(lines/2)*.5 + "px";
                      }
                   })
                    .style("font-weight", 400)
                    .call(wrap, w_chyron-10);
          }) // end on mouseover
          .on("mouseout", function() {
            screen11.select("#chyron_rect").remove();
            screen11.select("#chyron_text").remove();
          });
}; // end enter function
