# Duo Lingo Word Extractor - Browser Extension

A lightweight Chrome extension that extracts vocabulary words and their meanings from language learning sites like Duolingo and displays them in a clean, copyable, and downloadable table format.

## ✨ Features

- 📋 Extracts words and meanings directly from Duolingo pages
- ✅ Clean table view in popup
- 📎 Copy words and meanings to clipboard (with ✅ feedback)
- 📥 Download the extracted words as an Excel-compatible CSV
- 🌐 Works across different languages (not just Spanish)

## 📦 Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (top right)
4. Click **Load Unpacked**
5. Select the folder where you downloaded/cloned this repo

## 🔍 How to Use

1. Visit [https://www.duolingo.com/practice-hub/words](https://www.duolingo.com/practice-hub/words)
2. Click the extension icon in the Chrome toolbar
3. The extension will extract all words and their meanings
4. View the data in a clean table
5. Use:
   - **Copy** to copy the list to your clipboard
   - **Download as Excel** to save the words as a CSV file


## 📁 Project Structure
/duo-lingo-word-extractor
├── manifest.json
├── popup.html
├── popup.js
├── /icon
│ ├── icon_16x16.png
│ ├── icon_48x48.png
│ └── icon_128x128.png


## 🧠 Tech Stack

- JavaScript (Vanilla)
- Chrome Extension Manifest v3
- HTML + CSS

## 💡 Future Enhancements

- 🌍 Auto-detect language of extracted words
- 🔍 Add search and filter
- 📊 Export to `.xlsx` using SheetJS
- 🔄 Auto-refresh table on page changes

