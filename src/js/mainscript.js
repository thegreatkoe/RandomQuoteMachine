var quoteLink = "undefined";
var author = undefined;
var quote = undefined;

$(document).ready(function(){
 
    
    var programmingQuotes = "Programming Quotes";


    init(programmingQuotes);

    /*$("#section").text(randomQuotes);
    $("#programmingQuotes").click(function(){
        $("#section").text(programmingQuotes);
        getProgrammingQuote(quoteLink);
        random = false;
    })

    $("#randomQuotes").click(function(){
        $("#section").text(randomQuotes);
        getRandomQuote(quoteLink);
        random = true;
    })*/

    $(".quoteBtn").click(function(){
        getProgrammingQuote(quoteLink);
    });

    /*
    $(".closingNavBtn").click(function(){
        $(".sideNav").css("width","0");
    });

    $(".openNavBtn").click(function(){
        $(".sideNav").css("width","25%");
        //$("#mainContainer").css("background-color","#000001");
    });
    */

    $(".twitterBtn").click(function(){
        tweetCurrentQuote(quote,author)
    });
});

//+++++++++++++++++++++ Helper functions +++++++++++++++++++++//
    function init(text){
        $("#section").text(text);
        getProgrammingQuote(quoteLink);
    }

    function setQuote(text,author){
        console.log(text);
        $("#quote").text(text);
        $("#author").text("-" + author);   
    }

 /*   function getRandomQuote(pQuoteLink){
        $.ajax({
            url:"http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
            data:{
                format: "json"
            },
            dataType:"json",
            success: function(data){
                if(!extractData(data,"quoteAuthor","quoteText","quoteLink",pQuoteLink)){
                    getRandomQuote(quoteLink);
                }
            },
            error: function(){
                alert("Sorry, but something went wrong with the API! Please try it again");
            },
            type:"GET"
        })
    } */


    function getProgrammingQuote(pQuoteLink){
        $.ajax({
            url:"http://quotes.stormconsultancy.co.uk/random.json",
            data:{
                format: "json"
            },
            dataType: "jsonp",
            success: function(data){
               if(!extractData(data,"author","quote","permalink",pQuoteLink)){
                   getProgrammingQuote(quoteLink);
               }
            },
            error: function() {
                alert("Sorry, but something went wrong with the API! Please try it again");
            },
            type:"GET"
        });
    }

    function extractData(data,quoteAuthor,quoteText,quoteLink,permaLink){
    if(!jQuery.isEmptyObject(data)){ 
        if(data.hasOwnProperty(quoteAuthor)){
            if(data[quoteAuthor].length == 0){
                author = "unknown author";
            }else{
                author = data[quoteAuthor];
            }   
        }else{
            author = "unknown author";
        }
        if(data.hasOwnProperty(quoteText)){
            if(!checkLength(data[quoteText],author)){
                return false;
            }
            quote = data[quoteText];
        }else{
            quote = "no quote for you";
        }
        if(data.hasOwnProperty(quoteLink)){
            if(permaLink === data[quoteLink]){
                console.log("Same Quote as before - skipped it");
                return false;
            }else{
                quoteLink = data[quoteLink];
                console.log("Set quoteLink to: " + quoteLink);
            }     
        }
        setQuote(quote,author);
        return true;
    }else{
        alert("Sorry, something went wrong! Please retry");
        }
    }

    function tweetCurrentQuote(quoteText,author){
        var tweet = "https://\ttwitter.com/intent/tweet?text=" + encodeURIComponent(quoteText + " -" + author);
        window.open(tweet,"_blank");
    }

    function checkLength(quoteText,authorText){
        if((quoteText.length + authorText.length + 2) > 140){
            console.log("Quote has more than 140 characters and therefore is skipped");
            return false;
        }else{
            return true;
        }
    }

