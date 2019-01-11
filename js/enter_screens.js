function enter_screen3() {
  // Exit screen 4 elements
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

  // Enter elements
  // Intro text
  screen3.selectAll(".introText")
         .selectAll("tspan")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", margin.top)
         .style("fill", "black");
  screen3.selectAll(".brandText")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow == 3) { return margin.top + h_intro3; }
           else if (gridsPerRow == 2) {
             if (i<=1) { return margin.top + h_intro3; }
             else { return margin.top + h_intro3 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
           }
           else {
             if (i==0) { return margin.top + h_intro3; }
             else if (i==1) { return margin.top + h_intro3 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
             else { return margin.top + h_intro3 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
           }
         });
  screen3.selectAll(".grid_rect")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro3 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro3 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro3 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro3 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
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
         .attr("y", function(d,i) {
					 if (gridsPerRow==3) { return margin.top + h_intro3 + h_brandText + h_spacing*1.6 + sq_spacing; }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro3 + h_brandText + h_spacing*1.6 + sq_spacing; }
						 else { return margin.top + h_intro3 + h_brandText*2 + h_spacing*3.2 + sq_spacing*12;}
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro3 + h_brandText + h_spacing/2 + sq_spacing*2; }
						 else if (d.network=="cnn") { return margin.top + h_intro3 + h_brandText*2 + h_spacing*2.5 + sq_spacing*13; }
						 else { return margin.top + h_intro3 + h_brandText*3 + h_spacing*5 + sq_spacing*20; }
					 }
				 })
         .style("fill", "white");
  screen3.selectAll(".countText")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d) {
					 if (gridsPerRow==3) { return margin.top + h_intro3 + h_brandText + h_spacing*3 + sq_spacing; }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro3 + h_brandText + h_spacing*3 + sq_spacing; }
						 else { return margin.top + h_intro3 + h_brandText*2 + h_spacing*4.5 + sq_spacing*12;}
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro3 + h_brandText + h_spacing/2 + sq_spacing*3 - sq_padding/2; }
						 else if (d.network=="cnn") { return margin.top + h_intro3 + h_brandText*2 + h_spacing*2.5 + sq_spacing*14 - sq_padding/2; }
						 else { return margin.top + h_intro3 + h_brandText*3 + h_spacing*5 + sq_spacing*21 - sq_padding/2; }
					 }
				 })
         .text(function(d) {
           if (d.network=="msnbc") {
             return "103";
           }
           else if (d.network=="cnn") {
             return "70";
           }
           else { return "61"; }
         });
}; // End enter_screen3()

function enter_screen4() {
	// Remove necessary screens
	// Remove elements from screen5
	exit_screen5();
	// Remove intro text from screen3
	screen3.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
         .style("fill", "none");

	// Intro text
	screen4.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", margin.top)
         .style("fill", "black");

	// Description/labels
	screen4.select("#ford_line")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
					.style("stroke", "gray")
          .attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro4 + h_brandText + 15; }
						else { return margin.top + h_intro4 + h_brandText + sq_spacing + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro4 + h_brandText + 15; }
						else { return margin.top + h_intro4 + h_brandText + sq_spacing + 15; }
					});
	screen4.select("#ford_descrip")
					.selectAll("tspan")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
					.style("fill", "gray")
          .attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro4 + h_brandText + 18; }
						else { return margin.top + h_intro4 + h_brandText + sq_spacing + 18; }
					});

  // Move brand text down
  screen3.selectAll(".brandText")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow == 3) { return margin.top + h_intro4; }
           else if (gridsPerRow == 2) {
             if (i<=1) { return margin.top + h_intro4; }
             else { return margin.top + h_intro4 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
           }
           else {
             if (i==0) { return margin.top + h_intro4; }
             else if (i==1) { return margin.top + h_intro4 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
             else { return margin.top + h_intro4 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
           }
         });

	// Modify screen3's waffle chart/grid
	screen3.selectAll(".grid_rect")
         .on("mouseover", function(d) {} ) // remove mouseover feature
         .style("opacity", .25)
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro4 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro4 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
				 })
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
	screen3.selectAll(".countText")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
         .attr("y", function(d) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing*9 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText + h_spacing*7 + sq_spacing; }
             else { return margin.top + h_intro4 + h_brandText + h_spacing*5 + sq_spacing; }
           }
           else if (gridsPerRow==2) {
             if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing*9 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText + h_spacing*7 + sq_spacing; }
						 else { return margin.top + h_intro4 + h_brandText*2 + h_spacing*8.3 + sq_spacing*11;}
           }
           else {
             if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing/2 + sq_spacing*7 - sq_padding/2; }
             else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText*2 + h_spacing*2.5 + sq_spacing*17 - sq_padding/2; }
             else { return margin.top + h_intro4 + h_brandText*3 + h_spacing*5 + sq_spacing*22 - sq_padding/2; }
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
         .attr("y", function(d,i) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing*7.6 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText + h_spacing*5.6 + sq_spacing; }
             else { return margin.top + h_intro4 + h_brandText + h_spacing*3.6 + sq_spacing; }
           }
					 else if (gridsPerRow==2) {
             if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing*7.6 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText + h_spacing*5.6 + sq_spacing; }
						 else { return margin.top + h_intro4 + h_brandText*2 + h_spacing*7 + sq_spacing*11;}
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro4 + h_brandText + h_spacing/2 + sq_spacing*6; }
						 else if (d.network=="cnn") { return margin.top + h_intro4 + h_brandText*2 + h_spacing*2.5 + sq_spacing*16; }
						 else { return margin.top + h_intro4 + h_brandText*3 + h_spacing*5 + sq_spacing*21; }
					 }
				 });

} // end enter_screen4();

function enter_screen5() {

	// Screen 4 transitions
  screen4.selectAll(".introText")
 				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
         .style("fill", "none");

	// Screen 6 transitions
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
	screen5.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", margin.top)
         .style("fill", "black");

  // Brand text
  screen3.selectAll(".brandText")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow == 3) { return margin.top + h_intro5; }
           else if (gridsPerRow == 2) {
             if (i<=1) { return margin.top + h_intro5; }
             else { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
           }
           else {
             if (i==0) { return margin.top + h_intro5; }
             else if (i==1) { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
             else { return margin.top + h_intro5 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
           }
         });

  // Chyron back
  screen3.selectAll(".chyron_back")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing*7.6 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText + h_spacing*5.6 + sq_spacing; }
             else { return margin.top + h_intro5 + h_brandText + h_spacing*3.6 + sq_spacing; }
           }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing*7.6 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText + h_spacing*5.6 + sq_spacing; }
						 else { return margin.top + h_intro5 + h_brandText*2 + h_spacing*5.2 + sq_spacing*12;}
					 }
					 else {
             if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing/2 + sq_spacing*6; }
						 else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText*2 + h_spacing*2.5 + sq_spacing*16; }
						 else { return margin.top + h_intro5 + h_brandText*3 + h_spacing*5 + sq_spacing*21; }
					 }
				 });

  // Count text
  screen3.selectAll(".countText")
          .text(function(d) {
            if (d.network=="msnbc") {
              return "52%";
            }
            else if (d.network=="cnn") {
              return "60%";
            }
            else { return "33%"; }
          })
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing*9 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText + h_spacing*7 + sq_spacing; }
             else { return margin.top + h_intro5 + h_brandText + h_spacing*5 + sq_spacing; }
           }
           else if (gridsPerRow==2) {
             if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing*9 + sq_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText + h_spacing*7 + sq_spacing; }
						 else { return margin.top + h_intro5 + h_brandText*2 + h_spacing*8.3 + sq_spacing*11;}
           }
           else {
             if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing/2 + sq_spacing*7 - sq_padding/2; }
             else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText*2 + h_spacing*2.5 + sq_spacing*17 - sq_padding/2; }
             else { return margin.top + h_intro5 + h_brandText*3 + h_spacing*5 + sq_spacing*22 - sq_padding/2; }
           }
         });

	// Rect grids
	screen3.selectAll(".grid_rect") // change opacity
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro5 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro5 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro5 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
				 })
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
                   .attr("id", "chyron_rect")
                   .attr("x", function(d) {
                     if (gridsPerRow == 3) {
                       if (network=="msnbc") { return margin.left; }
                       else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron; }
                       else { return margin.left + w_btwnGrids*2 + w_chyron*2; }
                     }
                     else if (gridsPerRow == 2) {
                       if (network=="msnbc") { return margin.left; }
                       else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron; }
                       else { return (w-10*sq_spacing-w_description)/2; }
                     }
                     else { return margin.left; }
                   })
                   .attr("y", function() {
                     if (gridsPerRow == 3) {
                       if (network=="msnbc") { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*10; }
                       else { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*6; }
                     }
                     else if (gridsPerRow == 2) { return margin.top  + h_intro5 + h_brandText*2 + h_spacing*5 + sq_spacing*17; }
                     else { return margin.top  + h_intro5 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24; }
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
						screen5.append("text")
							 		 .attr("id", "mouseover_text")
									 .text(chyron)
                   .attr("x", function(d) {
                     if (gridsPerRow == 3) {
                      if (network=="msnbc") { return margin.left + w_chyron/2; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron + w_chyron/2; }
                      else { return margin.left + w_btwnGrids*2 + w_chyron*2 + w_chyron/2; }
                    }
                    else if (gridsPerRow == 2) {
                      if (network=="msnbc") { return margin.left + w_chyron/2; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron + w_chyron/2; }
                      else { return (w-10*sq_spacing-w_description)/2 + w_chyron/2; }
                    }
                    else { return margin.left + w_chyron/2; }
                   })
                   .attr("y", function() {
                      labelWidth = this.getComputedTextLength();
                      availWidth = w_chyron-10;
                      lines = Math.ceil(labelWidth/availWidth);
                      if (gridsPerRow == 3) {
                       if (network=="msnbc") {
                        if (lines <= 5) { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*10 + 30; }
                        else { return margin.top+ h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*10 + 20;}
                       }
                       else {
                        if (lines <= 5) { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*6 + 30; }
                        else { return margin.top + h_intro5 + h_brandText + h_spacing*2.5 + sq_spacing*6 + 20;}
                      }
                     }
                     else if (gridsPerRow == 2) {
                       if (lines<=5) { return margin.top + h_intro5 + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 30;}
                       else { return margin.top + h_intro5 + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 20;}
                     }
                     else {
                       if (lines<=5) { return margin.top + h_intro5 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 30; }
                       else { return margin.top + h_intro5 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 20; }
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
					 screen5.select("#chyron_rect").remove();
					 screen5.select("#mouseover_text").remove();
				 });

  // Description
  // Description/labels
  screen4.select("#ford_line")
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y1", function() {
            if (gridsPerRow >= 2) { return margin.top + h_intro5 + h_brandText + 15; }
            else { return margin.top + h_intro5 + h_brandText + sq_spacing + 15; }
          })
          .attr("y2", function() {
            if (gridsPerRow >= 2) { return margin.top + h_intro5 + h_brandText + 15; }
            else { return margin.top + h_intro5 + h_brandText + sq_spacing + 15; }
          })
          .style("stroke", "gray");
  screen4.select("#ford_descrip")
          .selectAll("tspan")
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y", function() {
            if (gridsPerRow >= 2) { return margin.top + h_intro5 + h_brandText + 18; }
            else { return margin.top + h_intro5 + h_brandText + sq_spacing + 18; }
          })
          .style("fill", "gray");
};  // end enter_screen5()

function enter_screen6() {

	// Transition from screen 5
	exit_screen5();
	screen3.selectAll(".grid_rect")
				 .filter(function(d) {
					 return (d.time>=ford_start & d.time<=ford_end);
				 })
				 .on("mouseover", function(d) {});
	// Transition from screen 7
	exit_screen7();

	// Intro text
	screen6.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", margin.top)
         .style("fill", "black");

  // Brand text
  screen3.selectAll(".brandText")
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow == 3) { return margin.top + h_intro6; }
           else if (gridsPerRow == 2) {
             if (i<=1) { return margin.top + h_intro6; }
             else { return margin.top + h_intro6 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
           }
           else {
             if (i==0) { return margin.top + h_intro6; }
             else if (i==1) { return margin.top + h_intro6 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
             else { return margin.top + h_intro6 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
           }
         });

	// Description/labels
	screen6.select("#kav_line")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
          .attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing*6 + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing*6 + 15; }
					})
          .style("stroke", "gray");
	screen6.select("#kav_descrip")
					.selectAll("tspan")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
          .attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 18; }
						else { return margin.top + h_intro6 + h_brandText +  sq_spacing*6 + 18; }
					})
          .style("fill", "gray");
	screen4.select("#ford_line")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
          .attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing + 15; }
					})
          .style("stroke", "gray");
	screen4.select("#ford_descrip")
					.selectAll("tspan")
					.transition()
					.duration(600)
          .ease(d3.easeLinear)
          .attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + 18; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing + 18; }
					})
          .style("fill", "gray");

	// Modify screen3's waffle chart/grid
	screen3.selectAll(".grid_rect")
         .on("mouseover", function(d) {}) // remove mouseover feature
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro6 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro6 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro6 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro6 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
				 })
				 .filter(function(d) {
					 return (d.time>=kav_start & d.time<=kav_end);
				 })
				 .style("opacity", 1);

   // Count text
   screen3.selectAll(".countText")
           .text(function(d) {
             if (d.network=="msnbc") {
               return "37";
             }
             else if (d.network=="cnn") {
               return "23";
             }
             else { return "38"; }
           })
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y", function(d) {
            if (gridsPerRow==3) {
              if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro6 + h_brandText + h_spacing*2.5 + sq_spacing; }
              else { return margin.top + h_intro6 + h_brandText + h_spacing*2; }
            }
            else if (gridsPerRow==2) {
              if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro6 + h_brandText + h_spacing*2.5 + sq_spacing; }
              else { return margin.top + h_intro6 + h_brandText*2 + h_spacing*3 + sq_spacing*12;}
            }
            else {
              if (d.network=="msnbc") { return margin.top + h_intro6 + h_brandText + h_spacing*2.5; }
              else if (d.network=="cnn") { return margin.top + h_intro6 + h_brandText*2 + h_spacing*5 + sq_spacing*11; }
              else { return margin.top + h_intro6 + h_brandText*3 + h_spacing*7.5 + sq_spacing*18; }
            }
          });
  // Chyron back
  screen3.selectAll(".chyron_back")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro6 + h_brandText + h_spacing + sq_spacing; }
             else { return margin.top + h_intro6 + h_brandText + h_spacing/2; }
           }
					 else if (gridsPerRow==2) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro6 + h_brandText + h_spacing*2.5; }
             else { return margin.top + h_intro6 + h_brandText*2 + h_spacing*3 + sq_spacing*11;}
					 }
					 else {
             if (d.network=="msnbc") { return margin.top + h_intro6 + h_brandText + h_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro6 + h_brandText*2 + h_spacing*3.5 + sq_spacing*11; }
             else { return margin.top + h_intro6 + h_brandText*3 + h_spacing*6 + sq_spacing*18; }
					 }
				 });
} // end enter_screen6

function enter_screen7() {
	// Transition from screen 6
	exit_screen6();

  // Transition from screen 8
  screen8.selectAll(".chyron_back")
         .style("fill", "none");
  screen8.selectAll(".countText")
         .style("fill", "none");
  screen8.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", -500)
				 .style("fill", "none");
  svgTool.attr("height", function() { // this is only the height of the last screen in scrolling
            if (gridsPerRow==3) { return margin.top + 100 + h_brandText + h_spacing*2.5 + sq_spacing*11; }
            else if (gridsPerRow==2) { return margin.top + 140 + h_brandText*2 + h_spacing*5 + sq_spacing*18 + h_chyron; }
            else { return margin.top + 140 + h_brandText*3 + h_spacing*7.5 + sq_spacing*25 + h_chyron*3; }
          });

	// Intro text
	screen7.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", margin.top)
         .style("fill", "black");

  // Brand text
  screen3.selectAll(".brandText")
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y", function(d,i) {
            if (gridsPerRow == 3) { return margin.top + h_intro7; }
            else if (gridsPerRow == 2) {
              if (i<=1) { return margin.top + h_intro7; }
              else { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
            }
            else {
              if (i==0) { return margin.top + h_intro7; }
              else if (i==1) { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
              else { return margin.top + h_intro7 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
            }
          });

  // Description/labels
 	screen6.select("#kav_line")
 					.transition()
 					.duration(600)
          .ease(d3.easeLinear)
          .attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro7 + h_brandText + sq_spacing*6 + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro7 + h_brandText + sq_spacing*6 + 15; }
					})
 	screen6.select("#kav_descrip")
 					.selectAll("tspan")
 					.transition()
 					.duration(600)
          .ease(d3.easeLinear)
          .attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + sq_spacing*3 + 18; }
						else { return margin.top + h_intro7 + h_brandText +  sq_spacing*6 + 18; }
					});
 	screen4.select("#ford_line")
 					.transition()
 					.duration(600)
           .ease(d3.easeLinear)
 					.style("stroke", "gray")
           .attr("y1", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + 15; }
 						else { return margin.top + h_intro7 + h_brandText + sq_spacing + 15; }
 					})
 					.attr("y2", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + 15; }
 						else { return margin.top + h_intro7 + h_brandText + sq_spacing + 15; }
 					});
 	screen4.select("#ford_descrip")
 					.selectAll("tspan")
 					.transition()
 					.duration(600)
           .ease(d3.easeLinear)
 					.style("fill", "gray")
           .attr("y", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro7 + h_brandText + 18; }
 						else { return margin.top + h_intro7 + h_brandText + sq_spacing + 18; }
 					});

   // Count text
   screen3.selectAll(".countText")
           .text(function(d) {
             if (d.network=="msnbc") {
  						 return "36%";
  					 }
  					 else if (d.network=="cnn") {
  						 return "33%";
  					 }
  					 else { return "62%"; }
           })
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y", function(d) {
            if (gridsPerRow==3) {
              if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing; }
              else { return margin.top + h_intro7 + h_brandText + h_spacing*2; }
            }
            else if (gridsPerRow==2) {
              if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing; }
              else { return margin.top + h_intro7 + h_brandText*2 + h_spacing*3 + sq_spacing*12;}
            }
            else {
              if (d.network=="msnbc") { return margin.top + h_intro7 + h_brandText + h_spacing*2.5; }
              else if (d.network=="cnn") { return margin.top + h_intro7 + h_brandText*2 + h_spacing*5 + sq_spacing*11; }
              else { return margin.top + h_intro7 + h_brandText*3 + h_spacing*7.5 + sq_spacing*18; }
            }
          });

  // Chyron back
  screen3.selectAll(".chyron_back")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
         .attr("y", function(d,i) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro7 + h_brandText + h_spacing + sq_spacing; }
             else { return margin.top + h_intro7 + h_brandText + h_spacing/2; }
           }
					 else if (gridsPerRow==2) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro7 + h_brandText + h_spacing*2.5; }
             else { return margin.top + h_intro7 + h_brandText*2 + h_spacing*3 + sq_spacing*11;}
					 }
					 else {
             if (d.network=="msnbc") { return margin.top + h_intro7 + h_brandText + h_spacing; }
             else if (d.network=="cnn") { return margin.top + h_intro7 + h_brandText*2 + h_spacing*3.5 + sq_spacing*11; }
             else { return margin.top + h_intro7 + h_brandText*3 + h_spacing*6 + sq_spacing*18; }
					 }
				 });

	// Waffle chart/grid
	// Rect grids
	screen3.selectAll(".grid_rect") // add mouseover feature
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro7 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro7 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro7 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro7 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
				 });
  screen3.selectAll(".grid_rect")
         .filter(function(d) {
					 return (d.time>=kav_start & d.time<=kav_end);
				 })
			 	 .on("mouseover", function(d) {
					 var network = d.network;
					 screen7.append("rect")
					 				.attr("id", "mouseover_rect")
                  .attr("x", function(d) {
                    if (gridsPerRow == 3) {
                      if (network=="msnbc") { return margin.left; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron; }
                      else { return margin.left + w_btwnGrids*2 + w_chyron*2; }
                    }
                    else if (gridsPerRow == 2) {
                      if (network=="msnbc") { return margin.left; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron; }
                      else { return (w-10*sq_spacing-w_description)/2; }
                    }
                    else { return margin.left; }
                  })
                  .attr("y", function() {
                    if (gridsPerRow == 3) {
                      if (network=="msnbc") { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*10; }
                      else { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*6; }
                    }
                    else if (gridsPerRow == 2) { return margin.top  + h_intro7 + h_brandText*2 + h_spacing*5 + sq_spacing*17; }
                    else { return margin.top  + h_intro7 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24; }
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
                     if (gridsPerRow == 3) {
                      if (network=="msnbc") { return margin.left + w_chyron/2; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron + w_chyron/2; }
                      else { return margin.left + w_btwnGrids*2 + w_chyron*2 + w_chyron/2; }
                    }
                    else if (gridsPerRow == 2) {
                      if (network=="msnbc") { return margin.left + w_chyron/2; }
                      else if (network=="cnn") { return margin.left + w_btwnGrids + w_chyron + w_chyron/2; }
                      else { return (w-10*sq_spacing-w_description)/2 + w_chyron/2; }
                    }
                    else { return margin.left + w_chyron/2; }
                   })
                   .attr("y", function() {
                      labelWidth = this.getComputedTextLength();
                      availWidth = w_chyron-10;
                      lines = Math.ceil(labelWidth/availWidth);
                      if (gridsPerRow == 3) {
                       if (network=="msnbc") {
                        if (lines <= 5) { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*10 + 30; }
                        else { return margin.top+ h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*10 + 20;}
                       }
                       else {
                        if (lines <= 5) { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*6 + 30; }
                        else { return margin.top + h_intro7 + h_brandText + h_spacing*2.5 + sq_spacing*6 + 20;}
                      }
                     }
                     else if (gridsPerRow == 2) {
                       if (lines<=5) { return margin.top + h_intro7 + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 30;}
                       else { return margin.top + h_intro7 + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 20;}
                     }
                     else {
                       if (lines<=5) { return margin.top + h_intro7 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 30; }
                       else { return margin.top + h_intro7 + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 20; }
                     }
                   })
									 .style("text-anchor", "middle")
									 .style("font-size", function() {
                     if (lines <= 4) { return 14; }
                     else if (lines <=5) { return 14 - Math.ceil(lines/4)*.5 + "px"; }
 										 else { return 14 - Math.ceil(lines/2)*.5 + "px";}
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
	exit_screen7();
	screen3.selectAll(".grid_rect") // remove mouseover function
				 .on("mouseover", function(d) {} );

  // Change svg height
  svgTool.attr("height", function() { // this is only the height of the last screen in scrolling
            if (gridsPerRow==3) { return margin.top + 40 + h_brandText + h_spacing*2.5 + sq_spacing*11; }
            else if (gridsPerRow==2) { return margin.top + 80 + h_brandText*2 + h_spacing*5 + sq_spacing*18; }
            else { return margin.top + 80 + h_brandText*3 + h_spacing*7.5 + sq_spacing*25; }
          });

	// Move or add or adjust
	// Intro text
	screen8.selectAll(".introText")
				 .selectAll("tspan")
				 .transition()
				 .duration(600)
				 .ease(d3.easeLinear)
				 .attr("y", margin.top)
         .style("fill", "black");

   // Brand text
   screen3.selectAll(".brandText")
          .transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("y", function(d,i) {
            if (gridsPerRow == 3) { return margin.top + h_intro8; }
            else if (gridsPerRow == 2) {
              if (i<=1) { return margin.top + h_intro8; }
              else { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
            }
            else {
              if (i==0) { return margin.top + h_intro8; }
              else if (i==1) { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
              else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
            }
          });

	// Move grid
	screen3.selectAll(".grid_rect")
				 .transition()
				 .duration(400)
				 .ease(d3.easeLinear)
         .attr("y", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
						 }
						 else if (d.network=="cnn") {
							 return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
						 }
						 else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
						 else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
						 else { return margin.top + h_intro8 + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
					 }
				 });

  // Count text
  screen8.selectAll(".countText")
         .text(function(d) {
            if (d.network=="msnbc") {
              return "36%";
            }
            else if (d.network=="cnn") {
              return "33%";
            }
            else { return "62%"; }
          })
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .style("fill", "black");
  screen3.selectAll(".countText")
         .text(function(d) {
            if (d.network=="msnbc") {
              return "52%";
            }
            else if (d.network=="cnn") {
              return "60%";
            }
            else { return "33%"; }
         })
         .transition()
         .duration(600)
         .ease(d3.easeLinear)
         .attr("y", function(d) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing; }
             else { return margin.top + h_intro8 + h_brandText + h_spacing*2; }
           }
           else if (gridsPerRow==2) {
             if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing; }
             else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*3 + sq_spacing*12;}
           }
           else {
             if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5; }
             else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + sq_spacing*11; }
             else { return margin.top + h_intro8 + h_brandText*3 + h_spacing*7.5 + sq_spacing*18; }
           }
         });

 // Chyron back
 screen8.selectAll(".chyron_back")
        .transition()
        .duration(600)
        .ease(d3.easeLinear)
        .style("fill", "white");
 screen3.selectAll(".chyron_back")
        .transition()
        .duration(600)
        .ease(d3.easeLinear)
        .attr("y", function(d,i) {
          if (gridsPerRow==3) {
            if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing + sq_spacing; }
            else { return margin.top + h_intro8 + h_brandText + h_spacing/2; }
          }
          else if (gridsPerRow==2) {
            if (d.network=="msnbc" | d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5; }
            else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*3 + sq_spacing*11;}
          }
          else {
            if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing; }
            else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText*2 + h_spacing*3.5 + sq_spacing*11; }
            else { return margin.top + h_intro8 + h_brandText*3 + h_spacing*6 + sq_spacing*18; }
          }
        });

  // Description/labels
 	screen6.select("#kav_line")
 					.transition()
 					.duration(600)
          .ease(d3.easeLinear)
          .attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro8 + h_brandText + sq_spacing*6 + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro8 + h_brandText + sq_spacing*6 + 15; }
					})
 	screen6.select("#kav_descrip")
 					.selectAll("tspan")
 					.transition()
 					.duration(600)
          .ease(d3.easeLinear)
          .attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + sq_spacing*3 + 18; }
						else { return margin.top + h_intro8 + h_brandText +  sq_spacing*6 + 18; }
					});
 	screen4.select("#ford_line")
 					.transition()
 					.duration(600)
           .ease(d3.easeLinear)
 					.style("stroke", "gray")
           .attr("y1", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + 15; }
 						else { return margin.top + h_intro8 + h_brandText + sq_spacing + 15; }
 					})
 					.attr("y2", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + 15; }
 						else { return margin.top + h_intro8 + h_brandText + sq_spacing + 15; }
 					});
 	screen4.select("#ford_descrip")
 					.selectAll("tspan")
 					.transition()
 					.duration(600)
           .ease(d3.easeLinear)
 					.style("fill", "gray")
           .attr("y", function() {
 						if (gridsPerRow >= 2) { return margin.top + h_intro8 + h_brandText + 18; }
 						else { return margin.top + h_intro8 + h_brandText + sq_spacing + 18; }
 					});

} // end enter_screen8

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

  screen11Entered = true; // set value to true now that it has entered
}; // end enter function

/////////////////////////////////////////////////////
// Exit functions
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
