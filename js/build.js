// DEFINING MEASUREMENTS
// Define svg and margins
var w_doc = window.innerWidth;
var w = w_doc*.9; // based on CSS rules its 93% but I want it a little smaller
var h = window.innerHeight;
var initialLeft = 10;
var initialRight = 10;
var w_btwnGrids = 30;
var h_brandText = 15;
var w_description = 65;
// Grid
var h_spacing = 15;
var max_rows = 11; // max number of rows
var sq_size = 17; // width/height of each square
var sq_spacing = 22; // spacing between start of one square and start of another square
var sq_padding = sq_spacing-sq_size; // padding between squares
// Figure out how many to display in one row
if (w >= initialLeft + w_btwnGrids*2 + w_chyron*3 + w_description + initialRight) {
	var gridsPerRow = 3;
	var margin = { top: 15, bottom: 10, left:(w - w_chyron*3 - w_btwnGrids*2 - w_description)/2, right: (w - w_chyron*3 - w_btwnGrids*2 - w_description)/2};
}
else if (w >= initialLeft + w_btwnGrids + w_chyron*2 + w_description + initialRight) {
	var gridsPerRow = 2;
	var margin = { top: 15, bottom: 10, left:(w - w_chyron*2 - w_btwnGrids - w_description)/2, right: (w - w_chyron*2 - w_btwnGrids - w_description)/2};
}
else {
	var gridsPerRow = 1;
	var margin = { top: 15, bottom: 10, left:(w - w_chyron - w_description)/2, right: (w - w_chyron - w_description)/2};
};
// Create svg
var svg = d3.select("#scroll-svg")
						.attr("width", "100%")
						.attr("height", function() { // this is only the height of the last screen in scrolling
							if (gridsPerRow==3) { return margin.top + 60 + h_brandText + h_spacing*2.5 + sq_spacing*11; }
							else if (gridsPerRow==2) { return margin.top + 80 + h_brandText*2 + h_spacing*5 + sq_spacing*18; }
							else { return margin.top + 80 + h_brandText*3 + h_spacing*7.5 + sq_spacing*25; }
						});
// DEFINING CONVERSION FUNCTIONS
// Convert variable data types
var rowConverter = function(d) {
	return {
		time: parseTime("9/28/18 " + d.time),
		chyron: d.chyron,
		network: d.network
	};
};

// DEFINING DATASETS
// This is a convenient dataset to have because it just has three data points with the three networks - can be used
// for various things that require the 3 networks.
var intro_dataset = [{network: "msnbc", chyron: "KAVANAUGH: I WILL NOT WITHDRAW FROM THIS PROCESS"},
										 {network: "cnn", chyron: "CHRISTINE BLASEY FORD ABOUT TO TESTIFY ON KAVANAUGH ALLEGATIONS"},
									 	 {network: "fox", chyron: "SEN. GRASSLEY (R-IA) DELIVERS OPENING STATEMENTS"}];

// Ford and Kavanaugh start/end times
var ford_start = parseTime("9/28/18 10:03:00");
var ford_end = parseTime("9/28/18 14:18:00");
var kav_start = parseTime("9/28/18 15:07:00");
var kav_end = parseTime("9/28/18 18:44:00");

// BUILD SCREENS
var dataset;
var screen3 = svg.append("g");
var screen4 = svg.append("g");
var screen5 = svg.append("g");
var screen6 = svg.append("g");
var screen7 = svg.append("g");
var screen8 = svg.append("g");

//////////////////////////////////////////////////////////////////////////////////////////
// Screen 3
if (w_doc>=1003) { var h_intro3 = 60; }
else if (w_doc>=519) { var h_intro3 = 70; }
else if (w_doc>=400) { var h_intro3 = 80; }
else { var h_intro3 = 70; }
function setup_screen3() {
	// 3: All chyrons grid
	// Intro text
	screen3.append("text")
				 .attr("class", "introText")
				 .text("Between 9:50 a.m. and 7:15 p.m., MSNBC showed over 100 different chyrons, while Fox News showed 61. CNN fell between the two at 70.")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .call(wrap, (w - 20));

	// Brand text
	screen3.selectAll("brandText")
					.data(intro_dataset)
					.enter()
					.append("text")
					.text(function(d) {
						if (d.network=="cnn") {
							return "CNN";
						}
						else if (d.network=="msnbc") {
							return "MSNBC";
						}
						else { return "Fox News"; }
					})
					.attr("class", "brandText")
					.attr("x", function(d, i) {
            if (gridsPerRow == 3) {
							if (i==0) { return margin.left + w_chyron/2; }
	            else if (i==1) { return margin.left + w_chyron*1.5 + w_btwnGrids; }
	            else { return margin.left + w_chyron*2.5 + w_btwnGrids*2; }
						}
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin.left + w_chyron/2 + i*(w_chyron + w_btwnGrids); }
							else { return margin.left + (10.5*sq_spacing); }
						}
						else { return margin.left + (w_chyron/2); }
          })
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

	// Grid / waffle chart
	screen3.selectAll("grid_rect")
				 .data(dataset)
				 .enter()
				 .filter(function(d) {
					 return d.chyron!="";
				 })
				 .append("rect")
				 .attr("class", "grid_rect")
				 .attr("x", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.left + (i % 10 * sq_spacing);
						 }
						 else if (d.network=="cnn") {
							 return margin.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
						 }
						 else { return margin.left + w_btwnGrids*2 + (20*sq_spacing) + ((i-173) % 10 * sq_spacing); };
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.left + (i % 10 * sq_spacing);
						 }
						 else if (d.network=="cnn") {
							 return margin.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
						 }
						 else { return (w-w_chyron-w_description)/2 + ((i-173) % 10 * sq_spacing); }
					 }
					 else {
						 if (d.network=="msnbc") { return (w-w_chyron-w_description)/2 + (i % 10 * sq_spacing); }
						 else if (d.network=="cnn") { return (w-w_chyron-w_description)/2 + ((i-103) % 10 * sq_spacing); }
						 else { return (w-w_chyron-w_description)/2 + ((i-173) % 10 * sq_spacing); }
					 }
				 })
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
				 .style("stroke", "none")
				 .attr("width", sq_size)
				 .attr("height", sq_size);

	// Chyron count number rectangle shading
	screen3.selectAll("chyron_back")
				 .data(intro_dataset)
				 .enter()
				 .append("rect")
				 .attr("class", "chyron_back")
				 .attr("x", function(d) {
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*24); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + (9.5*sq_spacing); }
					 }
					 else { return margin.left + 4*sq_spacing; }
				 })
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
				 .attr("width", sq_spacing*2)
				 .attr("height", 30)
				 .style("fill","white")
				 .style("opacity", 0.95);

	// Chyron count number text
	screen3.selectAll("countText")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "countText")
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "103";
					 }
					 else if (d.network=="cnn") {
						 return "70";
					 }
					 else { return "61"; }
				 })
				 .attr("x", function(d) {
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15) - (sq_padding/2); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*25) - (sq_padding/2); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15)-(sq_padding/2); }
						 else { return margin.left + (10.5*sq_spacing); }
					 }
					 else { return margin.left + w_chyron/2; }
				 })
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
				 });
}; // end setup screen3

function resize_screen3() {
	if (w_doc>=1003) { h_intro3 = 60; }
	else if (w_doc>=519) { h_intro3 = 70; }
	else if (w_doc>=400) { h_intro3 = 80; }
	else { h_intro3 = 70; }

	screen3.select(".introText")
				 .text("Between 9:50 a.m. and 7:15 p.m., MSNBC showed over 100 different chyrons, while Fox News showed 61. CNN fell between the two at 70.")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .call(wrap, (w - 20));

	// Brand text
	screen3.selectAll(".brandText")
					.attr("x", function(d, i) {
            if (gridsPerRow == 3) {
							if (i==0) { return margin.left + w_chyron/2; }
	            else if (i==1) { return margin.left + w_chyron*1.5 + w_btwnGrids; }
	            else { return margin.left + w_chyron*2.5 + w_btwnGrids*2; }
						}
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin.left + w_chyron/2 + i*(w_chyron + w_btwnGrids); }
							else { return margin.left + (10.5*sq_spacing); }
						}
						else { return margin.left + (w_chyron/2); }
          })
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

	// Grid / waffle chart
	screen3.selectAll(".grid_rect")
				 .attr("x", function(d,i) {
					 if (gridsPerRow == 3) {
						 if (d.network=="msnbc") {
							 return margin.left + (i % 10 * sq_spacing);
						 }
						 else if (d.network=="cnn") {
							 return margin.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
						 }
						 else { return margin.left + w_btwnGrids*2 + (20*sq_spacing) + ((i-173) % 10 * sq_spacing); };
					 }
					 else if (gridsPerRow == 2) {
						 if (d.network=="msnbc") {
							 return margin.left + (i % 10 * sq_spacing);
						 }
						 else if (d.network=="cnn") {
							 return margin.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
						 }
						 else { return (w-w_chyron-w_description)/2 + ((i-173) % 10 * sq_spacing); }
					 }
					 else {
						 if (d.network=="msnbc") { return (w-w_chyron-w_description)/2 + (i % 10 * sq_spacing); }
						 else if (d.network=="cnn") { return (w-w_chyron-w_description)/2 + ((i-103) % 10 * sq_spacing); }
						 else { return (w-w_chyron-w_description)/2 + ((i-173) % 10 * sq_spacing); }
					 }
				 })
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
				 });

	// Chyron count number rectangle shading
	screen3.selectAll(".chyron_back")
				 .attr("x", function(d) {
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*24); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + (9.5*sq_spacing); }
					 }
					 else { return margin.left + 4*sq_spacing; }
				 })
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
				 });

	// Chyron count number text
	screen3.selectAll(".countText")
				 .attr("x", function(d) {
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15) - (sq_padding/2); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*25) - (sq_padding/2); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15)-(sq_padding/2); }
						 else { return margin.left + (10.5*sq_spacing); }
					 }
					 else { return margin.left + w_chyron/2; }
				 })
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
				 });
}; // end resize screen 3

//////////////////////////////////////////////////////////////////////////////////////////
// Screen 4
if (w_doc>=948) { var h_intro4 = 80; }
else if (w_doc>=711) { var h_intro4 = 100; }
else if (w_doc>=579) { var h_intro4 = 120; }
else if (w_doc>=490) { var h_intro4 = 140; }
else if (w_doc>=431) { var h_intro4 = 160; }
else if (w_doc>=400) { var h_intro4 = 180; }
else { var h_intro4 = 140; }
function setup_screen4() {
	// 4: Ford grid
	// Intro text
	screen4.append("text")
				 .attr("class", "introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("Let's break up the chyrons into those that appeared during Ford's hearing and those that appeared during Kavanaugh's hearing. During Ford’s hearing, MSNBC changed their chyrons the most and Fox News the least. But that could be a function of the total number of chyrons shown (since we've already seen that MSNBC showed more chyrons overall compared to the other two networks).")
				 .call(wrap, (w - 20));
	screen4.selectAll("tspan")
				 .attr("y", -500);

	// Label "captions during Ford's hearing"
	screen4.append("text")
					.attr("id", "ford_descrip")
					.attr("class", "descriptionText")
					.text("Chyrons during Ford's hearing")
					.attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro3 + h_brandText + 18; }
						else { return margin.top + h_intro3 + h_brandText + sq_spacing + 18; }
					}) // using h_intro3 so it moves down in the transition with others
					.attr("x", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 + 10; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 + 10; }
						else { return margin.left + w_chyron + 10; }
					})
					.call(wrap, w_description)
					.style("fill", "none");
	screen4.append("line")
					.attr("id", "ford_line")
					.attr("class", "descriptionLine")
					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 - 3; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 - 3; }
						else { return margin.left + w_chyron - 3; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 + 5; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 + 5; }
						else { return margin.left + w_chyron + 5; }
					})
					.attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro3 + h_brandText + 15; }
						else { return margin.top + h_intro3 + h_brandText + sq_spacing + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro3 + h_brandText + 15; }
						else { return margin.top + h_intro3 + h_brandText + sq_spacing + 15; }
					})
					.style("stroke", "none");
}; // end setup screen 4
function resize_screen4() {
	if (w_doc>=948) { h_intro4 = 80; }
	else if (w_doc>=711) { h_intro4 = 100; }
	else if (w_doc>=579) { h_intro4 = 120; }
	else if (w_doc>=490) { h_intro4 = 140; }
	else if (w_doc>=431) { h_intro4 = 160; }
	else if (w_doc>=400) { h_intro4 = 180; }
	else { h_intro4 = 140; }
	// Intro text
	screen4.select(".introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("Let's break up the chyrons into those that appeared during Ford's hearing and those that appeared during Kavanaugh's hearing. During Ford’s hearing, MSNBC changed their chyrons the most and Fox News the least. But that could be a function of the total number of chyrons shown (since we've already seen that MSNBC showed more chyrons overall compared to the other two networks).")
				 .call(wrap, (w - 20));
}; // end resize screen4
//////////////////////////////////////////////////////////////////////////////////////////
// Screen 5
if (w_doc>=906) { var h_intro5 = 80; }
else if (w_doc>=688) { var h_intro5 = 100; }
else if (w_doc>=564) { var h_intro5 = 120; }
else if (w_doc>=468) { var h_intro5 = 140; }
else if (w_doc>=413) { var h_intro5 = 160; }
else if (w_doc>=400) { var h_intro5 = 180; }
else { var h_intro5 = 120; }
function setup_screen5() {
	// 5: Ford rebased
	// Intro text
	screen5.append("text")
				 .attr("class", "introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("But when we look at the proportion of chyrons displayed during Ford’s hearing out of all chyrons shown,we find that at least half of MSNBC’s and CNN’s chyrons occurred during Ford’s hearing, compared with a third of Fox News’ chyrons - meaning Fox News was less likely to give varied reports of Ford’s hearing. Scroll over each square to read the chyron that was displayed.")
				 .call(wrap, w-20);
	screen5.selectAll(".introText")
				 .selectAll("tspan")
				 .attr("y", -500);
}; // end setup screen5
function resize_screen5() {
	if (w_doc>=906) { h_intro5 = 80; }
	else if (w_doc>=688) { h_intro5 = 100; }
	else if (w_doc>=564) { h_intro5 = 120; }
	else if (w_doc>=468) { h_intro5 = 140; }
	else if (w_doc>=413) { h_intro5 = 160; }
	else if (w_doc>=400) { h_intro5 = 180; }
	else { h_intro5 = 120; }
	screen5.selectAll(".introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("But when we look at the proportion of chyrons displayed during Ford’s hearing out of all chyrons shown,we find that at least half of MSNBC’s and CNN’s chyrons occurred during Ford’s hearing, compared with a third of Fox News’ chyrons - meaning Fox News was less likely to give varied reports of Ford’s hearing. Scroll over each square to read the chyron that was displayed.")
				 .call(wrap, w-20);
}; // end resize screen 5
//////////////////////////////////////////////////////////////////////////////////////////
// Screen 6
if (w_doc>=410 | w_doc<400) { var h_intro6 = 40; }
else { var h_intro6 = 60; }
function setup_screen6() {
	// 6: Kavanaugh number
	// Intro text
	screen6.append("text")
				 .attr("class", "introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("And here are the numbers during Kavanaugh's hearing.")
				 .call(wrap, w-20);
	screen6.selectAll(".introText")
				 .selectAll("tspan")
				 .attr("y", -500);

	// Label "captions during Kav's hearing"
	screen6.append("text")
					.attr("id", "kav_descrip")
					.attr("class", "descriptionText")
					.text("Chyrons during Kavanaugh's hearing")
					.attr("y", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 18; }
						else { return margin.top + h_intro6 + h_brandText +  sq_spacing*6 + 18; }
					})
					.attr("x", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 + 10; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 + 10; }
						else { return margin.left + w_chyron + 10; }
					})
					.call(wrap, 70)
					.style("fill", "none");
	screen6.append("line")
					.attr("id", "kav_line")
					.attr("class", "descriptionLine")
					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 - 3; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 - 3; }
						else { return margin.left + w_chyron - 3; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin.left + w_btwnGrids*2 + w_chyron*3 + 5; }
						else if (gridsPerRow == 2) { return margin.left + w_btwnGrids + w_chyron*2 + 5; }
						else { return margin.left + w_chyron + 5; }
					})
					.attr("y1", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing*6 + 15; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin.top + h_intro6 + h_brandText + sq_spacing*3 + 15; }
						else { return margin.top + h_intro6 + h_brandText + sq_spacing*6 + 15; }
					})
					.style("stroke-width", 1)
					.style("stroke", "none");
}; // end setup screen6
function resize_screen6() {
	if (w_doc>=410 | w_doc<400) { h_intro6 = 40; }
	else { h_intro6 = 60; }
	screen6.selectAll(".introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("And here are the numbers during Kavanaugh's hearing.")
				 .call(wrap, w-20);
}; // end resize screen6

//////////////////////////////////////////////////////////////////////////////////////////
// Screen 7
if (w_doc>=1352) { var h_intro7 = 40; }
else if (w_doc>=688) { var h_intro7 = 60; }
else { var h_intro7 = 80; }
function setup_screen7() {
	// 7: Kavanaugh rebased
	// Intro text
	screen7.append("text")
				 .attr("class", "introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("About a third of chyrons by MSNBC and CNN occurred during Kavanaugh's hearing, compared with 62% of Fox News' chyrons. Scroll over each square to read the chyron that was displayed.")
				 .call(wrap, w-20);
	screen7.selectAll(".introText")
				 .selectAll("tspan")
				 .attr("y", -500);

}; // end setup screen7
function resize_screen7() {
	if (w_doc>=1352) { h_intro7 = 40; }
	else if (w_doc>=688) { h_intro7 = 60; }
	else { h_intro7 = 80; }
	screen7.select(".introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("About a third of chyrons by MSNBC and CNN occurred during Kavanaugh's hearing, compared with 62% of Fox News' chyrons. Scroll over each square to read the chyron that was displayed.")
				 .call(wrap, w-20);
}; // end resize screen7

//////////////////////////////////////////////////////////////////////////////////////////
// Screen 8
if (w_doc>=1254) { var h_intro8 = 40; }
else if (w_doc>=639) { var h_intro8 = 60; }
else { var h_intro8 = 80; }
function setup_screen8() {
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
	screen8.selectAll("chyron_back2")
				 .data(intro_dataset)
				 .enter()
				 .append("rect")
				 .attr("class", "chyron_back")
				 .attr("x", function(d) {
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*24); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*4; }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*14); }
						 else { return margin.left + (9.5*sq_spacing); }
					 }
					 else { return margin.left + 4*sq_spacing; }
				 })
				 .attr("width", sq_spacing*2)
				 .attr("height", 30)
				 .attr("y", function(d,i) {
           if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*6; }
             else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*4; }
             else { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*2; }
           }
					 else if (gridsPerRow==2) {
             if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*6; }
             else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*4; }
						 else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + sq_spacing*13;}
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*6; }
						 else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + sq_spacing*15; }
						 else { return margin.top + h_intro8 + h_brandText*3 + h_spacing*7.5 + sq_spacing*20; }
					 }
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
					 if (gridsPerRow==3) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15) - (sq_padding/2); }
						 else { return margin.left + w_btwnGrids*2 + (sq_spacing*25) - (sq_padding/2); }
					 }
					 else if (gridsPerRow==2) {
						 if (d.network=="msnbc") { return margin.left + sq_spacing*5 - (sq_padding/2); }
						 else if (d.network=="cnn") { return margin.left + w_btwnGrids + (sq_spacing*15)-(sq_padding/2); }
						 else { return margin.left + (10.5*sq_spacing); }
					 }
					 else { return margin.left + w_chyron/2; }
				 })
				 .attr("y", function(d) {
					 if (gridsPerRow==3) {
             if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*7; }
             else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*5; }
             else { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*3; }
           }
					 else if (gridsPerRow==2) {
             if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*7; }
             else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*5; }
						 else { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + sq_spacing*14;}
					 }
					 else {
						 if (d.network=="msnbc") { return margin.top + h_intro8 + h_brandText + h_spacing*2.5 + sq_spacing*7; }
						 else if (d.network=="cnn") { return margin.top + h_intro8 + h_brandText*2 + h_spacing*5 + sq_spacing*16; }
						 else { return margin.top + h_intro8 + h_brandText*3 + h_spacing*7.5 + sq_spacing*21; }
					 }
				 })
				 .style("fill", "none");
}; // end setup screen8
function resize_screen8() {
	if (w_doc>=1254) { h_intro8 = 40; }
	else if (w_doc>=639) { h_intro8 = 60; }
	else { h_intro8 = 80; }
	screen8.select(".introText")
				 .attr("x", 10)
				 .attr("y", margin.top)
				 .text("Here's the breakdown for the three networks again. MSNBC and CNN were more likely to show varied chyrons during Ford's hearing, and Fox News during Kavanaugh's hearing.")
				 .call(wrap, w-20);
}; // end resize screen8

//////////////////////////////////////////////////////////////////////////////////////////
// Screen 11
var screen11 = d3.select("#svg-screen11");
var screen11Entered = false;
if (gridsPerRow == 3) {
	var margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron*3 - w_btwnGrids*2 - w_description)/2, right: (w_doc - w_chyron*3 - w_btwnGrids*2 - w_description)/2};
	document.getElementById("svg-screen11").style.height = margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*11 + h_chyron;
}
else if (gridsPerRow == 2) {
	var margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron*2 - w_btwnGrids - w_description)/2, right: (w_doc - w_chyron*2 - w_btwnGrids - w_description)/2};
	document.getElementById("svg-screen11").style.height = margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*18 + h_chyron;
}
else {
	var margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron - w_description)/2, right: (w_doc - w_chyron - w_description)/2};
	document.getElementById("svg-screen11").style.height = margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*25 + h_chyron;
};
function setup_screen11() {
	//
	screen11.selectAll("brandText")
	 				.data(intro_dataset)
					.enter()
					.append("text")
					.text(function(d) {
						if (d.network=="cnn") {
							return "CNN";
						}
						else if (d.network=="msnbc") {
							return "MSNBC";
						}
						else { return "Fox News"; }
					})
					.attr("class", "brandText")
  			  .attr("y", function(d,i) {
						if (gridsPerRow == 3) { return margin11.top; }
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin11.top; }
							else { return margin11.top + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
						}
						else {
							if (i==0) { return margin11.top; }
							else if (i==1) { return margin11.top + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
							else { return margin11.top + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
						}
					})
          .attr("x", function(d, i) {
            if (gridsPerRow == 3) {
							if (i==0) { return margin11.left + (5 * sq_spacing) - sq_spacing/2; }
	            else if (i==1) { return margin11.left + (10 * sq_spacing)*3/2 - sq_spacing/2 + w_btwnGrids; }
	            else { return margin11.left + (5 * sq_spacing)*5 - sq_spacing/2 + w_btwnGrids*2; }
						}
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin11.left + (w_chyron + w_btwnGrids)*i + w_chyron/2 - sq_spacing/2; }
							else { return (w_doc - w_description - sq_spacing)/2; }
						}
						else { return margin11.left + w_chyron/2 - sq_spacing/2; }
          });

 	screen11.selectAll("grid_circle")
 				  .data(dataset)
 					.enter()
 					.filter(function(d) {
 						return d.chyron!="";
 					})
 					.append("circle")
 					.attr("class", "grid_circle")
 					.attr("cx", function(d,i) {
 						if (gridsPerRow == 3) {
							if (d.network=="msnbc") {
	 							return margin11.left + (i % 10 * sq_spacing);
	 						}
	 						else if (d.network=="cnn") {
	 							return margin11.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
	 						}
	 						else { return margin11.left + w_btwnGrids*2 + (20*sq_spacing) + ((i-173) % 10 * sq_spacing); };
						}
						else if (gridsPerRow == 2) {
							if (d.network=="msnbc") {
	 							return margin11.left + (i % 10 * sq_spacing);
	 						}
	 						else if (d.network=="cnn") {
	 							return margin11.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
	 						}
							else { return (w_doc - w_chyron - w_description)/2 + ((i-173) % 10 * sq_spacing); }
						}
						else {
							if (d.network=="msnbc") { return margin11.left + (i % 10 * sq_spacing); }
							else if (d.network=="cnn") { return margin11.left + ((i-103) % 10 * sq_spacing); }
							else { return margin11.left + ((i-173) % 10 * sq_spacing); }
						}
 					})
					.attr("cy", function(d,i) {
						if (gridsPerRow == 3) {
							if (d.network=="msnbc") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
							}
							else if (d.network=="cnn") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
							}
							else { return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
						}
						else if (gridsPerRow == 2) {
							if (d.network=="msnbc") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
							}
							else if (d.network=="cnn") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
							}
							else { return margin11.top + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
						}
						else {
							if (d.network=="msnbc") { return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
							else if (d.network=="cnn") { return margin11.top + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
							else { return margin11.top + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
						}
					})
 					.attr("r", sq_size-8)
 					.style("fill", function(d) {
 						if (d.network=="msnbc") {
 								 return yellow;
 							 }
 							 else if (d.network=="cnn") {
 								 return red;
 							 }
 							 else { return blue; }
 					  })
 				  .style("opacity", .25);

 	// F and K legend/key
 	screen11.append("text")
 					.attr("id", "ford_descrip")
 					.attr("class", "descriptionText")
 					.text("Chyrons quoting Ford")
 					.attr("y", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 5; }
						else { return margin11.top + h_brandText + sq_spacing + 5; }
					})
 					.attr("x", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 + 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 + 2; }
						else { return margin11.left + w_chyron + 2; }
					})
 					.call(wrap, w_description)
 					.style("fill", "none");
 	screen11.append("line")
 					.attr("id", "ford_line")
 					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 13; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 13; }
						else { return margin11.left + w_chyron - 13; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 2; }
						else { return margin11.left + w_chyron - 2; }
					})
					.attr("y1", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 10; }
						else { return margin11.top + h_brandText + sq_spacing + 10; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 10; }
						else { return margin11.top + h_brandText + sq_spacing + 10; }
					})
 					.style("stroke-width", 1)
 					.style("stroke", "none");
 	screen11.append("text")
 					.attr("id", "kav_descrip")
 					.attr("class", "descriptionText")
 					.text("Chyrons quoting Kavanaugh")
 					.attr("y", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + sq_spacing*3 + 3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + sq_spacing*4 + 3; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 3; }
					})
					.attr("x", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 + 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 + 2; }
						else { return margin11.left + w_chyron + 2; }
					})
 					.call(wrap, w_description)
 					.style("fill", "none");
 	screen11.append("line")
 					.attr("id", "kav_line")
					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 13; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 13; }
						else { return margin11.left + w_chyron - 13; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 2; }
						else { return margin11.left + w_chyron - 2; }
					})
					.attr("y1", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + 10 + sq_spacing*3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + 10 + sq_spacing*4; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 10; }
					})
					.attr("y2", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + 10 + sq_spacing*3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + 10 + sq_spacing*4; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 10; }
					})
 					.style("stroke-width", 1)
 					.style("stroke", "none");
	// Mouseover feature of grid circles
  screen11.selectAll(".grid_circle")
          .filter(function(d) {
            return d.chyron.includes("FORD:") | d.chyron.includes("KAVANAUGH:");
          })
          .on("mouseover", function(d) {
            var network = d.network;
            screen11.append("rect")
                    .attr("id", "chyron_rect")
                    .attr("x", function(d) {
                      if (gridsPerRow == 3) {
												if (network=="msnbc") { return margin11.left - sq_spacing/2; }
	                      else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2; }
	                      else { return margin11.left + w_btwnGrids*2 + w_chyron*2 - sq_spacing/2; }
											}
											else if (gridsPerRow == 2) {
												if (network=="msnbc") { return margin11.left - sq_spacing/2; }
												else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2; }
												else { return margin11.left + sq_spacing*6.5; }
											}
											else { return margin11.left - sq_spacing/2; }
                    })
                    .attr("y", function() {
                      if (gridsPerRow == 3) {
												if (network=="msnbc") { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10; }
												else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6; }
											}
											else if (gridsPerRow == 2) { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17; }
											else { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24; }
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
										 .attr("x", function(d) {
                       if (gridsPerRow == 3) {
 												if (network=="msnbc") { return margin11.left - sq_spacing/2 + w_chyron/2; }
 	                      else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2 + w_chyron/2; }
 	                      else { return margin11.left + w_btwnGrids*2 + w_chyron*2 - sq_spacing/2 + w_chyron/2; }
 											}
 											else if (gridsPerRow == 2) {
 												if (network=="msnbc") { return margin11.left - sq_spacing/2 + w_chyron/2; }
 												else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2 + w_chyron/2; }
 												else { return margin11.left + sq_spacing*6.5 + w_chyron/2; }
 											}
 											else { return margin11.left - sq_spacing/2 + w_chyron/2; }
                     })
                     .attr("y", function() {
											  labelWidth = this.getComputedTextLength();
                        availWidth = w_chyron-10;
                        lines = Math.ceil(labelWidth/availWidth);
											  if (gridsPerRow == 3) {
 												 if (network=="msnbc") {
													if (lines <= 5) { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10 + 30; }
													else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10 + 20;}
												 }
 												 else {
													if (lines <= 5) { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6 + 30; }
													else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6 + 20;}
 											  }
											 }
 											 else if (gridsPerRow == 2) {
												 if (lines<=5) { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 30;}
												 else { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 20;}
											 }
 											 else {
												 if (lines<=5) { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 30; }
												 else { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 20; }
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
}; // end setup screen11
function resize_screen11() {
	if (gridsPerRow == 3) {
		margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron*3 - w_btwnGrids*2 - w_description)/2, right: (w_doc - w_chyron*3 - w_btwnGrids*2 - w_description)/2};
		document.getElementById("svg-screen11").style.height = margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*11 + h_chyron;
	}
	else if (gridsPerRow == 2) {
		margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron*2 - w_btwnGrids - w_description)/2, right: (w_doc - w_chyron*2 - w_btwnGrids - w_description)/2};
		document.getElementById("svg-screen11").style.height = margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*18 + h_chyron;
	}
	else {
		margin11 = { top: 15, bottom: 10, left:(w_doc - w_chyron - w_description)/2, right: (w_doc - w_chyron - w_description)/2};
		document.getElementById("svg-screen11").style.height = margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*25 + h_chyron;
	};
	screen11.selectAll(".brandText")
					.attr("y", function(d,i) {
						if (gridsPerRow == 3) { return margin11.top; }
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin11.top; }
							else { return margin11.top + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
						}
						else {
							if (i==0) { return margin11.top; }
							else if (i==1) { return margin11.top + h_brandText + h_spacing*2.5 + 11*sq_spacing; }
							else { return margin11.top + h_brandText*2 + h_spacing*5 + 18*sq_spacing; }
						}
					})
					.attr("x", function(d, i) {
						if (gridsPerRow == 3) {
							if (i==0) { return margin11.left + w_chyron/2 - sq_spacing/2; }
							else if (i==1) { return margin11.left + (10 * sq_spacing)*3/2 - sq_spacing/2 + w_btwnGrids; }
							else { return margin11.left + (5 * sq_spacing)*5 - sq_spacing/2 + w_btwnGrids*2; }
						}
						else if (gridsPerRow == 2) {
							if (i<=1) { return margin11.left + (w_chyron + w_btwnGrids)*i + w_chyron/2 - sq_spacing/2; }
							else { return (w_doc - w_description - sq_spacing)/2; }
						}
						else { return margin11.left + w_chyron/2 - sq_spacing/2; }
					});

 	screen11.selectAll(".grid_circle")
 					.filter(function(d) {
 						return d.chyron!="";
 					})
					.attr("cx", function(d,i) {
 						if (gridsPerRow == 3) {
							if (d.network=="msnbc") {
	 							return margin11.left + (i % 10 * sq_spacing);
	 						}
	 						else if (d.network=="cnn") {
	 							return margin11.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
	 						}
	 						else { return margin11.left + w_btwnGrids*2 + (20*sq_spacing) + ((i-173) % 10 * sq_spacing); };
						}
						else if (gridsPerRow == 2) {
							if (d.network=="msnbc") {
	 							return margin11.left + (i % 10 * sq_spacing);
	 						}
	 						else if (d.network=="cnn") {
	 							return margin11.left + w_btwnGrids + w_chyron + ((i-103) % 10 * sq_spacing);
	 						}
							else { return (w_doc - w_chyron - w_description)/2 + ((i-173) % 10 * sq_spacing); }
						}
						else {
							if (d.network=="msnbc") { return margin11.left + (i % 10 * sq_spacing); }
							else if (d.network=="cnn") { return margin11.left + ((i-103) % 10 * sq_spacing); }
							else { return margin11.left + ((i-173) % 10 * sq_spacing); }
						}
 					})
					.attr("cy", function(d,i) {
						if (gridsPerRow == 3) {
							if (d.network=="msnbc") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
							}
							else if (d.network=="cnn") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
							}
							else { return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
						}
						else if (gridsPerRow == 2) {
							if (d.network=="msnbc") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing;
							}
							else if (d.network=="cnn") {
								return margin11.top + h_brandText + h_spacing/2 + Math.floor((i-103) / 10) % max_rows * sq_spacing;
							}
							else { return margin11.top + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-173) / 10) % max_rows*sq_spacing; }
						}
						else {
							if (d.network=="msnbc") { return margin11.top + h_brandText + h_spacing/2 + Math.floor(i / 10) % max_rows * sq_spacing; }
							else if (d.network=="cnn") { return margin11.top + h_brandText*2 + h_spacing*3 + sq_spacing*11 + Math.floor((i-103) / 10) % max_rows * sq_spacing; }
							else { return margin11.top + h_brandText*3 + h_spacing*5.5 + 18*sq_spacing + Math.floor((i-173) / 10) % max_rows * sq_spacing; }
						}
					})
 					.attr("r", sq_size-8);
 	// F and K legend/key
 	screen11.select("#ford_descrip")
 					.text("Chyrons quoting Ford")
 					.attr("y", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 5; }
						else { return margin11.top + h_brandText + sq_spacing + 5; }
					})
 					.attr("x", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 + 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 + 2; }
						else { return margin11.left + w_chyron + 2; }
					})
 					.call(wrap, 70)
					.style("fill", function() {
						if (screen11Entered) { return "gray"; }
						else { return "none"; }
					});
 	screen11.select("#ford_line")
 					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 13; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 13; }
						else { return margin11.left + w_chyron - 13; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 2; }
						else { return margin11.left + w_chyron - 2; }
					})
					.attr("y1", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 10; }
						else { return margin11.top + h_brandText + sq_spacing + 10; }
					})
					.attr("y2", function() {
						if (gridsPerRow >= 2) { return margin11.top + h_brandText + 10; }
						else { return margin11.top + h_brandText + sq_spacing + 10; }
					})
					.style("fill", function() {
						if (screen11Entered) { return "gray"; }
						else { return "none"; }
					});
 	screen11.select("#kav_descrip")
 					.text("Chyrons quoting Kavanaugh")
 					.attr("y", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + sq_spacing*3 + 3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + sq_spacing*4 + 3; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 3; }
					})
					.attr("x", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 + 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 + 2; }
						else { return margin11.left + w_chyron + 2; }
					})
 					.call(wrap, 70)
					.style("fill", function() {
						if (screen11Entered) { return "gray"; }
						else { return "none"; }
					});
 	screen11.select("#kav_line")
					.attr("x1", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 13; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 13; }
						else { return margin11.left + w_chyron - 13; }
					})
					.attr("x2", function() {
						if (gridsPerRow == 3) { return margin11.left + w_btwnGrids*2 + w_chyron*3 - 2; }
						else if (gridsPerRow == 2) { return margin11.left + w_btwnGrids + w_chyron*2 - 2; }
						else { return margin11.left + w_chyron - 2; }
					})
					.attr("y1", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + 10 + sq_spacing*3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + 10 + sq_spacing*4; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 10; }
					})
					.attr("y2", function() {
						if (gridsPerRow == 3) { return margin11.top + h_brandText + 10 + sq_spacing*3; }
						else if (gridsPerRow == 2) { return margin11.top + h_brandText + 10 + sq_spacing*4; }
						else { return margin11.top + h_brandText + sq_spacing*6 + 10; }
					})
					.style("fill", function() {
						if (screen11Entered) { return "gray"; }
						else { return "none"; }
					});
	// Mouseover feature of grid circles
  screen11.selectAll(".grid_circle")
          .filter(function(d) {
            return d.chyron.includes("FORD:") | d.chyron.includes("KAVANAUGH:");
          })
          .on("mouseover", function(d) {
            var network = d.network;
            screen11.append("rect")
                    .attr("id", "chyron_rect")
                    .attr("x", function(d) {
                      if (gridsPerRow == 3) {
												if (network=="msnbc") { return margin11.left - sq_spacing/2; }
	                      else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2; }
	                      else { return margin11.left + w_btwnGrids*2 + w_chyron*2 - sq_spacing/2; }
											}
											else if (gridsPerRow == 2) {
												if (network=="msnbc") { return margin11.left - sq_spacing/2; }
												else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2; }
												else { return margin11.left + sq_spacing*6.5; }
											}
											else { return margin11.left - sq_spacing/2; }
                    })
                    .attr("y", function() {
                      if (gridsPerRow == 3) {
												if (network=="msnbc") { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10; }
												else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6; }
											}
											else if (gridsPerRow == 2) { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17; }
											else { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24; }
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
										 .attr("x", function(d) {
                       if (gridsPerRow == 3) {
 												if (network=="msnbc") { return margin11.left - sq_spacing/2 + w_chyron/2; }
 	                      else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2 + w_chyron/2; }
 	                      else { return margin11.left + w_btwnGrids*2 + w_chyron*2 - sq_spacing/2 + w_chyron/2; }
 											}
 											else if (gridsPerRow == 2) {
 												if (network=="msnbc") { return margin11.left - sq_spacing/2 + w_chyron/2; }
 												else if (network=="cnn") { return margin11.left + w_btwnGrids + w_chyron - sq_spacing/2 + w_chyron/2; }
 												else { return margin11.left + sq_spacing*6.5 + w_chyron/2; }
 											}
 											else { return margin11.left - sq_spacing/2 + w_chyron/2; }
                     })
                     .attr("y", function() {
											  labelWidth = this.getComputedTextLength();
                        availWidth = w_chyron-10;
                        lines = Math.ceil(labelWidth/availWidth);
											  if (gridsPerRow == 3) {
 												 if (network=="msnbc") {
													if (lines <= 5) { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10 + 30; }
													else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*10 + 20;}
												 }
 												 else {
													if (lines <= 5) { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6 + 30; }
													else { return margin11.top + h_brandText + h_spacing*2.5 + sq_spacing*6 + 20;}
 											  }
											 }
 											 else if (gridsPerRow == 2) {
												 if (lines<=5) { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 30;}
												 else { return margin11.top + h_brandText*2 + h_spacing*5 + sq_spacing*17 + 20;}
											 }
 											 else {
												 if (lines<=5) { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 30; }
												 else { return margin11.top + h_brandText*3 + h_spacing*7.5 + sq_spacing*24 + 20; }
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
}; // end resize screen 11
////////////////////////////////////////////////////////////////////////////////
function resize_charts() {
	w_doc = window.innerWidth;
	w = w_doc*.9; // based on CSS rules its 93% but I want it a little smaller
	h = window.innerHeight;

	if (w >= initialLeft + w_btwnGrids*2 + w_chyron*3 + w_description + initialRight) {
		gridsPerRow = 3;
		margin = { top: 15, bottom: 10, left:(w - w_chyron*3 - w_btwnGrids*2 - w_description)/2, right: (w - w_chyron*3 - w_btwnGrids*2 - w_description)/2};
	}
	else if (w >= initialLeft + w_btwnGrids + w_chyron*2 + w_description + initialRight) {
		gridsPerRow = 2;
		margin = { top: 15, bottom: 10, left:(w - w_chyron*2 - w_btwnGrids - w_description)/2, right: (w - w_chyron*2 - w_btwnGrids - w_description)/2};
	}
	else {
		gridsPerRow = 1;
		margin = { top: 15, bottom: 10, left:(w - w_chyron - w_description)/2, right: (w - w_chyron - w_description)/2};
	};
	// Create svg
	svg.attr("height", function() {
				if (gridsPerRow==3) { return 450; }
				else if (gridsPerRow==2) { return 650; }
				else { return 850; }
			});
	resize_chyrons();
	resize_screen3();
	resize_screen4();
	resize_screen5();
	resize_screen6();
	resize_screen7();
	resize_screen8();
	resize_screen11();
}; // end resize charts

function init_charts() {
	setup_chyron1();
	setup_chyron2();
	setup_chyron3();
	setup_screen3();
	setup_screen4();
	setup_screen5();
	setup_screen6();
	setup_screen7();
	setup_screen8();
	setup_screen11();

	window.addEventListener("resize", resize_charts);
}; // end init charts

////////////////////////////////////////////////////////////////////////////////
d3.csv("Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

	dataset = data; // Once loaded, copy to dataset
  init_charts();

}); // end d3.csv function
