chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: extractWords
  }, (results) => {
    const tableBody = document.querySelector("#wordsTable tbody");
    results[0].result.forEach(({ word, meaning }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${word}</td><td>${meaning}</td>`;
      tableBody.appendChild(row);
    });
  });
});

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
