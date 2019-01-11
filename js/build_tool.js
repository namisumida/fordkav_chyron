// Tool paddings
var btwnTimelineChyron = 20;
var h_between = 10;
var w_spacing = 10;
// brand text
if (w_doc >= 400) { var w_brandText = 100; }
else { var w_brandText = 70; }
var w_tool = document.getElementById("outro").getBoundingClientRect().width;
// Timeline dimensions
var h_timeline = 60; // height of each timeline
if (w_tool >= 10 + w_brandText + 470 + btwnTimelineChyron + w_chyron + 10) { // show timeline and chyron in one row
  var toolView = 1;
  var w_timeline = 470;
  var paddingTool = {top:10, bottom:10, right:(w_tool - (w_brandText + w_timeline + btwnTimelineChyron + w_chyron))/2, left:(w_tool - (w_brandText + w_timeline + btwnTimelineChyron + w_chyron))/2};
}
else if (w_tool >= 10 + w_chyron*3 + w_spacing*2 + 10) { // 700;  show timeline in one row and all chyrons in row below
  var toolView = 2;
  var w_timeline = 470;
  var paddingTool = {top:10, bottom:10, right:(w_tool - (10 + w_chyron*3 + w_spacing*2 + 10))/2, left:(w_tool - (10 + w_chyron*3 + w_spacing*2 + 10))/2};
}
else  if (w_tool >= 10 + w_chyron*2 + w_spacing + 10){
  var toolView = 3;
  if (w_tool >= 10 + w_brandText + 470 + 10) { var w_timeline = 470; }
  else { var w_timeline = w_tool-20-w_brandText; }
  var paddingTool = {top:10, bottom:10, right:(w_tool-w_timeline-w_brandText)/2, left:(w_tool-w_timeline-w_brandText)/2};
}
else {
  var toolView = 4;
  var w_timeline = w_tool-20-w_brandText;
  var paddingTool = {top:10, bottom:10, right:(w_tool-w_timeline-w_brandText)/2, left:(w_tool-w_timeline-w_brandText)/2};
}
// scales + dataset
var dataset, xScale_hour, xScale;
var chyrontext_size = 14;
// height of timeline section
if (w_doc >= 531) { var h_timeline_section = 80; }
else { var h_timeline_section = 100; }

// setting height of svg
if (toolView == 1) { var h_tool = paddingTool.top + h_timeline_section + h_chyron*3 + h_spacing*2 + paddingTool.bottom; }
else if (toolView == 2) { var h_tool = paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron + paddingTool.bottom; }
else if (toolView == 3) { var h_tool = paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron*2 + paddingTool.bottom;}
else { var h_tool = paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*4 + h_chyron*3 + paddingTool.bottom; }
d3.select("#gray-wrapper2").node().style.height = h_tool + 10 + document.getElementById("outro-text").getBoundingClientRect().height + "px";

// Slider position
var slider = document.getElementById("slider");
slider.style.left = (paddingTool.left + w_brandText) + "px";
slider.style.top = (paddingTool.top + 20) + "px";
slider.style.width = w_timeline + "px";
var w_sliderThumb = w_timeline*.111;

// Updated time:
function time_to_string(time) {
  var time_str = formatTime(time)
  if (+time < +parseTime("9/28/18 12:00:00")) { return time_str + " a.m."; }
  else if (+time < +parseTime("9/28/18 13:00:00")) { return time_str + " p.m."; }
  else { return time_str.substr(1,time_str.length) + " p.m."; }
}

var svg_tool = d3.select("#svg-tool")
            		 .attr("width", w_tool)
            		 .attr("height", h_tool);

function setup() {
  xScale = d3.scaleTime()
              .domain([d3.min(dataset, function(d) { return d.time; }),
                       d3.max(dataset, function(d) { return d.time; })])
              .range([0, w_timeline]);
  // Timeline section
  var timeline_section = svg_tool.append("g")
                                 .attr("class", "timeline_section")
                                 .attr("transform", "translate(" + (paddingTool.left + w_brandText) + "," + paddingTool.top + ")");
  timeline_section.append("text")
                  .attr("id", "timeline_start")
                  .attr("class", "timelineTimeText")
                  .text("10:00 a.m.")
                  .attr("x", 15)
                  .attr("y", paddingTool.top)
                  .style("text-anchor", "end");
  timeline_section.append("text")
                  .attr("id", "timeline_end")
                  .attr("class", "timelineTimeText")
                  .text("11:00 a.m.")
                  .attr("x", w_sliderThumb-15)
                  .attr("y", paddingTool.top)
                  .style("text-anchor", "start");

  // Key moments
  // Ford's hearing time
  if (w_doc >= 400) {
    timeline_section.append("rect")
                    .attr("class", "timelineRect")
                    .attr("x", xScale(ford_start))
                    .attr("width", xScale(ford_end)-xScale(ford_start))
                    .attr("y", paddingTool.top + 5) // arbitrary
                    .attr("height", function() {
                      if (xScale(kav_end)-xScale(kav_start) <= 152) { return 65; }
                      else { return 45; }
                    });
    // Kavanaugh's hearing time
    timeline_section.append("rect")
                    .attr("class", "timelineRect")
                    .attr("x", xScale(kav_start))
                    .attr("width", xScale(kav_end)-xScale(kav_start))
                    .attr("y", paddingTool.top + 5)
                    .attr("height", function() {
                      if (xScale(kav_end)-xScale(kav_start) <= 152) { return 65; }
                      else { return 45; }
                    });
    if (xScale(kav_end)-xScale(kav_start) <= 152) {
      timeline_section.append("text")
                      .attr("class", "timelineText")
                      .attr("y", paddingTool.top + 45)
                      .attr("x", xScale(kav_start)+(xScale(kav_end)-xScale(kav_start))/2)
                      .text("Brett Kavanaugh's testimony")
                      .call(wrap, 152);
     timeline_section.append("text")
                     .attr("class", "timelineText")
                     .attr("y", paddingTool.top + 45) // arbitrary
                     .attr("x", xScale(ford_start)+(xScale(ford_end)-xScale(ford_start))/2)
                     .text("Christine Blasey Ford's testimony")
                     .call(wrap, 152);
    }
    else {
      timeline_section.append("text")
                      .attr("class", "timelineText")
                      .attr("y", paddingTool.top + 45)
                      .attr("x", xScale(kav_start)+(xScale(kav_end)-xScale(kav_start))/2)
                      .text("Brett Kavanaugh's testimony");
     timeline_section.append("text")
                      .attr("class", "timelineText")
                      .attr("y", paddingTool.top + 45) // arbitrary
                      .attr("x", xScale(ford_start)+(xScale(ford_end)-xScale(ford_start))/2)
                      .text("Christine Blasey Ford's testimony");
    }; // end potential wrapping
  }
  else {
    timeline_section.append("rect")
                    .attr("class", "timelineRect")
                    .attr("x", xScale(ford_start))
                    .attr("width", xScale(ford_end)-xScale(ford_start))
                    .attr("y", paddingTool.top + 5) // arbitrary
                    .attr("height", 60);
    timeline_section.append("text")
                    .attr("class", "timelineText")
                    .attr("y", paddingTool.top + 45) // arbitrary
                    .attr("x", xScale(ford_start)+(xScale(ford_end)-xScale(ford_start))/2)
                    .text("Christine Blasey Ford's testimony")
                    .call(wrap, 148);
    // Kavanaugh's hearing time
    timeline_section.append("rect")
                    .attr("class", "timelineRect")
                    .attr("x", xScale(kav_start))
                    .attr("width", xScale(kav_end)-xScale(kav_start))
                    .attr("y", paddingTool.top + 5)
                    .attr("height", 60);
    timeline_section.append("text")
                    .attr("class", "timelineText")
                    .attr("y", paddingTool.top + 45)
                    .attr("x", xScale(kav_start)+(xScale(kav_end)-xScale(kav_start))/2)
                    .text("Brett Kavanaugh's testimony")
                    .call(wrap, 126);
  };

  // Default settings
  current_value = parseInt(d3.select(".slider").node().value);
  start_time = parseTime("9/28/18 " + (10+current_value) + ":00:00");
  end_time = parseTime("9/28/18 " + (11+current_value) + ":00:00");
  xScale_hour = d3.scaleTime()
              .domain([start_time, end_time])
              .range([0, w_timeline]);
  // define subset of data based on time interval
  subset = dataset.filter(function(d) {
                  return (d.chyron!="" & +start_time<=+d.time & +d.time<+end_time);
                });

  // Move brand text
	svg_tool.selectAll("brandText")
       .data(["MSNBC", "CNN", "Fox News"])
       .enter()
       .append("text")
			 .text(function(d) { return d; })
			 .attr("class", "brandText")
			 .attr("x", paddingTool.left)
			 .attr("y", function(d,i) {
         if (toolView == 1) { return paddingTool.top + h_timeline_section + h_chyron/2 + (h_chyron + h_between)*i; }
         else if (toolView >= 2) { return paddingTool.top + h_timeline_section + h_timeline/2 + (h_timeline + h_between)*i; }
       })
       .style("text-anchor", "start");

  // pick out the objects that will be displayed
  var cnn_display = subset.filter(function(d) {
                      return d.network=="cnn";
                    })[0];
  var fox_display = subset.filter(function(d) {
                      return d.network=="fox";
                    })[0];
  var msnbc_display = subset.filter(function(d) {
                      return d.network=="msnbc";
                    })[0];
  var display_list = [msnbc_display, cnn_display, fox_display];

  svg_tool.selectAll("headlineRect")
          .data(["MSNBC", "CNN", "Fox News"])
          .enter()
          .append("rect")
          .attr("class", "headlineRect")
          .attr("x", function(d,i) {
            if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron; }
            else if (toolView == 2) { return paddingTool.left + (w_chyron + w_spacing)*i; }
            else if (toolView == 3) {
              if (i==0) { return (w_tool-w_chyron*2-w_spacing)/2; }
              else if (i==1) { return (w_tool-w_chyron*2-w_spacing)/2 + w_spacing+w_chyron; }
              else { return (w_tool-w_chyron)/2; }
            }
            else { return (w_tool-w_chyron)/2; }
          })
          .attr("y", function(d,i) {
            if (toolView == 1) { return paddingTool.top + h_timeline_section + (h_chyron + h_between)*i; }
            else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2; }
            else if (toolView == 3) {
              if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2; }
              else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron; }
            }
            else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i; }
          })
          .attr("width", w_chyron)
          .attr("height", h_chyron)
          .style("fill", function(d,i) {
            if (i==0) { return yellow; }
            else if (i==1) { return red; }
            else { return blue; }
          });

  // HEADLINE text - starts with very first chyron
  // Updated chyron
  svg_tool.selectAll("chyronText")
          .data(display_list)
          .enter()
          .append("text")
          .attr("class", "chyronText")
          .text(function(d) {
            if (d) {
              return d.chyron;
            }
            else { return ""; }
          })
          .attr("x", function(d,i) {
            if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron/2; }
            else if (toolView == 2) { return paddingTool.left + w_chyron/2 + (w_chyron + w_spacing)*i; }
            else if (toolView == 3) {
              if (i==0) { return w_tool/2 - w_chyron/2 - w_spacing/2; }
              else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron/2; }
              else { return w_tool/2; }
            }
            else { return w_tool/2; }
          })
          .attr("y", function(d,i) {
            if (toolView == 1) { return paddingTool.top + h_timeline_section + 30 + (h_chyron + h_between)*i; }
            else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
            else if (toolView == 3) {
              if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
              else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + 30; }
            }
            else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + 30; }
          })
          .style("font-size", function() {
             labelWidth = this.getComputedTextLength();
             availWidth = w_chyron-paddingTool.left-paddingTool.right;
             lines = Math.ceil(labelWidth/availWidth);
             if (lines <= 3) {
               return chyrontext_size;
             }
             else if (lines <= 5 ) {
               return chyrontext_size-(lines-3);
             }
             else { return 11; }
          })
          .call(wrap, w_chyron-20);

  // updated time text
  svg_tool.selectAll("chyronTimeText")
          .data(display_list)
          .enter()
          .append("text")
          .attr("class", "chyronTimeText")
          .attr("x", function(d,i) {
            if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron*.95; }
            else if (toolView == 2) { return paddingTool.left + w_chyron*.95+ (w_chyron + w_spacing)*i; }
            else if (toolView == 3) {
              if (i==0) { return w_tool/2 - w_chyron - w_spacing/2 + w_chyron*.95; }
              else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron*.95; }
              else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
            }
            else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
          })
          .attr("y", function(d,i) {
            if (toolView == 1) { return paddingTool.top + h_timeline_section + h_chyron*.95 + (h_chyron + h_between)*i; }
            else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
            else if (toolView == 3) {
              if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
              else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + h_chyron*.95; }
            }
            else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + h_chyron*.95; }
          })
          .text(function(d) {
            return "Updated: " + time_to_string(d.time);
          });

  // DOT PLOT SECTION
  // Lines
  var dot_section = svg_tool.append("g")
                             .attr("id", "dot_section")
                             .attr("transform", "translate(" + (paddingTool.left + w_brandText) + "," + (paddingTool.top + h_timeline_section) + ")");

  dot_section.selectAll("timeLine")
             .data(["MSNBC", "CNN", "Fox News"])
             .enter()
             .append("line")
             .attr("class", "timeLine")
             .attr("x1", 0)
             .attr("x2", w_timeline)
             .attr("y1", function(d,i) {
               if (toolView == 1) { return h_chyron/2 + (h_chyron + h_between)*i; }
               else if (toolView >= 2) { return h_timeline/2 + (h_timeline + h_between)*i; }
             })
             .attr("y2", function(d,i) {
               if (toolView == 1) { return h_chyron/2 + (h_chyron + h_between)*i; }
               else if (toolView >= 2) { return h_timeline/2 + (h_timeline + h_between)*i; }
             });

  // Time labels
  dot_section.append("text")
             .attr("id", "dot_start")
             .text("10:00 a.m.")
             .attr("x", 0)
             .attr("y", function(d,i) {
               if (toolView == 1) { return h_chyron/2 + (h_chyron + h_between)*i - 20; }
               else if (toolView >= 2) { return h_timeline/2 + (h_timeline + h_between)*i - 15; }
             })
             .style("text-anchor", "start")
             .style("font-family", "sans-serif")
             .style("font-size", "12px")
             .style("font-weight", "bold")
             .style("fill", "gray");
  dot_section.append("text")
             .attr("id", "dot_end")
             .text("11:00 a.m.")
             .attr("x", w_timeline)
             .attr("y", function(d,i) {
               if (toolView == 1) { return h_chyron/2 + (h_chyron + h_between)*i - 20; }
               else if (toolView >= 2) { return h_timeline/2 + (h_timeline + h_between)*i - 15; }
             })
             .style("text-anchor", "end")
             .style("font-family", "sans-serif")
             .style("font-size", "12px")
             .style("font-weight", "bold")
             .style("fill", "gray");

  // Dots
  // add outer circles for those that are highlighted / have chyrons displayed
  dot_section.selectAll("outer_circles")
             .data(display_list)
             .enter()
             .append("circle")
             .attr("class", "outer_circles")
             .attr("cx", function(d) {
               return xScale_hour(d.time);
             })
             .attr("cy", function(d) {
               if (toolView == 1) {
                 if (d.network=="msnbc") {
                   return h_chyron/2;
                 }
                 else if (d.network=="cnn") {
                   return h_chyron*1.5+h_between;
                 }
                 else if (d.network=="fox") {
                   return h_chyron*2.5+h_between*2;
                 }
               }
               if (toolView >= 2) {
                 if (d.network=="msnbc") {
                   return h_timeline/2;
                 }
                 else if (d.network=="cnn") {
                   return h_timeline*1.5+h_between;
                 }
                 else if (d.network=="fox") {
                   return h_timeline*2.5+h_between*2;
                 }
               }
             })
             .attr("r", 10)
             .style("fill", "none")
             .style("stroke", function(d) {
               if (d.network=="msnbc") {
                 return yellow;
               }
               else if (d.network=="cnn") {
                 return red;
               }
               else if (d.network=="fox") {
                 return blue;
               }
             })
             .style("stroke-width", 2);

  // Create circles
  dot_section.selectAll("main_circles")
             .data(subset)
             .enter()
             .append("circle")
             .attr("class", "main_circles")
             .attr("cx", function(d) {
               return xScale_hour(d.time);
             })
             .attr("r", 7)
             .style("opacity", function(d) {
               if (display_list.indexOf(d)>=0) { // if it's a displayed circle, then not opaque
                 return 1;
               }
               else { return 0.5; }
             })
             .attr("cy", function(d) {
               if (toolView == 1) {
                 if (d.network=="msnbc") {
                   return h_chyron/2;
                 }
                 else if (d.network=="cnn") {
                   return h_chyron*1.5+h_between;
                 }
                 else if (d.network=="fox") {
                   return h_chyron*2.5+h_between*2;
                 }
               }
               if (toolView >= 2) {
                 if (d.network=="msnbc") {
                   return h_timeline/2;
                 }
                 else if (d.network=="cnn") {
                   return h_timeline*1.5+h_between;
                 }
                 else if (d.network=="fox") {
                   return h_timeline*2.5+h_between*2;
                 }
               }
             })
             .style("fill", function(d) {
               if (d.network=="msnbc") {
                 return yellow;
               }
               else if (d.network=="cnn") {
                 return red;
               }
               else if (d.network=="fox") {
                 return blue;
               }
             })
             // interactivity
             .on("click", function(d) {
               var circle_selection = d3.select(this);
               var time_selection = d3.select(this).data()[0].time;

               // create a sub subset with data points that are between the smallest time and the time selected
               var subset_selection = subset.filter(function(d) {
                 return (+start_time<=+d.time & +d.time<=+time_selection);
               })

               // re-pick out the objects that will be displayed
               var cnn_time = d3.max(subset_selection.filter(function(d) {
                                return d.network=="cnn";
                              }), function(d) {
                                return d.time;
                              });
               var fox_time = d3.max(subset_selection.filter(function(d) {
                                return d.network=="fox";
                              }), function(d) {
                                return d.time;
                              });
               var msnbc_time = d3.max(subset_selection.filter(function(d) {
                                return d.network=="msnbc";
                              }), function(d) {
                                return d.time;
                              });

               // define a function for finding index
               function findIndex(array, attr, value, attr2, value2) {
                  for(var i = 0; i < array.length; i += 1) {
                      if (array[i][attr] === value & array[i][attr2] === value2) {
                          return i;
                      }
                  }
                  return -1;
                }

               // defining objects
               cnn_display = subset[findIndex(subset, "time", cnn_time, "network", "cnn")]
               fox_display = subset[findIndex(subset, "time", fox_time, "network", "fox")]
               msnbc_display = subset[findIndex(subset, "time", msnbc_time, "network", "msnbc")]
               display_list = [msnbc_display, cnn_display, fox_display];

               // update chyron text
               svg_tool.selectAll(".chyronText")
                               .data(display_list)
                               .text(function(d) {
                                 if (d) {
                                   return d.chyron;
                                 }
                                 else { return ""; }
                               })
                               .style("font-size", function() {
                                  labelWidth = this.getComputedTextLength();
                                  availWidth = w_chyron-paddingTool.left-paddingTool.right;
                                  lines = Math.ceil(labelWidth/availWidth);
                                  if (lines <= 3) {
                                    return chyrontext_size;
                                  }
                                  else if (lines <= 5 ) {
                                    return chyrontext_size-(lines-3);
                                  }
                                  else { return 11; }
                               })
                               .attr("x", function(d,i) {
                                 if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron/2; }
                                 else if (toolView == 2) { return paddingTool.left + w_chyron/2 + (w_chyron + w_spacing)*i; }
                                 else if (toolView == 3) {
                                   if (i==0) { return w_tool/2 - w_chyron/2 - w_spacing/2; }
                                   else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron/2; }
                                   else { return w_tool/2; }
                                 }
                                 else { return w_tool/2; }
                               })
                               .attr("y", function(d,i) {
                                 if (toolView == 1) { return paddingTool.top + h_timeline_section + 30 + (h_chyron + h_between)*i; }
                                 else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                                 else if (toolView == 3) {
                                   if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                                   else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + 30; }
                                 }
                                 else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + 30; }
                               })
                               .call(wrap, w_chyron-20)

                // updated time text
                svg_tool.selectAll(".chyronTimeText")
                                .data(display_list)
                                .text(function(d) {
                                  if (d) {
                                    return "Updated: " + time_to_string(d.time);
                                  }
                                  else { return ""; }
                                });
                dot_section.selectAll(".main_circles")
                           .style("opacity", function(d) {
                             if (display_list.indexOf(d)>=0) { // if it's a displayed circle, then not opaque
                               return 1;
                             }
                             else { return 0.5; }
                           })
                dot_section.selectAll(".outer_circles")
                           .data(display_list)
                           .attr("cx", function(d) {
                             if (d) {
                               return xScale_hour(d.time);
                             }
                           })
                           .style("stroke-width", function(d) {
                             if (d) {
                               return 2;
                             }
                             else { return 0; }
                           })
             }); // end on click interaction
}; // end setup

// Import csv and create
d3.csv("Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

  dataset = data; // Once loaded, copy to dataset

  setup();

  // INTERACTIVITY
  // When time changes...
  d3.selectAll(".slider")
    .on("input", function() {
      current_value = parseInt(d3.select(this).node().value);
      var start_int = 10+current_value;

      // Default settings
      start_time = parseTime("9/28/18 " + (10+current_value) + ":00:00");
      end_time = parseTime("9/28/18 " + (11+current_value) + ":00:00");
      xScale_hour = d3.scaleTime()
                  .domain([start_time, end_time])
                  .range([0, w_timeline]);
      // define subset of data based on time interval
      subset = dataset.filter(function(d) {
                      return (d.chyron!="" & +start_time<=+d.time & +d.time<+end_time);
                    });
      // pick out the objects that will be displayed
      cnn_display = subset.filter(function(d) {
                          return d.network=="cnn";
                        })[0];
      fox_display = subset.filter(function(d) {
                          return d.network=="fox";
                        })[0];
      msnbc_display = subset.filter(function(d) {
                          return d.network=="msnbc";
                        })[0];
      display_list = [msnbc_display, cnn_display, fox_display];

      // change labels on timeline
      svg_tool.select("#timeline_start")
              .text(function() {
                if (start_int > 12) { return (start_int-12) + ":00 p.m."; }
                else if (start_int == 12) { return (start_int) + ":00 p.m."; }
                else { return (start_int) + ":00 a.m."; }
              })
              .attr("x", function() {
                return w_sliderThumb*current_value + 15;
              })
              .style("text-anchor", "end"); // end timeline_start label

      svg_tool.select("#timeline_end")
              .text(function() {
                if ((start_int+1) > 12) { return (start_int-11) + ":00 p.m."; }
                else if ((start_int+1) == 12) { return (start_int+1) + ":00 p.m."; }
                else { return (start_int+1) + ":00 a.m."; }
              })
               .attr("x", function() {
                 return w_sliderThumb*(current_value+1) - 15;
               }); // end timeline_end label

      // change labels on timelines in dot section
      svg_tool.select("#dot_start")
              .text(function() {
                if (start_int > 12) {
                  return (start_int-12) + ":00 p.m."
                }
                else if (start_int == 12) {
                  return (start_int) + ":00 p.m."
                }
                else {
                  return (start_int) + ":00 a.m."
                }
              }); // end label
      svg_tool.select("#dot_end")
              .text(function() {
                if (start_int+1 > 12) {
                  return (start_int-12+1) + ":00 p.m."
                }
                else if (start_int+1 == 12) {
                  return (start_int+1) + ":00 p.m."
                }
                else {
                  return (start_int+1) + ":00 a.m."
                }
              }); // end label

      // Update chyron text
      svg_tool.selectAll(".chyronText")
              .data(display_list)
              .text(function(d) {
                return d.chyron;
              })
              .style("font-size", function() {
                labelWidth = this.getComputedTextLength();
                availWidth = w_chyron-paddingTool.left-paddingTool.right;
                lines = Math.ceil(labelWidth/availWidth);
                if (lines <= 3) {
                  return chyrontext_size;
                }
                else if (lines <= 5 ) {
                  return chyrontext_size-(lines-3);
                }
                else { return 11; }
              })
              .attr("x", function(d,i) {
                if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron/2; }
                else if (toolView == 2) { return paddingTool.left + w_chyron/2 + (w_chyron + w_spacing)*i; }
                else if (toolView == 3) {
                  if (i==0) { return w_tool/2 - w_chyron/2 - w_spacing/2; }
                  else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron/2; }
                  else { return w_tool/2; }
                }
                else { return w_tool/2; }
              })
              .attr("y", function(d,i) {
                if (toolView == 1) { return paddingTool.top + h_timeline_section + 30 + (h_chyron + h_between)*i; }
                else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                else if (toolView == 3) {
                  if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                  else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + 30; }
                }
                else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + 30; }
              })
              .call(wrap, w_chyron-20);
      // updated time text
      svg_tool.selectAll(".chyronTimeText")
               .data(display_list)
               .attr("x", function(d,i) {
                 if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron*.95; }
                 else if (toolView == 2) { return paddingTool.left + w_chyron*.95+ (w_chyron + w_spacing)*i; }
                 else if (toolView == 3) {
                   if (i==0) { return w_tool/2 - w_chyron - w_spacing/2 + w_chyron*.95; }
                   else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron*.95; }
                   else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
                 }
                 else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
               })
               .attr("y", function(d,i) {
                 if (toolView == 1) { return paddingTool.top + h_timeline_section + h_chyron*.95 + (h_chyron + h_between)*i; }
                 else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
                 else if (toolView == 3) {
                   if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
                   else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + h_chyron*.95; }
                 }
                 else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + h_chyron*.95; }
               })
               .text(function(d) {
                 return "Updated: " + time_to_string(d.time);
               });

      // Change circles
      // Updated time:
      var maincircles_update = svg_tool.select("#dot_section")
                                       .selectAll(".main_circles")
                                       .data(subset); // update selection
      maincircles_update.exit().remove(); // remove unneeded circles
      maincircles_update.enter() // add any additional circles needed
                        .append("circle")
                        .attr("class", "main_circles")
                        .attr("r", 7)
                        .attr("cx", function(d) {
                          return xScale_hour(d.time);
                        })
                        .attr("cy", function(d) {
                          if (toolView == 1) {
                            if (d.network=="msnbc") {
                              return h_chyron/2;
                            }
                            else if (d.network=="cnn") {
                              return h_chyron*1.5+h_between;
                            }
                            else if (d.network=="fox") {
                              return h_chyron*2.5+h_between*2;
                            }
                          }
                          if (toolView >= 2) {
                            if (d.network=="msnbc") {
                              return h_timeline/2;
                            }
                            else if (d.network=="cnn") {
                              return h_timeline*1.5+h_between;
                            }
                            else if (d.network=="fox") {
                              return h_timeline*2.5+h_between*2;
                            }
                          }
                        });

      svg_tool.select("#dot_section")
               .selectAll(".main_circles")
               .attr("cx", function(d) {
                  return xScale_hour(d.time);
               })
               .attr("cy", function(d) {
                 if (toolView == 1) {
                   if (d.network=="msnbc") {
                     return h_chyron/2;
                   }
                   else if (d.network=="cnn") {
                     return h_chyron*1.5+h_between;
                   }
                   else if (d.network=="fox") {
                     return h_chyron*2.5+h_between*2;
                   }
                 }
                 if (toolView >= 2) {
                   if (d.network=="msnbc") {
                     return h_timeline/2;
                   }
                   else if (d.network=="cnn") {
                     return h_timeline*1.5+h_between;
                   }
                   else if (d.network=="fox") {
                     return h_timeline*2.5+h_between*2;
                   }
                 }
               })
               .attr("r", 7)
               .style("fill", function(d) {
                 if (d.network=="msnbc") {
                   return yellow;
                 }
                 else if (d.network=="cnn") {
                   return red;
                 }
                 else if (d.network=="fox") {
                   return blue;
                 }
               })
               .style("opacity", function(d) {
                 if (display_list.indexOf(d)>=0) { // if it's a displayed circle, then not opaque
                   return 1;
                 }
                 else { return 0.5; }
               })
               .on("click", function(d) {
                 var circle_selection = d3.select(this);
                 var time_selection = d3.select(this).data()[0].time;

                 // create a sub subset with data points that are between the smallest time and the time selected
                 var subset_selection = subset.filter(function(d) {
                   return (+start_time<=+d.time & +d.time<=+time_selection);
                 })

                 // re-pick out the objects that will be displayed
                 var cnn_time = d3.max(subset_selection.filter(function(d) {
                                  return d.network=="cnn";
                                }), function(d) {
                                  return d.time;
                                });
                 var fox_time = d3.max(subset_selection.filter(function(d) {
                                  return d.network=="fox";
                                }), function(d) {
                                  return d.time;
                                });
                 var msnbc_time = d3.max(subset_selection.filter(function(d) {
                                  return d.network=="msnbc";
                                }), function(d) {
                                  return d.time;
                                });

                 // define a function for finding index
                 function findIndex(array, attr, value, attr2, value2) {
                    for(var i = 0; i < array.length; i += 1) {
                        if (array[i][attr] === value & array[i][attr2] === value2) {
                            return i;
                        }
                    }
                    return -1;
                  }

                 // defining objects
                 cnn_display = subset[findIndex(subset, "time", cnn_time, "network", "cnn")]
                 fox_display = subset[findIndex(subset, "time", fox_time, "network", "fox")]
                 msnbc_display = subset[findIndex(subset, "time", msnbc_time, "network", "msnbc")]
                 display_list = [msnbc_display, cnn_display, fox_display];

                 // update chyron text
                 svg_tool.selectAll(".chyronText")
                         .data(display_list)
                         .text(function(d) {
                           if (d) {
                             return d.chyron;
                           }
                           else { return ""; }
                         })
                         .style("font-size", function() {
                            labelWidth = this.getComputedTextLength();
                            availWidth = w_chyron-paddingTool.left-paddingTool.right;
                            lines = Math.ceil(labelWidth/availWidth);
                            if (lines <= 3) {
                              return chyrontext_size;
                            }
                            else if (lines <= 5 ) {
                              return chyrontext_size-(lines-3);
                            }
                            else { return 11; }
                         })
                         .attr("x", function(d,i) {
                           if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron/2; }
                           else if (toolView == 2) { return paddingTool.left + w_chyron/2 + (w_chyron + w_spacing)*i; }
                           else if (toolView == 3) {
                             if (i==0) { return w_tool/2 - w_chyron/2 - w_spacing/2; }
                             else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron/2; }
                             else { return w_tool/2; }
                           }
                           else { return w_tool/2; }
                         })
                         .attr("y", function(d,i) {
                           if (toolView == 1) { return paddingTool.top + h_timeline_section + 30 + (h_chyron + h_between)*i; }
                           else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                           else if (toolView == 3) {
                             if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + 30; }
                             else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + 30; }
                           }
                           else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + 30; }
                         })
                         .call(wrap, w_chyron-20);

                  // updated time text
                  svg_tool.selectAll(".chyronTimeText")
                          .data(display_list)
                          .text(function(d) {
                            if (d) {
                              return "Updated: " + time_to_string(d.time);
                            }
                            else { return ""; }
                          })
                          .attr("x", function(d,i) {
                            if (toolView == 1) { return paddingTool.left + w_brandText + w_timeline + btwnTimelineChyron + w_chyron*.95; }
                            else if (toolView == 2) { return paddingTool.left + w_chyron*.95+ (w_chyron + w_spacing)*i; }
                            else if (toolView == 3) {
                              if (i==0) { return w_tool/2 - w_chyron - w_spacing/2 + w_chyron*.95; }
                              else if (i==1) { return w_tool/2 - w_spacing/2 + w_spacing + w_chyron*.95; }
                              else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
                            }
                            else { return w_tool/2 - w_chyron/2 + w_chyron*.95; }
                          })
                          .attr("y", function(d,i) {
                            if (toolView == 1) { return paddingTool.top + h_timeline_section + h_chyron*.95 + (h_chyron + h_between)*i; }
                            else if (toolView == 2) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
                            else if (toolView == 3) {
                              if (i<=1) { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + h_chyron*.95; }
                              else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*3 + h_chyron + h_chyron*.95; }
                            }
                            else { return paddingTool.top + h_timeline_section + h_timeline*3 + h_spacing*2 + (h_chyron + h_spacing)*i + h_chyron*.95; }
                          });
                  svg_tool.select("#dot_section")
                             .selectAll(".main_circles")
                             .style("opacity", function(d) {
                               if (display_list.indexOf(d)>=0) { // if it's a displayed circle, then not opaque
                                 return 1;
                               }
                               else { return 0.5; }
                             })
                  svg_tool.select("#dot_section")
                             .selectAll(".outer_circles")
                             .data(display_list)
                             .attr("cx", function(d) {
                               if (d) {
                                 return xScale_hour(d.time);
                               }
                             })
                             .style("stroke-width", function(d) {
                               if (d) {
                                 return 2;
                               }
                               else { return 0; }
                             })
               }); // end on click interaction

      // update outer circles
      svg_tool.select("#dot_section")
                 .selectAll(".outer_circles")
                 .data(display_list)
                 .attr("cx", function(d) {
                     return xScale_hour(d.time)
                 })
                 .style("stroke-width", 2);

    }); // end INTERACTIVITY

}); // end d3.csv
