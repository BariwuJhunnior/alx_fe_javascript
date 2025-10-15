document.addEventListener("DOMContentLoaded", () => {

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


  let quoteInputText = document.getElementById("newQuoteText");
  let newQuoteCategoryText = document.getElementById("newQuoteCategory");
  const addBtn = document.querySelector(".add-btn");

  const displayBox = document.getElementById("quoteDisplay");
  const showRandomQuoteBtn = document.getElementById("newQuote");

  const newQuoteCreation = document.createElement("p");

  showRandomQuoteBtn.addEventListener('click', showRandomQuote);


  function showRandomQuote() {
    if(!quotes.length) return;

    const q = quotes[Math.floor(Math.random() * quotes.length)];

    newQuoteCreation.innerHTML = `Text: ${q.text}<br><b>Category: ${q.category}</b>`;

    displayBox.appendChild(newQuoteCreation);
  }



  function createAddQuoteForm() {
    quotes.push({text: quoteInputText.value, category: newQuoteCategoryText.value})

    quoteInputText.value = "";
    newQuoteCategoryText.value = "";

    console.log(quotes);
  }

  addBtn.addEventListener("click", createAddQuoteForm);







  

})

