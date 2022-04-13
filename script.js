const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

//Show Loader

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Get Quotes from API
let apiQuotes = [];

//Show new Quote function

function newQuote(){
    //pick random quotes from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    loading();
    setTimeout(() => {
    //Check if Author is blank then replace with None
    if(!quote.author){
        author.textContent = "- Unknown";
    }
    else{
        author.textContent = "- "+quote.author;
    }
   
    //Check quote lenght to determine the styling
    console.log(quote.text.length);

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
        console.log("inside if");
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    
        quoteText.textContent = quote.text;
        complete();
    }, 200);
    
}

async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){

    }
}

//Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${author.textContent} \n Tweeted using QuotyK`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
// loading();
// complete();