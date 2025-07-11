chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: extractWords
  }, (results) => {
    const tableBody = document.querySelector("#wordsTable tbody");
    const rows = results[0].result;

    // Render table rows
    rows.forEach(({ word, meaning }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${word}</td><td>${meaning}</td>`;
      tableBody.appendChild(row);
    });

    // Copy to clipboard
    document.getElementById("copyBtn").addEventListener("click", () => {
      const header = "Word\tMeaning";
      const text = rows.map(row => `${row.word}\t${row.meaning}`).join("\n");
      const fullText = `${header}\n${text}`;
      navigator.clipboard.writeText(fullText).then(() => {
        const msg = document.getElementById("copiedMsg");
        msg.style.display = "inline";
        setTimeout(() => msg.style.display = "none", 5000);
      });
    });

    // Download as Excel
    document.getElementById("downloadBtn").addEventListener("click", () => {
      let csvContent = "data:text/csv;charset=utf-8,Word,Meaning\n";
      csvContent += rows.map(e => `"${e.word}","${e.meaning}"`).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "words.csv"); // use .csv for Excel
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
