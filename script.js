/** @format */

// /** @format */
import { allQuotes } from "../quotes.js";
const quoteQontainer = document.querySelector(".quote-container");
const quoteContent = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterBtn = document.querySelector(".twitter-button");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");
const quoteTextContainer = document.querySelector(".quote-text");

// show loader
function loading() {
  loader.hidden = false;
  quoteQontainer.hidden = true;
}

// Hide loading
function complete() {
  quoteQontainer.hidden = false;
  loader.hidden = true;
}

// get from API
let apiQuotes = [];
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace it with "Unknown"
  if (!quote.author) {
    author.text = "Unknown";
  } else {
    author.innerHTML = quote.author;
  }
  if (quote.text.length > 100) {
    quoteTextContainer.classList.add("quote-text-large");
  } else {
    quoteTextContainer.classList.remove("quote-text-large");
  }
  // Set quote, Hide loader
  quoteContent.innerHTML = quote.text;
  complete();
}
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    // catch error here
    console.log("Error", error);
  } finally {
  }
}
// tweet quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteContent.textContent} - ${author.textContent}`;

  window.open(tweetUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();

//----------------------------------------------------------------------------------
