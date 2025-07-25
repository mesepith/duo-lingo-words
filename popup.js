chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const duolingoWordsUrl = "https://www.duolingo.com/practice-hub/words";
  const currentTab = tabs[0];

  if (currentTab.url === duolingoWordsUrl) {
    displayMessage("Loading words...", true);
    tryExtractWords(currentTab.id, 0);
  } else if (currentTab.url.includes("duolingo.com")) {
    // If we're on Duolingo but not on the words page
    chrome.tabs.update(currentTab.id, { url: duolingoWordsUrl });
    const message = "Redirecting to words page...";
    displayMessage(message, true);
    
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === currentTab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        setTimeout(() => {
          displayMessage("Loading words...", true);
          tryExtractWords(currentTab.id, 0);
        }, 1000);
      }
    });
  } else {
    // If we're not on Duolingo at all
    const message = `This extension only works on Duolingo Words page.\n\nRedirecting you to Duolingo Words in 6 seconds...\n\nAfter the page loads, please click the extension icon again to view your words.`;
    displayMessage(message);
    
    setTimeout(() => {
      chrome.tabs.update(currentTab.id, { url: duolingoWordsUrl });
    }, 6000);
  }
});

function tryExtractWords(tabId, attempt) {
  const maxAttempts = 5;
  const retryDelay = 2000; // 2 seconds between attempts

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: extractWords
  }, (results) => {
    if (chrome.runtime.lastError || !results || !results[0] || !results[0].result || results[0].result.length === 0) {
      if (attempt < maxAttempts) {
        displayMessage(`Loading words... (Attempt ${attempt + 1}/${maxAttempts})`, true);
        setTimeout(() => tryExtractWords(tabId, attempt + 1), retryDelay);
      } else {
        handleError("Could not extract words. Please make sure you are on the correct Duolingo page and try again.");
      }
      return;
    }
    
    // Hide the message container and show the main content
    document.getElementById("message-container").style.display = "none";
    document.querySelector("main").style.display = "block";
    document.querySelector("#sort-container").style.display = "flex";
    
    const tableBody = document.querySelector("#wordsTable tbody");
    const originalRows = results[0].result;
    let currentRows = [...originalRows];

    // Function to render table rows
    function renderTable(data) {
      tableBody.innerHTML = "";
      data.forEach(({ word, meaning }) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${word}</td><td>${meaning}</td>`;
        tableBody.appendChild(row);
      });
    }

    // Initial rendering
    renderTable(currentRows);

    // Sorting
    document.getElementById("sortBy").addEventListener("change", (e) => {
      const sortBy = e.target.value;
      let sortedRows = [...originalRows];

      if (sortBy === "oldest") {
        sortedRows.reverse();
      } else if (sortBy === "alphabetical") {
        sortedRows.sort((a, b) => a.word.localeCompare(b.word));
      }

      currentRows = sortedRows;
      renderTable(currentRows);
    });

    // Copy to clipboard
    document.getElementById("copyBtn").addEventListener("click", () => {
      const header = "Word\tMeaning";
      const text = currentRows.map(row => `${row.word}\t${row.meaning}`).join("\n");
      const fullText = `${header}\n${text}`;
      navigator.clipboard.writeText(fullText).then(() => {
        showFeedback("copiedMsg");
      }).catch(err => {
        handleError("Failed to copy text: " + err);
      });
    });

    // Handle downloads in different formats
    document.querySelectorAll('.download-option').forEach(button => {
      button.addEventListener('click', (e) => {
        // Get the button element (either the clicked element or its parent if an image/span was clicked)
        const button = e.target.closest('.download-option');
        const format = button.dataset.format;
        let content = '';
        let mimeType = '';
        let fileName = `duolingo_words.${format}`;
        
        // Close the dropdown when an option is clicked
        document.querySelector('.download-dropdown').style.display = 'none';

        switch (format) {
          case 'txt':
            content = 'DuoLingo Words List\n';
            content += '=================\n\n';
            content += currentRows.map(row => {
              return `Word: ${row.word}\n` +
                     `Meaning: ${row.meaning}\n` +
                     '----------------------------------------\n';
            }).join('\n');
            mimeType = 'text/plain';
            break;
          case 'csv':
            content = 'Word,Meaning\n' + currentRows.map(row => `"${row.word}","${row.meaning}"`).join('\n');
            mimeType = 'text/csv';
            break;
          case 'xlsx':
            // For XLSX, we'll create a CSV that Excel can open
            content = 'Word,Meaning\n' + currentRows.map(row => `"${row.word}","${row.meaning}"`).join('\n');
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            fileName = 'duolingo_words.xlsx';
            break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        showFeedback("downloadedMsg");
      });
    });

    // Show dropdown on download button click
    document.getElementById("downloadBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = e.target.nextElementSibling;
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  });
}

function handleError(message) {
  console.error(message);
  displayMessage(message);
}

function displayMessage(message, isLoading = false) {
  const messageContainer = document.getElementById("message-container");
  // Replace newlines with HTML line breaks for better formatting
  messageContainer.innerHTML = message.replace(/\n/g, '<br>');
  messageContainer.style.display = "block";
  messageContainer.style.padding = "20px";
  messageContainer.style.backgroundColor = "white";
  messageContainer.style.borderRadius = "8px";
  messageContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  messageContainer.style.maxWidth = "80%";
  messageContainer.style.lineHeight = "1.5";

  // Hide main content only if not in loading state
  if (!isLoading) {
    document.querySelector("main").style.display = "none";
    document.querySelector("#sort-container").style.display = "none";
  }
}

// Content script to extract words and meanings
function extractWords() {
  const lis = document.querySelectorAll("ul._4JTMa > li");
  const data = [];

  lis.forEach(li => {
    const divs = [...li.querySelectorAll("div")];
    const filtered = divs.find(div => !div.classList.contains("AeY9P"));
    if (filtered) {
      const word = filtered.querySelector("h3")?.innerText.trim();
      const meaning = filtered.querySelector("p")?.innerText.trim();
      if (word && meaning) {
        data.push({ word, meaning });
      }
    }
  });
  return data;
}

function showFeedback(elementId) {
  const msg = document.getElementById(elementId);
  msg.style.visibility = "visible";
  setTimeout(() => msg.style.visibility = "hidden", 5000);
}
