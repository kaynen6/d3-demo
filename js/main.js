//main.js file for D3 Lab Geog 575 - Kayne Neigherbauer 2017
window.onload = function(){
    
    
    
    
    
    //svg dimension variables
    var w = 1000, h = 500;
    
    //get body element from DOM
        
    var container = d3.select("body")
        .append("svg") //new svg element in the body
        .attr("width",w) //assigns the width
        .attr("height",h)
        .attr("class","container") // always assign a class (as the block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //end of block
    
    
    //inner rect block
    var innerRect = container.append("rect")
        .datum(450) //datum value
        .attr("width", function(d){
            return d *2; 
        }) //rect width
        .attr("height", function(d){
            return d;
        }) //rect height
        .attr("class","innerRect") ///class name
        .attr("x",50) //positions from left on x 
        .attr("y",50)  //y position from top
        .style("fill","#FFFFFF");
    
    var dataArray = [10,20,30,40,50];
    
    var cityPop = [ //city data
        {
            city: "Madison",
            population: 233209
        },
        {
            city: "Milwaukee",
            population: 594833
        },
        {
            city: "Green Bay",
            population: 104057
        },
        {
            city: "Superior",
            population: 27244
        },
        {
            city: "Wausau",
            population: 39106
        },
        {
            city: "La Crosse",
            population: 52440
        },
        {
            city: "Janesville",
            population: 63575
        },
        {
            city: "Eau Claire",
            population: 65883
        }
    ];
    
    
    var x = d3.scaleLinear() //create the scale
        .range([90, 810]) //output min and max
        .domain([0, 7]); //input min and max
    
    
    //find min value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });
    
    
    //find max value of array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);
    
    //scaale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([440,95])
        .domain([0, 700000]);
    
    //create y axis generator 
    var yAxis = d3.axisLeft(y);
    
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform","translate(50,0)")
        .call(yAxis);
    
    
    var circles = container.selectAll(".circles")
        .data(cityPop)
        .enter() //join
        .append("circle") //add circle for each datum
        .attr("class","circles") //apply a class name to all circles
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){ //circle radius
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){ //x coordinate via scale generator
            return x(i);
        })
        .attr("cy", function(d){ //y coordinate
            return y(d.population);
        })
        .style("fill", function(d,i){ //add fill color based on color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
    
    //create text element and add the title
    var title = container.append("text")
        .attr("class","title")
        .attr("text-anchor","middle")
        .attr("x",450)
        .attr("y", 30)
        .text("City Populations");
    
    //create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y",function(d){ //vertical position is centered on each circle
            return y(d.population) - 5;
        });
    
    //first line of label
    var nameLine = labels.append("tspan")
        .attr("class","nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });
    
    //create format generator
    var format = d3.format(",");
        
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class","popLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15")
        .text(function(d){
            return "Pop. " + format(d.population); //use format generator to format numbers
        });
    
    
    
    
    
    
};