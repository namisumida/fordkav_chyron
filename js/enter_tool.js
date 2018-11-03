function enter_tool() {
  screen11.transition()
          .duration(600)
          .ease(d3.easeLinear)
          .attr("transform", "translate(0,-500)");

  // Intro text
  screen_tool.selectAll(".intro_text")
             .selectAll("tspan")
             .transition()
             .duration(600)
             .ease(d3.easeLinear)
             .attr("y", 12);

  d3.csv("Data/KavanaughFord_longdata.csv", rowConverter, function(data) {

    var dataset = data; // Once loaded, copy to dataset

    // TImeline section
    screen_tool.select(".timeline_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(0," + (tool_margin.top+tool_margin.intro_text) + ")");

    // Headline section
    screen_tool.select(".headline_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(" + (tool_margin.left+w_headlines*2+tool_margin.w_between) + "," + (tool_margin.top+h_timeline+tool_margin.intro_text) + ")")

    // Move in dot_section
    screen_tool.select("#dot_section")
               .transition()
               .duration(600)
               .ease(d3.easeLinear)
               .attr("transform", "translate(" + 120 + "," + (tool_margin.top+h_timeline+tool_margin.intro_text) + ")");

    // INTERACTIVITY
    // When time changes...
    svg.selectAll(".slider")
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
        d3.select("#timeline_start")
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

        d3.select("#timeline_end")
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
        d3.select("#dot_start")
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
        d3.select("#dot_end")
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
        headline_section.selectAll(".chyron_text")
                        .data(display_list)
                        .text(function(d) {
                          return d.chyron;
                        })
                        .style("font-size", function() {
                          labelWidth = this.getComputedTextLength();
                          availWidth = w_headlines-margin.left-margin.right;
                          lines = Math.ceil(labelWidth/availWidth);
                          if (lines <= 4) {
                            return chyrontext_size;
                          }
                          else {
                            return chyrontext_size - Math.ceil(lines/4) + "px";
                          }
                        })
                        .attr("x", margin.left+10)
                        .attr("y", function(d) {
                          if (d.network=="msnbc") {
                            return margin.h_between*2
                          }
                          else if (d.network=="cnn") {
                            return h_headlines + margin.h_between*3
                          }
                          else if (d.network=="fox") {
                            return h_headlines*2 + margin.h_between*4
                          }
                        })
                        .call(wrap, w_headlines-margin.left*2);
        // updated time text
        headline_section.selectAll(".updatetime_text")
                        .data(display_list)
                        .attr("y", function(d) {
                          if (d.network=="msnbc") {
                            return h_headlines-2;
                          }
                          else if (d.network=="cnn") {
                            return h_headlines*2+margin.h_between-2;
                          }
                          else {
                            return h_headlines*3+margin.h_between*2-2;
                          }
                        })
                        .text(function(d) {
                          return "Updated: " + time_to_string(d.time);
                        })
                        .attr("x", w_headlines-2);

        // Change circles
        // Updated time:

        var maincircles_update = dot_section.selectAll(".main_circles")
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
                       return h_headlines*1.5+margin.h_between;
                     }
                     else if (d.network=="fox") {
                       return h_headlines*2.5+margin.h_between*2;
                     }
                    })

        dot_section.selectAll(".main_circles")
                    .attr("cx", function(d) {
                      return xScale_hour(d.time);
                    })
                    .attr("cy", function(d) {
                      if (d.network=="msnbc") {
                       return h_headlines/2;
                     }
                     else if (d.network=="cnn") {
                       return h_headlines*1.5+margin.h_between;
                     }
                     else if (d.network=="fox") {
                       return h_headlines*2.5+margin.h_between*2;
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
                     headline_section.selectAll(".chyron_text")
                                     .data(display_list)
                                     .text(function(d) {
                                       if (d) {
                                         return d.chyron;
                                       }
                                       else { return ""; }
                                     })
                                     .style("font-size", function() {
                                      labelWidth = this.getComputedTextLength();
                                      availWidth = w_headlines-margin.left-margin.right;
                                      lines = Math.ceil(labelWidth/availWidth);
                                      if (lines <= 4) {
                                        return chyrontext_size;
                                      }
                                      else {
                                        return chyrontext_size - Math.ceil(lines/4) + "px";
                                      }
                                    })
                                     .attr("x", margin.left+10)
                                     .attr("y", function(d) {
                                       //var text_h = d3.select(this).node().getBBox().height;
                                       if (d) {
                                         if (d.network=="msnbc") {
                                           return margin.h_between*2
                                         }
                                         else if (d.network=="cnn") {
                                           return h_headlines + margin.h_between*3
                                         }
                                         else if (d.network=="fox") {
                                           return h_headlines*2 + margin.h_between*4
                                         }
                                       }
                                     })
                                     .call(wrap, w_headlines-margin.left*2);

                      // updated time text
                      headline_section.selectAll(".updatetime_text")
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
                                            return h_headlines*2+margin.h_between-2;
                                          }
                                          else {
                                            return h_headlines*3+margin.h_between*2-2;
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

        // update outer circles
        dot_section.selectAll(".outer_circles")
                   .data(display_list)
                   .attr("cx", function(d) {
                       return xScale_hour(d.time)
                   })
                   .style("stroke-width", 2);

      }); // end INTERACTIVITY
    }); // end d3.csv
}
