$(document).ready(function(){

    var author = undefined;
    var quote = undefined;
    var quoteLink = undefined;
    var random = false;

    $(".quoteBtn").click(function(){
        if(random){
            getRandomQuote();
        }else{
            getProgrammingQuote();
        }
    });
    
    function setQuote(text){
        console.log(text);
        $("#quoteContainer p").text(text);   
    }

    function getRandomQuote(){
        $.ajax({
            url:"http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
            data:{
                format: "json"
            },
            dataType:"json",
            success: function(data){

                if(!jQuery.isEmptyObject(data)){
                    if(data.hasOwnProperty("quoteText")){
                        quote = data["quoteText"];
                    }else{
                        quote = "Sorry no Quote for you!";
                    }
                    if(data.hasOwnProperty("quoteAuthor")){
                        author = data["quoteAuthor"];
                    }else{
                        author = "No author";
                    }
                    if(data.hasOwnProperty("quoteLink")){
                        quoteLink = data["quoteLink"];
                    }

                    setQuote(quote);
                }else{
                    alert("Sorry, something went wrong! Please retry");
                }
            },
            error: function(){
                alert("Sorry, but something went wrong with the API");
            },
            type:"GET"
        })
    }

    function getProgrammingQuote(){
        $.ajax({
            url:"http://quotes.stormconsultancy.co.uk/random.json",
            data:{
                format: "json"
            },
            dataType: "jsonp",
            success: function(data){
                if(!jQuery.isEmptyObject(data)){
                    if(data.hasOwnProperty("author")){
                        author = data["author"];
                    }else{
                        author = "no author";
                    }
                    if(data.hasOwnProperty("quote")){
                        quote = data["quote"];
                    }else{
                        quote = "no quote for you";
                    }
                    if(data.hasOwnProperty("permalink")){
                        quoteLink = data["permalink"];
                    }

                    setQuote(quote);
                }else{
                    alert("Sorry, something went wrong! Please retry");
                }
            },
            error: function() {
                alert("Sorry, but something went wrong");
            },
            type:"GET"
        });
    }

});

