// DEFINING MEASUREMENTS
// Define svg and margins
var margin = {top:0, bottom:10, right:20, left:0, left_chyron2: 50, btwn_chyron: 30, left_chyron:55};
var w_svg = 850;
var h_svg = 800;
var top = 20;
// Create svg
var svg = d3.select("#scroll-svg")
			.attr("width", w_svg)
			.attr("height", h_svg);

// Grid
var max_rows = 11; // max number of rows
var sq_size = 17; // width/height of each square
var sq_spacing = 22; // spacing between start of one square and start of another square
var sq_padding = sq_spacing-sq_size; // padding between squares

var w_chyron = sq_spacing*10;
var h_chyron = 120;

// Y positions
var pos_chyron = 210;
var pos_brandtext = 200;
var pos_gridstart = 185;
var pos_chyronback = 230;
var pos_counttext = pos_chyronback+20;
var pos_belowcount = pos_gridstart+sq_spacing*12; // MSNBC
var pos_squaremouse = pos_belowcount+30; // MSNBC
var pos_circlemouse = pos_gridstart+sq_spacing*12 // MSNBC

// Define color palette
var red = d3.rgb(212,89,84);
var blue = d3.rgb(20,151,252);
var yellow = d3.rgb(232,164,51);
var dark_red = d3.rgb(135, 63, 53);
var dark_blue = d3.rgb(0, 109, 230);
var dark_yellow = d3.rgb(206, 112, 32);
var light_red = d3.rgb(229,155,152);
var light_blue = d3.rgb(113,192,253);
var light_yellow = d3.rgb(241,200,132);

// DEFINING CONVERSION FUNCTIONS
// Convert variable data types
var parseTime = d3.timeParse("%m/%d/%y %I:%M:%S"); // convert strings to Dates
var formatTime = d3.timeFormat("%I:%M"); // convert Dates to strings
var rowConverter = function(d) {
	return {
		time: parseTime("9/28/18 " + d.time),
		chyron: d.chyron,
		network: d.network
	};
};
// text wrapping function
function wrap(text, width) {
	text.each(function () {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.3, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
        }
    }
	});
}; // end wrap function

// DEFINING DATASETS
// This is a convenient dataset to have because it just has three data points with the three networks - can be used
// for various things that require the 3 networks.
var intro_dataset = [{network: "msnbc", chyron: "KAVANAUGH: I WILL NOT WITHDRAW FROM THIS PROCESS"},
										 {network: "cnn", chyron: "CHRISTINE BLASEY FORD ABOUT TO TESTIFY ON KAVANAUGH ALLEGATIONS"},
									 	 {network: "fox", chyron: "SEN. GRASSLEY (R-IA) DELIVERS OPENING STATEMENTS"}];

var nonquotes_dataset = [{network: "msnbc", chyron: "FORD CONCLUDES TESTIMONY, KAVANAUGH TO SPEAK TO SENATE SOON"},
										 {network: "cnn", chyron: "CHRISTINE BLASEY FORD ARIVES TO GIVE TESTIMONY HEARING"},
									 	 {network: "fox", chyron: "SOON: JUDGE KAVANAUGH TO TESTIFY ON ACCUSATIONS AGAINST HIM"}];

// Another dataset for the 2nd set of examples - direct quotes
var quotes_dataset = [{network: "msnbc", chyron: "FORD: KAVANAUGH'S \“ASSAULT ON ME DRASTICALLY ALTERED MY LIFE.\" APART FROM THE ASSAULT, \"LAST COUPLE OF WEEKS HAVE BEEN THEH ARDEST OF MY LIFE.\""},
										 {network: "cnn", chyron: "FORD: NO POLITICAL MOTIVATION FOR COMING FORWARD"},
									 	 {network: "fox", chyron: "KAVANAUGH: FALSE ALLEGATIONS HAVE DESTROYED MY FAMILY AND MY NAME"}];

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
var screen9 = svg.append("g");
var screen10 = svg.append("g");
var screen11 = svg.append("g");
var screen_tool = svg.append("g");

d3.csv("Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

	dataset = data; // Once loaded, copy to dataset

	// 3: All chyrons grid
	// Intro text
	screen3.append("text")
				 .attr("class", "intro_text")
				 .text("Between 9:50 a.m. and 7:15 p.m., MSNBC showed over 100 different captions, while Fox News showed 61. CNN fell between the two at 70.")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 25)
				 .call(wrap, 600);

	// Brand text
	screen3.selectAll("brand_text")
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
					.attr("class", "brand_text")
					.attr("y", pos_brandtext-30)
					.attr("x", function(d) {
						if (d.network=="msnbc") {
							return margin.left_chyron+w_chyron/2;
						}
						else if (d.network=="cnn") {
							return margin.left_chyron+margin.btwn_chyron+(w_chyron/2)*3;
						}
						else { return margin.left_chyron+margin.btwn_chyron*2+(w_chyron/2)*5; }
					})
					.style("text-anchor", "middle")
					.style("font-size", 16)
					.style("font-weight", 700);

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
					 if (d.network=="msnbc") {
						 return margin.left_chyron+(i % 10 * sq_spacing);
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(10*sq_spacing)+((i-103) % 10 * sq_spacing);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(20*sq_spacing) + ((i-173) % 10 * sq_spacing); };
				 })
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
					 if (d.network=="msnbc") {
						 return margin.left_chyron+sq_spacing*4;
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(sq_spacing*14);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(sq_spacing*24); }
				 })
				 .attr("y", pos_chyronback)
				 .attr("width", sq_spacing*2)
				 .attr("height", 30)
				 .style("fill","white")
				 .style("opacity", 0.95)

	// Chyron count number text
	screen3.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
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
					 if (d.network=="msnbc") {
						 return margin.left_chyron+sq_spacing*5-(sq_padding/2);
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(sq_spacing*15)-(sq_padding/2);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(sq_spacing*25)-(sq_padding/2); }
				 })
				 .attr("y", pos_counttext);


	// 4: Ford grid
	// Intro text
	screen4.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro4_1")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 12)
				 .text("When you break up the captions into those that appeared during Ford's hearing and those that appeared during Kavanaugh's\
				 				hearing, we find even more differences.")
				 .call(wrap, 600);
	screen4.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro4_2")
				 .text("During Christine Blasey Ford’s hearing, MSNBC changed their captions the most, and Fox News the least. But that could be a function of the total number of captions shown...")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 75)
				 .call(wrap, 600);
	screen4.selectAll("tspan")
				 .attr("y", -500);

	// Build count text
	screen4.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "54";
					 }
					 else if (d.network=="cnn") {
						 return "42";
					 }
					 else { return "20"; }
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
				 .attr("y", -500);

	// Label "captions during Ford's hearing"
	screen4.append("text")
					.attr("id", "ford_descrip")
					.attr("class", "description")
					.text("Captions during Ford's hearing")
					.attr("y", pos_gridstart+7)
					.attr("x", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+15)
					.call(wrap, 70)
					.style("fill", "none");
	screen4.append("line")
					.attr("id", "ford_line")
					.attr("class", "description")
					.attr("x1", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3-5)
					.attr("x2", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+8)
					.attr("y1", pos_gridstart+9)
					.attr("y2", pos_gridstart+9)
					.style("stroke-width", 1)
					.style("stroke", "none");


	// 5: Ford rebased
	// Intro text
	screen5.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro5_1")
				 .attr("x", (w_svg-650)/2)
				 .attr("y", 12)
				 .text("... But when we rebase these numbers to look at the proportion of captions during Ford’s hearing out of all captions\
	 				showed during both hearings, we find that at least half of MSNBC’s and CNN’s captions occurred during Ford’s hearing,\
	 				compared with 33% of Fox News’ captions - meaning Fox News was less likely to give varied reports of Ford’s coverage.")
				 .call(wrap, 650);
	screen5.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro5_2")
				 .text("Scroll over each square to see the caption that was displayed.")
				 .attr("x", (w_svg-650)/2)
				 .attr("y", 110)
				 .call(wrap, 650);
	screen5.selectAll(".intro_text")
				 .selectAll("tspan")
				 .attr("y", -500);

	// Change count to %
	screen5.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
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
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "none");

	// Subtext
	screen5.selectAll("subtext")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .text("of all captions")
				 .attr("class", "subtext")
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron+sq_spacing*5-(sq_padding/2);
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron+margin.btwn_chyron+(sq_spacing*15)-(sq_padding/2);
					 }
					 else { return margin.left_chyron+margin.btwn_chyron*2+(sq_spacing*25)-(sq_padding/2); }
				 })
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount+20;
					 }
					 else { return pos_belowcount-80+20; }
				 })
				 .style("text-anchor", "middle")
				 .style("font-size", 13)
				 .style("font-weight", 100)
				 .style("fill", "none");

	// 6: Kavanaugh number
	// Intro text
	screen6.append("text")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 30)
				 .text("And here are the numbers during Kavanaugh's hearing.")
				 .call(wrap, 600);
	screen6.selectAll(".intro_text")
				 .selectAll("tspan")
				 .attr("y", -500);

	// count text
	screen6.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "37";
					 }
					 else if (d.network=="cnn") {
						 return "23";
					 }
					 else { return "38"; }
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
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "none");

	// Label "captions during Kav's hearing"
	screen6.append("text")
					.attr("id", "kav_descrip")
					.attr("class", "description")
					.text("Captions during Kavanaugh's hearing")
					.attr("y", pos_gridstart+sq_spacing*4)
					.attr("x", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+15)
					.call(wrap, 70)
					.style("fill", "none");
	screen6.append("line")
					.attr("id", "kav_line")
					.attr("class", "description")
					.attr("x1", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3-5)
					.attr("x2", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+8)
					.attr("y1", pos_gridstart+sq_spacing*4+8)
					.attr("y2", pos_gridstart+sq_spacing*4+8)
					.style("stroke-width", 1)
					.style("stroke", "none");

	// 7: Kavanaugh rebased
	// Intro text
	screen7.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro7_1")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 20)
				 .text("About a third of MSNBC's and CNN's captions occurred during Kavanaugh's hearing, compared with 62% of Fox News' captions.")
				 .call(wrap, 600);
	screen7.append("text")
				 .attr("class", "intro_text")
				 .attr("id", "intro7_2")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 73)
				 .text("Scroll over each square to see the caption that was displayed.")
				 .call(wrap, 600);
	screen7.selectAll(".intro_text")
				 .selectAll("tspan")
				 .attr("y", -500);

	// Change count to %
	screen7.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
				 .text(function(d) {
					 if (d.network=="msnbc") {
						 return "36%";
					 }
					 else if (d.network=="cnn") {
						 return "33%";
					 }
					 else { return "62%"; }
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
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return pos_belowcount;
					 }
					 else { return pos_belowcount-80; }
				 })
				 .style("fill", "none");

	// 8: Summary
	// Intro text
	screen8.append("text")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-600)/2)
				 .attr("y", 20)
				 .text("While over half of MSNBC's (52%) and CNN's (60%) captions occurred during Ford's hearing, the breakdown for Fox News is reversed with 60% of their captions occurring during Kavanaugh's hearing.")
				 .call(wrap, 600);
	screen8.selectAll(".intro_text")
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
	screen8.selectAll("count_text")
				 .data(intro_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "count_text")
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

	// 9: Quotation intro
	// Intro text
	screen9.append("text")
				 .text("We've seen that some networks are more likely to change captions during one testimony over the other, \
				 but what about the content of these captions?")
				 .attr("id", "intro9_1")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-680)/2)
				 .attr("y", 12)
				 .call(wrap, 680);
	screen9.append("text")
				 .text("To get an understanding of the content in these captions, we can categorize them into two types: \
				 One type of caption describes the topic or sequence of events that is currently being aired or will be aired \
				 in the near future. Here are some examples:")
				 .attr("id", "intro9_2")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-680)/2)
				 .attr("y", 60)
				 .call(wrap, 680);
	screen9.selectAll("text")
				 .selectAll("tspan")
				 .attr("y", -500) // move all text elements away

	// Chyron rect
	screen9.selectAll("chyron_rect")
				 .data(nonquotes_dataset)
				 .enter()
				 .append("rect")
				 .attr("class", "chyron_rect")
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron2;
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron2*2+w_chyron;
					 }
					 else { return margin.left_chyron2*3+w_chyron*2; }
				 })
				 .attr("y", -500)
				 .attr("width", w_chyron)
				 .attr("height", h_chyron)
				 .style("fill", function(d) {
					 if (d.network=="msnbc") {
						 return yellow;
					 }
					 else if (d.network=="cnn") {
						 return red;
					 }
					 else { return blue; }
				 })
				 .style("opacity", 0.5);

	// Chyron example text
	screen9.selectAll("chyron_text")
				 .data(nonquotes_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "chyron_text")
				 .text(function(d) {
					 return d.chyron;
				 })
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron2+w_chyron/2;
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron2*2+(w_chyron/2)*3;
					 }
					 else { return margin.left_chyron2*3+(w_chyron/2)*5; }
				 })
				 .attr("y", 190)
				 .call(wrap, w_chyron-20);
	screen9.selectAll(".chyron_text")
				 .selectAll("tspan")
				 .attr("y", -500);

	// 10: Quotation intro
	// Intro text
	screen10.append("text")
				 .text("The other type of captions summarize what was said during the testimonies, using indirect and direct quotes. Because so much is said \
				 during these testimonies and therefore could be summarized in these types of captions, the ones that are chosen to be displayed can be considered to be \
				 the main takeaways as deemed by the network.")
				 .attr("id", "intro10_1")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-700)/2)
				 .attr("y", 12)
				 .call(wrap, 700);
	screen10.append("text")
				 .text("What is emphasized and what is not emphasized are important to notice across the three newtorks. In many \
				 ways, the disparities in these captions are even starker than previous differences found in the amount of chyrons displayed during each testimony.")
				 .attr("id", "intro10_2")
				 .attr("class", "intro_text")
				 .attr("x", (w_svg-700)/2)
				 .attr("y", 100)
				 .call(wrap, 700);
	screen10.selectAll("text")
				 .selectAll("tspan")
				 .attr("y", -500) // move all text elements away

	// Chyron example text
	screen10.selectAll("chyron_text")
				 .data(quotes_dataset)
				 .enter()
				 .append("text")
				 .attr("class", "chyron_text")
				 .text(function(d) {
					 return d.chyron;
				 })
				 .attr("x", function(d) {
					 if (d.network=="msnbc") {
						 return margin.left_chyron2+w_chyron/2;
					 }
					 else if (d.network=="cnn") {
						 return margin.left_chyron2*2+(w_chyron/2)*3;
					 }
					 else { return margin.left_chyron2*3+(w_chyron/2)*5; }
				 })
				 .attr("y", function(d) {
					 if (d.network=="msnbc") {
						 return 180;
					 }
					 else { return 190; }
				 })
			   .style("font-size", function(d) {
					 if (d.network=="msnbc") {
						 return 12;
					 }
					 else { return 14; }
				 })
				 .call(wrap, w_chyron-20);
	screen10.selectAll(".chyron_text")
				 .selectAll("tspan")
				 .attr("y", -500);

	// 11: Circle waffles
	// Intro text
	screen11.append("text")
					.text("Captions detailing Ford's words account for a sizable portion of captions displayed on CNN and MSNBC, but just a fraction for Fox News. When it comes to Kavanaugh's words, Fox News highlights many more.")
					.attr("class", "intro_text")
					.attr("id", "intro11_1")
					.attr("x", (w_svg-600)/2)
					.attr("y", 20)
					.call(wrap, 600);
	screen11.append("text")
					.text("Scroll over each circle to read the caption that was displayed.")
					.attr("class", "intro_text")
					.attr("id", "intro11_2")
					.attr("x", (w_svg-600)/2)
					.attr("y", 95)
					.call(wrap, 600);
	screen11.selectAll(".intro_text")
				  .selectAll("tspan")
					.attr("y", -500);

	screen11.selectAll("grid_circle")
				  .data(dataset)
					.enter()
					.filter(function(d) {
						return d.chyron!="";
					})
					.append("circle")
					.attr("class", "grid_circle")
					.attr("cx", function(d,i) {
						if (d.network=="msnbc") {
							 return margin.left_chyron+(i % 10 * sq_spacing) + sq_spacing/2;
						 }
						 else if (d.network=="cnn") {
							 return margin.left_chyron+margin.btwn_chyron+(10*sq_spacing)+((i-103) % 10 * sq_spacing) + sq_spacing/2;
						 }
						 else { return margin.left_chyron+margin.btwn_chyron*2+(20*sq_spacing) + ((i-173) % 10 * sq_spacing) + sq_spacing/2; };
					})
					.attr("cy", -500)
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
					.attr("class", "description")
					.text("Captions quoting Ford")
					.attr("y", pos_gridstart+7)
					.attr("x", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+15)
					.call(wrap, 70)
					.style("fill", "none");
	screen11.append("line")
					.attr("id", "ford_line")
					.attr("x1", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3-2)
					.attr("x2", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+8)
					.attr("y1", pos_gridstart+11)
					.attr("y2", pos_gridstart+11)
					.style("stroke-width", 1)
					.style("stroke", "none");
	screen11.append("text")
					.attr("id", "kav_descrip")
					.attr("class", "description")
					.text("Captions quoting Kavanaugh")
					.attr("y", pos_gridstart+sq_spacing*3+3)
					.attr("x", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+15)
					.call(wrap, 70)
					.style("fill", "none");
	screen11.append("line")
					.attr("id", "kav_line")
					.attr("x1", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3-2)
					.attr("x2", margin.left_chyron+margin.btwn_chyron*2+w_chyron*3+8)
					.attr("y1", pos_gridstart+sq_spacing*3+11)
					.attr("y2", pos_gridstart+sq_spacing*3+11)
					.style("stroke-width", 1)
					.style("stroke", "none");
});
