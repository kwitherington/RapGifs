// Initial array of rappers
var rappers = ["Kendrick Lamar", "Notorious B.I.G.", "Eminem", "Kanye West"];
var gifLimit = 10;

$(document).ready(function() {
    // Function for displaying movie data
    function renderButtons() {
        $("#rappers-view").empty();
        for (i = 0; i < rappers.length; i++) {
            var rapperButton = $("<button>");
            rapperButton.addClass("rapper btn btn-outline-info btn-sm");
            rapperButton.id = "rapper" + i;
            rapperButton.text(rappers[i]);
            rapperButton.attr("data-name", rappers[i]);
            $("#rappers-view").prepend(rapperButton);
        }
    }
  
    // This function handles events where one button is clicked
    $("#add-rapper").on("click", function() {
  
        event.preventDefault();
        if ($("#rapper-input").val() == "" || rappers.includes($("#rapper-input").val())) {
            
        } else {
            var inputValue = $("#rapper-input").val().trim();
            rappers.push(inputValue);
            renderButtons();
        }
    });
  
    // Calling the renderButtons function to display the initial list of movies
    renderButtons();
  
    function alertRapperName() {
        var rapper = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            rapper + "&api_key=dc6zaTOxFJmzC&limit=" + gifLimit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
       
            console.log(response);

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var rapperDiv = $("<div>");
                var p = $("<p>");
                p.text(results[i].rating);
                var rapperImage = $("<img>");
                rapperImage.attr('data-still', results[i].images.fixed_height_still.url);
                rapperImage.attr('data-animate', results[i].images.fixed_height.url);
                rapperImage.attr('src', results[i].images.fixed_height_still.url);
                rapperImage.attr('data-toggle', 'still');
                rapperImage.addClass("rapperGif col-md-12");
                rapperDiv.append(p);
                rapperDiv.append(rapperImage);
                rapperDiv.addClass("gifDiv text-center");
                $("#rap-gif-view").prepend(rapperDiv);
            }
        });
    }

    function togglePlay() {
        //this seems to be grabbing the div that the image is stored in and assigning
        // an attribute to it.  How can I get it to grab the image inside?
        var state = $(this).attr('data-toggle');
        if (state == 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-toggle', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-toggle', 'still');
        }
    }

    $(document).on("click", ".rapper", alertRapperName);
    $(document).on("click", ".rapperGif", togglePlay);
})
