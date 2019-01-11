var colorsChyron = [d3.rgb(232,164,51), d3.rgb(212,89,84), d3.rgb(20,151,252)];
var w_chyron = 220;
var h_chyron = 120;
var w_spacing = 10;
var w_svgChyron = document.getElementById("svg-chyron1").getBoundingClientRect().width;
var h_brandText = 10;
// margins
if (w_svgChyron >= w_chyron*3 + w_spacing*4) { // display all three in one row
  var marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron*3-w_spacing*2)/2, right:(w_svgChyron-w_chyron*3-w_spacing*2)/2};
  var chyronsPerRow = 3;
}
else if (w_svgChyron >= w_chyron*2 + w_spacing*3) { // display 2 in a row
  var marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron*2-w_spacing)/2, right:(w_svgChyron-w_chyron*2-w_spacing)/2};
  var chyronsPerRow = 2;
}
else {
  var marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron)/2, right:(w_svgChyron-w_chyron)/2};
  var chyronsPerRow = 1;
};

// Calculate height
if (chyronsPerRow==3) {
  var newChyronHeight = marginChyron.top + h_brandText + h_chyron + marginChyron.bottom;
}
else if (chyronsPerRow==2) {
  var newChyronHeight = (marginChyron.top + h_brandText*2 + h_chyron*2 + w_spacing*2 + marginChyron.bottom);
}
else { var newChyronHeight = marginChyron.top + h_brandText*3 + h_chyron*3 + w_spacing*5 + marginChyron.bottom; };

////////////////////////////////////////////////////////////////////////////////
// First example of chyrons
var svgChyron1 = d3.select("#svg-chyron1");
var datasetChyron1 = [{brand: "MSNBC", text: "KAVANAUGH: I WILL NOT WITHDRAW FROM THIS PROCESS"},
                      {brand: "CNN", text: "CHRISTINE BLASEY FORD ABOUT TO TESTIFY ON KAVANAUGH ALLEGATIONS"},
                      {brand: "Fox News", text: "SEN. GRASSLEY (R-IA) DELIVERS OPENING STATEMENTS"}];
// set new height
document.getElementById("svg-chyron1").style.height = newChyronHeight + "px";
document.getElementById("intro").style.height = newChyronHeight + d3.select("#container-title").node().getBoundingClientRect().height + d3.select(".container-text").node().getBoundingClientRect().height + d3.select("#disclaimer").node().getBoundingClientRect().height + 60 + "px";
function setup_chyron1() {
  // Create brand text
  svgChyron1.selectAll("chyronBrandText")
            .data(datasetChyron1)
            .enter()
            .append("text")
            .attr("class", "brandText")
            .text(function(d) { return d.brand; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron1.selectAll("chyronRect")
            .data(datasetChyron1)
            .enter()
            .append("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return (w_svgChyron-w_chyron)/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            })
            .attr("width", w_chyron)
            .attr("height", h_chyron)
            .style("fill", function(d,i) {
              return colorsChyron[i];
            });

  // Create chyron text
  svgChyron1.selectAll("chyronText")
            .data(datasetChyron1)
            .enter()
            .append("text")
            .attr("class", "chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText + w_spacing*3;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText + w_spacing*3;
                }
                else { return marginChyron.top + h_chyron + w_spacing*8 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*4; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-40);
}; // end setup chyron 1

////////////////////////////////////////////////////////////////////////////////
// 2nd example of chyrons
var svgChyron2 = d3.select("#svg-chyron2");
var datasetChyron2 = [{brand: "MSNBC", text: "FORD CONCLUDES TESTIMONY, KAVANAUGH TO SPEAK TO SENATE SOON"},
                      {brand: "CNN", text: "CHRISTINE BLASEY FORD ARIVES TO GIVE TESTIMONY HEARING"},
                      {brand: "Fox News", text: "SOON: JUDGE KAVANAUGH TO TESTIFY ON ACCUSATIONS AGAINST HIM"}];
// set new height
document.getElementById("svg-chyron2").style.height = newChyronHeight + "px";
function setup_chyron2() {
  // Create brand text
  svgChyron2.selectAll("chyronBrandText")
            .data(datasetChyron2)
            .enter()
            .append("text")
            .attr("class", "brandText")
            .text(function(d) { return d.brand; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron2.selectAll("chyronRect")
            .data(datasetChyron2)
            .enter()
            .append("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return w_svgChyron/2 - w_chyron/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            })
            .attr("width", w_chyron)
            .attr("height", h_chyron)
            .style("fill", function(d,i) {
              return colorsChyron[i];
            });

  // Create chyron text
  svgChyron2.selectAll("chyronText")
            .data(datasetChyron2)
            .enter()
            .append("text")
            .attr("class", "chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText + w_spacing*3;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText + w_spacing*3;
                }
                else { return marginChyron.top + h_chyron + w_spacing*7 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*4; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-30);
}; // end setup chyron 2

////////////////////////////////////////////////////////////////////////////////
// 3rd example of chyrons
var svgChyron3 = d3.select("#svg-chyron3");
var datasetChyron3 = [{brand: "MSNBC", text: 'FORD: KAVANAUGH\'S \"ASSAULT ON ME DRASTICALLY ALTERED MY LIFE.\" APART FROM THE ASSAULT, \"LAST COUPLE OF WEEKS HAVE BEEN THE HARDEST OF MY LIFE'},
                      {brand: "CNN", text: "FORD: NO POLITICAL MOTIVATION FOR COMING FORWARD"},
                      {brand: "Fox News", text: "KAVANAUGH: FALSE ALLEGATIONS HAVE DESTROYED MY FAMILY AND MY NAME"}];
// set new height
document.getElementById("svg-chyron3").style.height = newChyronHeight + "px";
function setup_chyron3() {
  // Create brand text
  svgChyron3.selectAll("chyronBrandText")
            .data(datasetChyron3)
            .enter()
            .append("text")
            .attr("class", "brandText")
            .text(function(d) { return d.brand; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron3.selectAll("chyronRect")
            .data(datasetChyron3)
            .enter()
            .append("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return w_svgChyron/2 - w_chyron/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            })
            .attr("width", w_chyron)
            .attr("height", h_chyron)
            .style("fill", function(d,i) {
              return colorsChyron[i];
            });

  // Create chyron text
  svgChyron3.selectAll("chyronText")
            .data(datasetChyron3)
            .enter()
            .append("text")
            .attr("class", "chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                if (i==0) { return marginChyron.top + h_brandText + w_spacing*2; }
                else { return marginChyron.top + h_brandText + w_spacing*3; }
              }
              else if (chyronsPerRow == 2) {
                if (i==0) { return marginChyron.top + h_brandText + w_spacing*2; }
                else if (i==1) { return marginChyron.top + h_brandText + w_spacing*3; }
                else { return marginChyron.top + h_chyron + w_spacing*7 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*3; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-13)
            .style("font-size", function(d,i) {
              if (i==0) { return 11;}
            });
}; // end setup chyron3

////////////////////////////////////////////////////////////////////////////////
// Resizing
function resize_chyrons() {
  w_svgChyron = document.getElementById("svg-chyron1").getBoundingClientRect().width;
  // margins
  if (w_svgChyron >= w_chyron*3 + w_spacing*4) { // display all three in one row
    marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron*3-w_spacing*2)/2, right:(w_svgChyron-w_chyron*3-w_spacing*2)/2};
    chyronsPerRow = 3;
  }
  else if (w_svgChyron >= w_chyron*2 + w_spacing*3) { // display 2 in a row
    marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron*2-w_spacing)/2, right:(w_svgChyron-w_chyron*2-w_spacing)/2};
    chyronsPerRow = 2;
  }
  else {
    marginChyron = {top:15, bottom:10, left:(w_svgChyron-w_chyron)/2, right:(w_svgChyron-w_chyron)/2};
    chyronsPerRow = 1;
  };
  // Calculate height
  if (chyronsPerRow==3) {
    newChyronHeight = marginChyron.top + h_brandText + h_chyron + marginChyron.bottom;
  }
  else if (chyronsPerRow==2) {
    newChyronHeight = (marginChyron.top + h_brandText*2 + h_chyron*2 + w_spacing*2 + marginChyron.bottom);
  }
  else { newChyronHeight = marginChyron.top + h_brandText*3 + h_chyron*3 + w_spacing*5 + marginChyron.bottom; };

  // First graphic ////////////////////////////////////////////////////////////////////////////////
  document.getElementById("svg-chyron1").style.height = newChyronHeight + "px";
  document.getElementById("intro").style.height = newChyronHeight + d3.select("#container-title").node().getBoundingClientRect().height + d3.select(".container-text").node().getBoundingClientRect().height + d3.select("#disclaimer").node().getBoundingClientRect().height + 60 + "px";

  // Create brand text
  svgChyron1.selectAll(".brandText")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron1.selectAll("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return w_svgChyron/2 - w_chyron/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            });

  // Create chyron text
  svgChyron1.selectAll(".chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText + w_spacing*3;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText + w_spacing*3;
                }
                else { return marginChyron.top + h_chyron + w_spacing*8 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*4; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-40);

  // 2nd chyron chart ////////////////////////////////////////////////////////////////////////////////
  document.getElementById("svg-chyron2").style.height = newChyronHeight + "px";
  // Create brand text
  svgChyron2.selectAll(".brandText")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron2.selectAll("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return w_svgChyron/2 - w_chyron/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            });

  // Create chyron text
  svgChyron2.selectAll(".chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText + w_spacing*3;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText + w_spacing*3;
                }
                else { return marginChyron.top + h_chyron + w_spacing*7 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*4; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-30);

  // 3rd chyron chart ////////////////////////////////////////////////////////////////////////////////
  document.getElementById("svg-chyron3").style.height = newChyronHeight + "px";
  // Create brand text
  svgChyron3.selectAll(".brandText")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top;
                }
                else { return marginChyron.top + h_chyron + w_spacing*3 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + (h_chyron + h_brandText)*i; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i); }
              }
            });

  // Create rectangles
  svgChyron3.selectAll("rect")
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i;
                }
                else { return w_svgChyron/2 - w_chyron/2; }
              }
              else { return marginChyron.left; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.top + h_brandText;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.top + h_brandText;
                }
                else { return marginChyron.top + h_chyron + w_spacing*4 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1); }
              }
            });

  // Create chyron text
  svgChyron3.selectAll(".chyronText")
            .text(function(d) { return d.text; })
            .attr("x", function(d,i) {
              if (chyronsPerRow == 3) {
                return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
              }
              else if (chyronsPerRow == 2) {
                if (i<=1) {
                  return marginChyron.left + (w_chyron + w_spacing)*i + w_chyron/2;
                }
                else { return w_svgChyron/2 - w_chyron/2 + w_chyron/2; }
              }
              else { return marginChyron.left + w_chyron/2; }
            })
            .attr("y", function(d,i) {
              if (chyronsPerRow == 3) {
                if (i==0) { return marginChyron.top + h_brandText + w_spacing*2; }
                else { return marginChyron.top + h_brandText + w_spacing*3; }
              }
              else if (chyronsPerRow == 2) {
                if (i==0) { return marginChyron.top + h_brandText + w_spacing*2; }
                else if (i==1) { return marginChyron.top + h_brandText + w_spacing*3; }
                else { return marginChyron.top + h_chyron + w_spacing*7 + h_brandText; }
              }
              else {
                if (i==0) { return marginChyron.top + w_spacing*3; }
                else { return marginChyron.top + (h_chyron + h_brandText)*i + w_spacing*(3*i+1) + w_spacing*3 ; }
              }
            })
            .call(wrap, w_chyron-13);
}; // end resizing function
