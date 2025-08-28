# DuoLingo Word Extractor - Chrome Extension

A powerful Chrome extension that automatically extracts vocabulary words and meanings from Duolingo and presents them in an elegant, sortable table with multiple export options. Works seamlessly from any website with intelligent auto-navigation.

## ✨ Key Features

### 🚀 **Smart Navigation**
- **Auto-redirect from anywhere**: Click the extension on any website - it automatically navigates to Duolingo's words page
- **Intelligent routing**: Detects your current location and guides you to the right page
- **Retry logic**: Robust extraction with up to 5 attempts to ensure data capture

### 📊 **Data Management**
- **Real-time extraction**: Automatically pulls all vocabulary words and definitions
- **Sortable interface**: Organize by newest, oldest, or alphabetical order
- **Clean presentation**: Modern table design with rounded cards and shadows

### 💾 **Export Options**
- **Copy to clipboard**: Tab-separated format perfect for pasting into spreadsheets
- **Text file (.txt)**: Beautifully formatted document with headers and separators
- **CSV file (.csv)**: Excel-compatible format for data analysis
- **XLSX file (.xlsx)**: Native Excel format support

### 🎨 **User Experience**
- **Visual feedback**: Instant confirmation for all actions with animated tooltips
- **Responsive design**: Clean, modern interface that works perfectly in the popup
- **Hover effects**: Interactive elements with smooth transitions
- **Loading states**: Progress indicators during data extraction

## 📦 Installation

1. **Download**: Clone or download this repository to your local machine
2. **Open Chrome Extensions**: Navigate to `chrome://extensions/`
3. **Enable Developer Mode**: Toggle the switch in the top-right corner
4. **Load Extension**: Click "Load Unpacked" and select the project folder
5. **Pin Extension**: Click the puzzle icon and pin DuoLingo Word Extractor for easy access

## 🚀 Quick Start

### Method 1: From Duolingo Words Page
1. Visit [duolingo.com/practice-hub/words](https://www.duolingo.com/practice-hub/words)
2. Click the extension icon
3. Words automatically appear in the popup

### Method 2: From Anywhere
1. Click the extension icon on **any website**
2. Extension automatically redirects to Duolingo words page
3. Wait for page load and automatic extraction
4. View your words in the organized table

## 🔧 How It Works

### Extraction Process
1. **Detection**: Checks if you're on the correct Duolingo page
2. **Navigation**: Automatically redirects if needed
3. **Parsing**: Scans the DOM for vocabulary elements using CSS selectors
4. **Retry Logic**: Up to 5 attempts with 2-second intervals
5. **Display**: Renders extracted data in sortable table format

### Data Format
- **Word**: The vocabulary term in your target language
- **Meaning**: The definition or translation
- **Export**: Available in multiple formats for different use cases

## 📁 Project Architecture

```
duo-lingo-words/
├── 📄 README.md              # Project documentation
├── ⚙️  manifest.json          # Chrome extension configuration
├── 🎨 popup.html             # Extension popup interface
├── 🧠 popup.js               # Core extraction and UI logic
└── 📁 icon/                  # Visual assets
    ├── 🖼️  download_csv_120by80.png
    ├── 🖼️  download_txt_120by80.png  
    ├── 🖼️  download_xlsx_120by80.png
    ├── 🖼️  icon_16x16.png
    ├── 🖼️  icon_48x48.png
    └── 🖼️  icon_128x128.png
```

## 🛠️ Technical Details

### Built With
- **JavaScript ES6+**: Modern vanilla JavaScript for optimal performance
- **Chrome Extension Manifest V3**: Latest extension platform standards
- **HTML5 & CSS3**: Semantic markup with modern styling
- **DOM Manipulation**: Efficient content script for data extraction

### Browser Compatibility
- ✅ Chrome 88+
- ✅ Chromium-based browsers (Edge, Brave, Opera)
- ⚠️  Manifest V3 required

### Permissions
- `activeTab`: Access current tab content
- `scripting`: Execute content scripts for extraction
- `tabs`: Navigate and manage browser tabs

## 🔮 Roadmap

### Planned Features
- 🌍 **Language Detection**: Auto-identify the source language
- 🔍 **Search & Filter**: Find specific words in large vocabularies  
- 📈 **Progress Tracking**: Monitor learning progress over time
- 🔄 **Auto-refresh**: Real-time updates when page content changes
- 📱 **Mobile Support**: Extension for mobile browsers
- 🎯 **Study Mode**: Built-in flashcard functionality

### Technical Improvements
- 📊 **SheetJS Integration**: Native XLSX generation
- 🚀 **Performance**: Lazy loading for large word lists
- 🔒 **Data Privacy**: Local storage with encryption options
- 🌐 **i18n Support**: Multi-language interface.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.


**Made with ❤️ for language learners worldwide**

