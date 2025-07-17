chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: extractWords
  }, (results) => {
    const tableBody = document.querySelector("#wordsTable tbody");
    const originalRows = results[0].result;
    let currentRows = [...originalRows]; // This will hold the currently displayed/sorted data

    // Function to render table rows
    function renderTable(data) {
      tableBody.innerHTML = ""; // Clear existing rows
      data.forEach(({ word, meaning }) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${word}</td><td>${meaning}</td>`;
        tableBody.appendChild(row);
      });
    }

    // Initial rendering (newest to oldest is default)
    renderTable(currentRows);

    // Sorting
    document.getElementById("sortBy").addEventListener("change", (e) => {
      const sortBy = e.target.value;
      let sortedRows = [...originalRows]; // Always sort from a fresh copy of the original data

      if (sortBy === "oldest") {
        sortedRows.reverse();
      } else if (sortBy === "alphabetical") {
        sortedRows.sort((a, b) => a.word.localeCompare(b.word));
      }
      // "newest" is the default, which is the order of `sortedRows` already

      currentRows = sortedRows; // Update the current state
      renderTable(currentRows);
    });

    // Copy to clipboard

    document.getElementById("copyBtn").addEventListener("click", () => {
      const header = "Word\tMeaning";
      // Use the currently displayed (and sorted) rows
      const text = currentRows.map(row => `${row.word}\t${row.meaning}`).join("\n");
      const fullText = `${header}\n${text}`;
      navigator.clipboard.writeText(fullText).then(() => {
        const msg = document.getElementById("copiedMsg");
        msg.style.visibility = "visible";
        setTimeout(() => msg.style.visibility = "hidden", 5000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    });

    // Download as Excel
    document.getElementById("downloadBtn").addEventListener("click", () => {
      let csvContent = "data:text/csv;charset=utf-8,Word,Meaning\n";
      // Use the currently displayed (and sorted) rows
      csvContent += currentRows.map(e => `"${e.word}","${e.meaning}"`).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "duolingo_words.csv"); // use .csv for Excel
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const msg = document.getElementById("downloadedMsg");
      msg.style.visibility = "visible";
      setTimeout(() => msg.style.visibility = "hidden", 5000); // Hide after 5 seconds
    });
  });
});

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
