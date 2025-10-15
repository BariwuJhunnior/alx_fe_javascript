document.addEventListener("DOMContentLoaded", () => {

  const quotes = JSON.parse(localStorage.getItem('quotes')) ||  [
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

    newQuoteCreation.innerHTML = `<b>Text:</b> ${q.text}<br><b>Category:</b> ${q.category}`;

    displayBox.appendChild(newQuoteCreation);
  }



  function createAddQuoteForm() {
    quotes.push({text: quoteInputText.value, category: newQuoteCategoryText.value})

    quoteInputText.value = "";
    newQuoteCategoryText.value = "";

    saveQuotes();

    console.log(quotes);
  }

  addBtn.addEventListener("click", createAddQuoteForm);


  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes))
  };


  //JSON File Import Function
  const fileReader = new FileReader();

  function importFromJsonFile(event) {
    
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);

      saveQuotes();
      alert('Quotes imported successfully!');
    };

    fileReader.readAsText(event.target.files[0]);
  }

  /* Export JSON File Function */
  const exportBtn = document.getElementById("exportBtn");

  // -- Export JSON FEATURE -- 
  function ExportQuotes() {

    //convert quotes array to JSON string (pretty-print)
    const jsonData = JSON.stringify(quotes, null, 2);

    //Create a Blob object with the JSON data
    const blob = new blob([jsonData], {type: 'application/json'});

    //Create a temproray URL for the Blob
    const url = URL.createObjectURL(blob);

    //Create temproray <a> element for download
    const a = document.createElement("a");
    a.href = url;
    a.download = 'quotes.json'; //file name

    a.click(); //trigger download

    //Clean up the temproray URL
    URL.revokeObjectURL(url);

  }
  
  exportBtn.addEventListener("lick", ExportQuotes);

})


