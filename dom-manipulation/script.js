document.addEventListener("DOMContentLoaded", () => {

  let quotes = JSON.parse(localStorage.getItem('quotes')) ||  [
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

  const quotesContainer = document.querySelector(".quotesContainer");

  

  showRandomQuoteBtn.addEventListener('click', showRandomQuote);


  function showRandomQuote() {
    if(!quotes.length) return;

    const q = quotes[Math.floor(Math.random() * quotes.length)];

    newQuoteCreation.innerHTML = `<b>Text:</b> ${q.text}<br><b>Category:</b> ${q.category}`;

    displayBox.appendChild(newQuoteCreation);
  }



  async function createAddQuoteForm() {
    quotes.push({text: quoteInputText.value.trim(), category: newQuoteCategoryText.value.trim()})

    if(!quoteInputText.value || !newQuoteCategoryText.value){
      alert("Please enter both a quote and category.");
      return;
    }

    try{
      const response = await fetch(API_URL, {method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({text, category})
      });

      const result = await response.json();
      console.log(`Quote posted to mock API: ${result}`);

      //Add locally and save
      quotes.push({text, category});
      saveQuotes();

      //Clear input and refresh UI
      quoteInputText.value = "";
      newQuoteCategoryText = "";

      populateCategories();

      filterQuotes();

      saveQuotes();
    }catch(error){
      console.error(`Error posting new quote: ${error}`);
    }
  }

  //Periodic Server Fetch Simulation
  setInterval(() => {
    console.log("Fetching latest quotes from server...");

    fetchQuotesFromServer();
  }, 15000);

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
  
  exportBtn.addEventListener("click", ExportQuotes);


  //Function for Populating the Options Values with the Quotes Categories

  const selectContainer = document.getElementById("categoryFilter");

  function populateCategories(){

    const valuesArray = [...new Set(quotes.map(q => q.category))] 
   

    for(let i = 0; i < valuesArray.length; i++) {
      let option = document.createElement("option");

      option.value = valuesArray[i];
      option.textContent = valuesArray[i];

      selectContainer.appendChild(option);
    };

  };

  //Restore the last selected category from
  const savedCategory = localStorage.getItem("selectedCategory");
  if(savedCategory) {
    selectContainer.value = savedCategory;
  }

  


  //Filter Quotes Based on Selected Category
  //FilterQuotes Function
  function filterQuotes() {
    const selectedCategory = selectContainer.value;

    localStorage.setItem("selectedCategory", selectedCategory);

    //Filter quotes
    const filtered = selectedCategory === 'All Categories' ? quotes : quotes.filter(q => q.category === selectedCategory);

    quotesContainer.innerHTML = filtered.map(q => `<p>"${q.text}" <em>- ${q.category}</em></p>`).join("");

    
  }

  selectContainer.addEventListener("change", filterQuotes);

  //Fetching Quotes from Mock Server to simulate fetching data from Mock API
  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  //Fetch Quotes from Mock Server
  async function fetchQuotesFromServer() {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();

      //Simulate quotes with categories using fake data
      quotes = data.slice(1, 10).map((item, i) => ({
        text: item.title,
        category: ["Life", "Motivation", "Happiness"][i % 3],
      }));

      //Save locally for persistence
      localStorage.setItem("quotes", JSON.stringify(quotes));

      populateCategories();

    }catch(error){
      console.error(`Error fetching quotes: ${error}`);

      //Fallback: use stored quotes if API fails
      quotes = JSON.parse(localStorage.getItem("quotes")) || [
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
      ]

      populateCategories();
    }
  }

  //Load Local Quotes (if any)
  function loadLocalQuotes() {
    const stored = localStorage.getItem("quotes");
    quotes = stored ? JSON.parse(stored) : []
  }

  //Sync Data with server (Every 30s)
  async function syncQuotes() {
    console.log("Syncing with server...");

    const serverQuotes = await fetchQuotesFromServer();

    if(serverQuotes.length === 0) return;

    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [
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

    //conflict resolution: server takes precedence
    const mergedQuotes = [...serverQuotes];

    //Keep local quotes that don't exist on the server(optional)
    for(const local of localQuotes){
      if(!serverQuotes.some(s => s.text === local.text)) {
        mergedQuotes.push(local);
      }
    }

    //Update local data
    quotes = mergedQuotes;
    saveQuotes();

    console.log("Data synced. Local quotes updated.");
    populateCategories();
  }

  //Periodic Sync
  setInterval(syncQuotes, 30000); //Every 30 seconds

  //Initialize On Load
  fetchQuotesFromServer();
  
});
