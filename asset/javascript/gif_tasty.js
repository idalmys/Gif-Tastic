
$(document).ready(function() { 

  $("#DivError").hide();
 
 var topics=["dog", "cat", "rabbit", "hamnster", "skunk", "goldfish", "bird", "turtle",  
  "gerbil",  "chicken", "bear", "pig", "serval",  "frog"];
 var key="api_key=A3OnftmUGvi9GnrjarRIkJQVxWQZ1L6t";
 var api="https://api.giphy.com/v1/gifs/search?";
 var limit="&limit=10";
 var rating="";
 var exist=0;
 var state="";  
 var texboxInput="";

 //create addbutton function
 function ButtonAnimals(){
    $("#gift").empty();
  
  
  for(var i=0;i<topics.length;i++){
            
      var btn=$("<button>");
       btn.attr("animal-name",topics[i]);
       btn.addClass("btns");
       btn.text(topics[i]);
       $("#gift").append(btn);

    }
}
ButtonAnimals();
 
function addImages(){
    var animal=$(this).attr("animal-name");       
    var queryURL =api+ key+ "&q="+animal+limit;

    $("#img").empty();
    

   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     console.log(response);
     

     for(var i=0;i<10;i++){
       //Div conatiner
       var divImag=$("<div>");

        //Rating 
      rating = $("<p>").text("Rating: " + response.data[i].rating);
      
      //Images
     
      var animalImag=$("<img>");
    
      //atributte to images

      animalImag.attr("id","imag");
      animalImag.addClass("col-md-8"); 
      animalImag.attr("src",response.data[i].images.original_still.url)
      animalImag.attr("data-still",response.data[i].images.original_still.url);
      animalImag.attr("data-animate",response.data[i].images.original.url)
      animalImag.attr("data-state","still");
      animalImag.attr("class","gif");
    
      //Prepend objects
      divImag.prepend(animalImag);
      divImag.prepend(rating);
      
      //append objects
      $("#img").append(divImag);
      $("#DivError").hide();
      $("#animal").val("");
    }
   
   });

}

function AnimateImag(){
  state = $(this).attr("data-state");
  
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
$(document).on("click", ".gif", AnimateImag);


$(document).on("click", ".btns", addImages);


$("#submit").on("click",function(){
  event.preventDefault();
  
    texboxInput=$("#animal").val().trim();
   
   if(texboxInput.length > 1){
    exist=topics.indexOf(texboxInput);
    if(exist===-1){
      $("#DivError").hide();
      topics.push(texboxInput);
      ButtonAnimals();
      $("#animal").val("");

    }
    else{
      $("#DivError").show();
      $("#error").text("The animal already exist")
      //console.log("Exist into array");
    }
   }
   else{
      $("#DivError").show();
      $("#error").text("Please enter the animal name");
     console.log("Enter animal name");
   }
    //console.log(topics);

});


 
 
});