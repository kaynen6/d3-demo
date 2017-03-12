//main.js file for D3 Lab Geog 575 - Kayne Neigherbauer 2017
window.onload = function(){
    
    
    
    
    
    //svg dimension variables
    var w = 900, h = 500;
    
    //get body element from DOM
        
    var container = d3.select("body")
        .append("svg") //new svg element in the body
        .attr("width",w) //assigns the width
        .attr("height",h)
        .attr("class","container") // always assign a class (as the block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //end of block
    
    
    //inner rect block
    var innerRect = container.append("rect")
        .datum(400) //datum value
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
        .attr("cx", function(d, i){ //x coordinate
            return 90 + (i*90);
        })
        .attr("cy", function(d){ //y coordinate
            return 450 - (d.population *0.0005);
        });
    
    

    
    
    
    
    
    
    
    
};