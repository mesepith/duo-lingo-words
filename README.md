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

1. **On any website**: Click the extension icon in the Chrome toolbar
   - If you're not on Duolingo, it will automatically redirect you to the words page
   - If you're on Duolingo but not the words page, it will redirect you there
   - If you're already on the words page, it will start extracting immediately

2. **Wait for extraction**: The extension will automatically extract all words and meanings
   - Shows loading progress with retry attempts if needed
   - Displays words in a clean, sortable table

3. **Use the features**:
   - **Sort**: Choose from "New to Old", "Old to New", or "Alphabetical"
   - **Copy**: Copies all words and meanings to clipboard (tab-separated format)
   - **Download**: Choose from multiple formats:
     - **Text (.txt)** - Formatted text file with styling
     - **Excel (.csv)** - CSV format for spreadsheet applications
     - **Excel (.xlsx)** - Excel-compatible format

4. **Visual feedback**: Get instant confirmation when copying or downloading


## 📁 Project Structure
```
duo-lingo-words/
├── README.md
├── manifest.json
├── popup.html
├── popup.js
└── icon/
    ├── download_csv_120by80.png
    ├── download_txt_120by80.png
    ├── download_xlsx_120by80.png
    ├── icon_16x16.png
    ├── icon_48x48.png
    └── icon_128x128.png
```


## 🧠 Tech Stack

- JavaScript (Vanilla)
- Chrome Extension Manifest v3
- HTML + CSS

## 💡 Future Enhancements

- 🌍 Auto-detect language of extracted words
- 🔍 Add search and filter
- 📊 Export to `.xlsx` using SheetJS
- 🔄 Auto-refresh table on page changes

