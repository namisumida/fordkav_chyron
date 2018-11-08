// Tool margins
var tool_margin = {top:0, bottom:10, right:20, left:20, w_between:40, h_between:10, intro_text:50};
var tool_timeline = 80; // height of timeline section
var xScale, xScale_hour;
var w_timeline = 470; // width of each line
var h_timeline = 80; // height of timeline section
var w_headlines = (w_svg - (tool_margin.left+tool_margin.right) - tool_margin.w_between)/3 // width of headline section
var h_headlines = (450 - h_timeline - tool_margin.bottom*3 - 2*tool_margin.h_between)/3 // height of EACH headline rect
var chyrontext_size = 14;
// Updated time:
function time_to_string(time) {
  var time_str = formatTime(time)
  if (+time < +parseTime("9/28/18 12:00:00")) {
    return time_str + " a.m.";
  }
  else {
    return time_str.substr(1,time_str.length) + " p.m.";
  }
}

var svg_tool = d3.select("#tool-svg")
            		 .attr("width", w_svg)
            		 .attr("height", h_svg);
var screen_tool = svg_tool.append("g");

// Import csv and create
d3.csv("../Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

  var dataset = data; // Once loaded, copy to dataset

  // 12: Tool
  // Timeline section
  // Create time xScale
  xScale = d3.scaleTime()
              .domain([d3.min(dataset, function(d) { return d.time; }),
                       d3.max(dataset, function(d) { return d.time; })])
              .range([0, w_timeline]);
  var timeline_section = screen_tool.append("g")
                                    .attr("class", "timeline_section")
                                    .attr("transform", "translate(0," + (tool_margin.top+tool_margin.intro_text+30) + ")");
  timeline_section.append("text")
                  .attr("id", "timeline_start")
                  .text("10:00 a.m.")
                  .attr("x", 80)
  timeline_section.append("text")
                  .attr("id", "timeline_end")
                  .text("11:00 a.m.")
                  .attr("x", 155);
  timeline_section.selectAll("text")
                  .attr("y", 20)
                  .style("fill", "gray")
                  .attr("font-size", 12)
                  .attr("font-family", "sans-serif");
  // Key moments
  // Ford's hearing time
  timeline_section.append("rect")
                  .attr("x", 120+xScale(ford_start))
                  .attr("width", xScale(ford_end)-xScale(ford_start))
  timeline_section.append("text")
                  .attr("class", "timeline_moments_text")
                  .attr("y", h_timeline-15)
                  .attr("x", xScale(ford_start)+120+(xScale(ford_end)-xScale(ford_start))/2)
                  .text("Christine Blasey Ford's testimony");
  // Kavanaugh's hearing time
  timeline_section.append("rect")
                  .attr("x", 120+xScale(kav_start))
                  .attr("width", xScale(kav_end)-xScale(kav_start))
  timeline_section.append("text")
                  .attr("class", "timeline_moments_text")
                  .attr("y", h_timeline-15)
                  .attr("x", xScale(kav_start)+120+(xScale(kav_end)-xScale(kav_start))/2)
                  .text("Brett Kavanaugh's testimony")
  // desinging text elements
  timeline_section.selectAll(".timeline_moments_text")
                  .attr("y", h_timeline-15)
                  .style("font-size", 12)
                  .style("font-family", "sans-serif")
                  .style("text-anchor", "middle");
  // design elements - the rects
  timeline_section.selectAll("rect")
                  .attr("y", h_timeline-55)
                  .attr("height", 45)
                  .style("fill", "orange")
                  .style("opacity", 0.3)
                  .style("stroke", "none");

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
	screen_tool.selectAll("brand_text")
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
     				 .attr("x", 90)
     				 .attr("y", function(d) {
     					 if (d.network=="msnbc") {
     							return 220;
     					 }
     					 else if (d.network=="cnn") {
     							return 220+h_headlines+tool_margin.h_between;
     					 }
     						else { return 220+h_headlines*2+tool_margin.h_between*2; }
     				 })
     				 .style("text-anchor", "end")
     				 .style("font-size", 16)
     				 .style("font-weight", 700);

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

  // HEADLINE SECTION
  var headline_section = screen_tool.append("g")
                                    .attr("class", "headline_section")
                                    .attr("transform", "translate(" + (tool_margin.left+w_headlines*2+tool_margin.w_between+20) + "," + (tool_margin.top+h_timeline+tool_margin.intro_text+30) + ")")

  // Rectangle of MSNBC
  var msnbc_rect = headline_section.append("rect")
                                    .attr("class", "headline_rect")
                                    .attr("y", 0)
                                    .style("stroke", yellow);

  // Rectangle for CNN
  var cnn_rect = headline_section.append("rect")
                  .attr("class", "headline_rect")
                  .attr("y", h_headlines+tool_margin.h_between)
                  .style("stroke", red);

  // Rectangle for Fox
  var fox_rect = headline_section.append("rect")
                  .attr("class", "headline_rect")
                  .attr("y", h_headlines*2+tool_margin.h_between*2)
                  .style("stroke", blue);

  // Designing rectangles
  screen_tool.selectAll(".headline_rect")
             .attr("x", tool_margin.left)
             .attr("height", h_headlines)
             .attr("width", w_headlines-tool_margin.right)
             .style("fill", "none");

  // HEADLINE text - starts with very first chyron
  // Updated chyron
  headline_section.selectAll("tool_chyrontext")
                  .data(display_list)
                  .enter()
                  .append("text")
                  .attr("class", "tool_chyrontext")
                  .text(function(d) {
                    if (d) {
                      return d.chyron;
                    }
                    else { return ""; }
                  })
                  .style("font-size", function() {
                     labelWidth = this.getComputedTextLength();
                     availWidth = w_headlines-tool_margin.left-tool_margin.right;
                     lines = Math.ceil(labelWidth/availWidth);
                     if (lines <= 3) {
                       return chyrontext_size;
                     }
                     else if (lines <= 5 ) {
                       return chyrontext_size-(lines-3);
                     }
                     else { return 11; }
                  })
                  .attr("x", tool_margin.left+10)
                  .attr("y", function(d) {
                    if (d) {
                      if (d.network=="msnbc") {
                        return tool_margin.h_between*2
                      }
                      else if (d.network=="cnn") {
                        return h_headlines + tool_margin.h_between*3
                      }
                      else if (d.network=="fox") {
                        return h_headlines*2 + tool_margin.h_between*4
                      }
                    }
                  })
                  .call(wrap, w_headlines-tool_margin.left*2);

  // updated time text
  headline_section.selectAll("tool_updatedtime")
                  .data(display_list)
                  .enter()
                  .append("text")
                  .attr("class", "tool_updatedtime")
                  .attr("y", function(d) {
                    if (d.network=="msnbc") {
                      return h_headlines-2;
                    }
                    else if (d.network=="cnn") {
                      return h_headlines*2+tool_margin.h_between-2;
                    }
                    else {
                      return h_headlines*3+tool_margin.h_between*2-2;
                    }
                  })
                  .text(function(d) {
                    return "Updated: " + time_to_string(d.time);
                  })
                  .attr("x", w_headlines-2)
                  .style("fill", "gray")
                  .style("font-family", "sans-serif")
                  .style("font-size", 11)
                  .style("text-anchor", "end");

  // DOT PLOT SECTION
  // Lines
  var dot_section = screen_tool.append("g")
                               .attr("id", "dot_section")
                               .attr("transform", "translate(" + 120 + "," + (tool_margin.top+h_timeline+tool_margin.intro_text+30) + ")");

  // CNN line
  dot_section.append("line")
             .attr("id", "msnbc_line")
             .attr("x1", 0)
             .attr("x2", w_timeline)
             .attr("y1", h_headlines/2)
             .attr("y2", h_headlines/2);

  // Fox line
  dot_section.append("line")
             .attr("id", "cnn_line")
             .attr("x1", 0)
             .attr("x2", w_timeline)
             .attr("y1", h_headlines*1.5+tool_margin.h_between)
             .attr("y2", h_headlines*1.5+tool_margin.h_between);

  // MSNBC line
  dot_section.append("line")
       .attr("id", "fox_line")
       .attr("x1", 0)
       .attr("x2", w_timeline)
       .attr("y1", h_headlines*2.5+tool_margin.h_between*2)
       .attr("y2", h_headlines*2.5+tool_margin.h_between*2);

  dot_section.selectAll("line")
       .style("stroke", d3.rgb(83,83,83))
       .style("stroke-width", "13px")
       .attr("opacity", 0.3); //styles that affect all lines

  // Time labels
  dot_section.append("text")
             .attr("id", "dot_start")
             .text("10:00 a.m.")
             .attr("x", 0)
             .attr("y", h_headlines/2-20)
             .style("text-anchor", "start")
             .style("font-family", "sans-serif")
             .style("font-size", "12px")
             .style("font-weight", "bold")
             .style("fill", "gray");
  dot_section.append("text")
             .attr("id", "dot_end")
             .text("11:00 a.m.")
             .attr("x", w_timeline)
             .attr("y", h_headlines/2-20)
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
               if (d.network=="msnbc") {
                 return h_headlines/2;
               }
               else if (d.network=="cnn") {
                 return h_headlines*1.5+tool_margin.h_between;
               }
               else if (d.network=="fox") {
                 return h_headlines*2.5+tool_margin.h_between*2;
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
               if (d.network=="msnbc") {
                 return h_headlines/2;
               }
               else if (d.network=="cnn") {
                 return h_headlines*1.5+tool_margin.h_between;
               }
               else if (d.network=="fox") {
                 return h_headlines*2.5+tool_margin.h_between*2;
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
               headline_section.selectAll(".tool_chyrontext")
                               .data(display_list)
                               .text(function(d) {
                                 if (d) {
                                   return d.chyron;
                                 }
                                 else { return ""; }
                               })
                               .style("font-size", function() {
                                labelWidth = this.getComputedTextLength();
                                availWidth = w_headlines-tool_margin.left-tool_margin.right;
                                lines = Math.ceil(labelWidth/availWidth);
                                if (lines <= 3) {
                                  return chyrontext_size;
                                }
                                else if (lines <= 5 ) {
                                  return chyrontext_size-(lines-3);
                                }
                                else { return 11; }
                              })
                               .attr("x", tool_margin.left+10)
                               .attr("y", function(d) {
                                 if (d) {
                                   if (d.network=="msnbc") {
                                     return tool_margin.h_between*2
                                   }
                                   else if (d.network=="cnn") {
                                     return h_headlines + tool_margin.h_between*3
                                   }
                                   else if (d.network=="fox") {
                                     return h_headlines*2 + tool_margin.h_between*4
                                   }
                                 }
                               })
                               .call(wrap, w_headlines-tool_margin.left*2)

                // updated time text
                headline_section.selectAll(".tool_updatedtime")
                                .data(display_list)
                                .text(function(d) {
                                  if (d) {
                                    return "Updated: " + time_to_string(d.time);
                                  }
                                  else { return ""; }
                                })
                                .attr("y", function(d) {
                                  if (d) {
                                    if (d.network=="msnbc") {
                                      return h_headlines-2;
                                    }
                                    else if (d.network=="cnn") {
                                      return h_headlines*2+tool_margin.h_between-2;
                                    }
                                    else {
                                      return h_headlines*3+tool_margin.h_between*2-2;
                                    }
                                  }
                                })
                                .attr("x", w_headlines-2);
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

    // INTERACTIVITY
    // When time changes...
    d3.selectAll(".slider")
      .on("change", function() {
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
        screen_tool.select("#timeline_start")
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
                    })
                    .attr("x", function() {
                      return 80+(53*current_value);
                    }); // end timeline_start label

        screen_tool.select("#timeline_end")
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
                   })
                   .attr("x", function() {
                     return 580-(53*(8-current_value));
                   }); // end timeline_end label

        // change labels on timelines in dot section
        screen_tool.select("#dot_start")
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
        screen_tool.select("#dot_end")
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
        screen_tool.select(".headline_section")
                   .selectAll(".tool_chyrontext")
                    .data(display_list)
                    .text(function(d) {
                      return d.chyron;
                    })
                    .style("font-size", function() {
                      labelWidth = this.getComputedTextLength();
                      availWidth = w_headlines-tool_margin.left-tool_margin.right;
                      lines = Math.ceil(labelWidth/availWidth);
                      if (lines <= 3) {
                        return chyrontext_size;
                      }
                      else if (lines <= 5 ) {
                        return chyrontext_size-(lines-3);
                      }
                      else { return 11; }
                    })
                    .attr("x", tool_margin.left+10)
                    .attr("y", function(d) {
                      if (d.network=="msnbc") {
                        return tool_margin.h_between*2
                      }
                      else if (d.network=="cnn") {
                        return h_headlines + tool_margin.h_between*3
                      }
                      else if (d.network=="fox") {
                        return h_headlines*2 + tool_margin.h_between*4
                      }
                    })
                    .call(wrap, w_headlines-tool_margin.left*2);
        // updated time text
        screen_tool.select(".headline_section")
                   .selectAll(".tool_updatedtime")
                   .data(display_list)
                   .attr("y", function(d) {
                     if (d.network=="msnbc") {
                       return h_headlines-2;
                     }
                     else if (d.network=="cnn") {
                       return h_headlines*2+tool_margin.h_between-2;
                     }
                     else {
                       return h_headlines*3+tool_margin.h_between*2-2;
                     }
                   })
                   .text(function(d) {
                     return "Updated: " + time_to_string(d.time);
                   })
                   .attr("x", w_headlines-2);

        // Change circles
        // Updated time:

        var maincircles_update = screen_tool.select("#dot_section")
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
                      if (d.network=="msnbc") {
                       return h_headlines/2;
                      }
                      else if (d.network=="cnn") {
                       return h_headlines*1.5+tool_margin.h_between;
                      }
                      else if (d.network=="fox") {
                       return h_headlines*2.5+tool_margin.h_between*2;
                      }
                    });

        screen_tool.select("#dot_section")
                   .selectAll(".main_circles")
                   .attr("cx", function(d) {
                      return xScale_hour(d.time);
                   })
                   .attr("cy", function(d) {
                     if (d.network=="msnbc") {
                      return h_headlines/2;
                     }
                     else if (d.network=="cnn") {
                      return h_headlines*1.5+tool_margin.h_between;
                     }
                     else if (d.network=="fox") {
                       return h_headlines*2.5+tool_margin.h_between*2;
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
                     screen_tool.select(".headline_section")
                                .selectAll(".tool_chyrontext")
                                 .data(display_list)
                                 .text(function(d) {
                                   if (d) {
                                     return d.chyron;
                                   }
                                   else { return ""; }
                                 })
                                 .style("font-size", function() {
                                    labelWidth = this.getComputedTextLength();
                                    availWidth = w_headlines-tool_margin.left-tool_margin.right;
                                    lines = Math.ceil(labelWidth/availWidth);
                                    if (lines <= 3) {
                                      return chyrontext_size;
                                    }
                                    else if (lines <= 5 ) {
                                      return chyrontext_size-(lines-3);
                                    }
                                    else { return 11; }
                                 })
                                 .attr("x", tool_margin.left+10)
                                 .attr("y", function(d) {
                                   if (d) {
                                     if (d.network=="msnbc") {
                                       return tool_margin.h_between*2
                                     }
                                     else if (d.network=="cnn") {
                                       return h_headlines + tool_margin.h_between*3
                                     }
                                     else if (d.network=="fox") {
                                       return h_headlines*2 + tool_margin.h_between*4
                                     }
                                   }
                                 })
                                 .call(wrap, w_headlines-tool_margin.left*2);

                      // updated time text
                      screen_tool.select(".headline_section")
                                 .selectAll(".tool_updatedtime")
                                  .data(display_list)
                                  .text(function(d) {
                                    if (d) {
                                      return "Updated: " + time_to_string(d.time);
                                    }
                                    else { return ""; }
                                  })
                                  .attr("y", function(d) {
                                    if (d) {
                                      if (d.network=="msnbc") {
                                        return h_headlines-2;
                                      }
                                      else if (d.network=="cnn") {
                                        return h_headlines*2+tool_margin.h_between-2;
                                      }
                                      else {
                                        return h_headlines*3+tool_margin.h_between*2-2;
                                      }
                                    }
                                  })
                                  .attr("x", w_headlines-2);
                      screen_tool.select("#dot_section")
                                 .selectAll(".main_circles")
                                 .style("opacity", function(d) {
                                   if (display_list.indexOf(d)>=0) { // if it's a displayed circle, then not opaque
                                     return 1;
                                   }
                                   else { return 0.5; }
                                 })
                      screen_tool.select("#dot_section")
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
        screen_tool.select("#dot_section")
                   .selectAll(".outer_circles")
                   .data(display_list)
                   .attr("cx", function(d) {
                       return xScale_hour(d.time)
                   })
                   .style("stroke-width", 2);

      }); // end INTERACTIVITY

}); // end d3.csv
