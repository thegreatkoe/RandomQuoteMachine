$(document).ready(function(){

    $(".quoteBtn").click(getQuote());
    
    function getQuote(){
        var vAuthor = undefined;
        var vQuote = undefined;
        console.log("function started");
        $.ajax({
            url:"http://quotes.stormconsultancy.co.uk/random.json",
            data:{
                format: "json"
            },
            dataType: "jsonp",
            success: function(data){
                console.log("success");
                if(!jQuery.isEmptyObject(data)){
                    if(data.hasOwnProperty("author")){
                        vAuthor = data["author"];
                    }else{
                        vAuthor = "no author";
                    }
                    console.log(vAuthor);
                    if(data.hasOwnProperty("quote")){
                        vQuote = data["quote"];
                    }else{
                        vQuote = "no quote for you";
                    }
                    console.log(vQuote);
                }else{
                    alert("Sorry, something went wrong! Please retry")
                }
                /*if(data.length > 0){
                    if(data.hasOwnProperty(author)){
                        vAuthor = author;
                    }else{
                        vAuthor = "no author";
                    }
                    console.log(author);
                    if(data.hasOwnProperty(quote)){
                        vQuote = quote;
                    }else{
                        vQuote = "no quote for you";
                    }
                    console.log(quote);
                }else{
                    alert("Sorry, but your data seems to be null");
                }*/
            },
            error: function() {
                alert("Sorry, but something went wrong");
            },
            type:"GET"
        });
    }

});

