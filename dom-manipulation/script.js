const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Perseverance"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    category: "Inspiration"
  },
  {
    text: "Happiness depends upon ourselves.",
    category: "Philosophy"
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    category: "Motivation"
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    category: "Life"
  }
];


const display = document.querySelector("#quoteDisplay");

const newQuote = document.querySelector("#newQuoteText").value;
const newQuoteCategory = document.querySelector("#newQuoteCategory").value;

const newQuoteCreation = document.createElement("p");

function showRandomQuote() {
  let quotesLenght = quotes.length - 1
  let q = quotes[Math.floor(Math.random() * quotesLenght )]

  newQuoteCreation.innerHTML = `<p>"${q.text}"</p>
  <p><b>Category:</b> ${q.category}</p>
  `;

  display.appendChild(newQuoteCreation);

}


function createAddQuoteForm() {
  quotes.push({newQuote, newQuoteCategory});



}

