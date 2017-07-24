$(document).ready(function(){

    
    var author = undefined;
    var quote = undefined;
    var quoteLink = undefined;
    var random = true;
    var randomQuotes = "Random Quotes";
    var programmingQuotes = "Programming Quotes";
    

    //init(randomQuotes);

    $("#section").text(randomQuotes);
    $("#programmingQuotes").click(function(){
        $("#section").text(programmingQuotes);
        getProgrammingQuote();
        random = false;
    })

    $("#randomQuotes").click(function(){
        $("#section").text(randomQuotes);
        getRandomQuote();
        random = true;
    })

    $(".quoteBtn").click(function(){
        if(random){
            getRandomQuote();
        }else{
            getProgrammingQuote();
        }
    });

    $(".closingNavBtn").click(function(){
        $(".sideNav").css("width","0");
    });

    $(".openNavBtn").click(function(){
        $(".sideNav").css("width","25%");
        //$("#mainContainer").css("background-color","#000001");
    });
});

//+++++++++++++++++++++ Helper functions +++++++++++++++++++++//
function init(sectionName){
    $("#section").text(randomQuotes);
    random = true;
    getRandomQuote();
}

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
                if(!extractData(data,"quoteAuthor","quoteText","quoteLink")){
                    getRandomQuote();
                }
            },
            error: function(){
                alert("Sorry, but something went wrong with the API! Please try it again");
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
               if(!extractData(data,"author","quote","permalink")){
                   getProgrammingQuote();
               }
            },
            error: function() {
                alert("Sorry, but something went wrong with the API! Please try it again");
            },
            type:"GET"
        });
    }

    function extractData(data,pAuthor,pQuote,pLink){
    if(!jQuery.isEmptyObject(data)){ 
        if(data.hasOwnProperty(pAuthor)){
            author = data[pAuthor];
        }else{
            author = "no author";
        }
        if(data.hasOwnProperty(pQuote)){
            quote = data[pQuote];
        }else{
            quote = "no quote for you";
        }
        if(data.hasOwnProperty(pLink)){
            if(quoteLink === data[pLink]){
                return false;
            }else{
                quoteLink = data[pLink];
            }     
        }
        setQuote(quote);
    }else{
        alert("Sorry, something went wrong! Please retry");
    }
    }

