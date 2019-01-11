//////////////////////////////////////////////////////////////////////////////////////////
function otherScreens() {









	// 8: Summary
	// Intro text
	screen8.append("text")
				 .attr("class", "introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("Here's the breakdown for the three networks again. MSNBC and CNN were more likely to show varied chyrons during Ford's hearing, and Fox News during Kavanaugh's hearing.")
				 .call(wrap, w-20);
	screen8.selectAll(".introText")
				 .selectAll("tspan")
				 .attr("y", -500);

	// White rectangles
	screen8.selectAll("chyron_back8")
				 .data(intro_dataset)
				 .enter()
				 .append("rect")
				 .attr("class", "chyron_back8")
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron+sq_spacing*4;
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(sq_spacing*14);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(sq_spacing*24); }
				 })
				 .attr("width", sq_spacing*2)
				 .attr("height", 30)
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "none")
				 .style("opacity", 0.95);

	// Ford %
	screen8.selectAll("countText")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "countText")
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "52%";
					 }
					 else if (d.network=="cnn") {
						 return "60%";
					 }
					 else { return "33%"; }
				 })
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron+sq_spacing*5-(sq_padding/2);
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(sq_spacing*15)-(sq_padding/2);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(sq_spacing*25)-(sq_padding/2); }
				 })
				 .attr("y", 340)
				 .style("fill", "none");
};
