# Briefly AI

🌐 **[Live Demo — Try Briefly AI Instantly!](https://pancake37.github.io/briefly-ai/)**

![](https://img.shields.io/badge/Architecture-SPA-blue?style=flat-square) [![GitHub license](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)

Briefly AI is an intelligent text summarization and clipboard sanitation tool that lives in your browser, parses complex documents, and cleans website noise instantly -- all client-side. Use it in your browser, host it on GitHub Pages, or run it locally -- all through a gorgeous responsive interface.


<img src="./demo.gif" />

## Get started
> [!NOTE]
> Running via a local web server or directly double-clicking the HTML file is fully supported.

1. Install and launch Briefly AI:

    **Direct Launch (Recommended):**
    ```powershell
    # Simply double-click index.html or run in PowerShell:
    Start-Process .\index.html
    ```

    **Python Static Server:**
    ```bash
    python -m http.server 8000
    ```

    **NPM Static Server:**
    ```bash
    npx serve
    ```

2. Open your browser and navigate to `http://localhost:8000` (or the custom port shown by your static server).

## Features

This repository includes a single self-contained Single Page Application (SPA) that provides:
- **Intelligent Summarization**: Integrates directly with the OpenRouter API to synthesize deep markdown summaries using Gemini, Claude, and other state-of-the-art LLMs.
- **Smart Clipboard Sanitation**: Automatically intercepts paste events to remove annoying site trackers, copyright text, and website watermarks instantly.
- **Bookmarks Library**: Stores summaries locally in a beautiful side-panel feed utilizing standard browser `localStorage`.
- **Client-Side Document Parsing**: Support for dragging and dropping or uploading documents directly up to 15MB:
  - 📄 **PDFs (`.pdf`)** — extracted page-by-page.
  - 📊 **PowerPoints (`.pptx`)** — extracted slide-by-slide.
  - 📝 **Word Documents (`.docx`)** — parsed into clean, semantic Markdown.
  - 📈 **Excel Spreadsheets (`.xlsx`)** — converted sheet-by-sheet into readable Markdown tables.
  - 💻 **Plain Text / Code** (`.txt`, `.md`, `.js`, `.json`, `.html`, `.css`, `.py`) — loaded instantly.


## Reporting Bugs

We welcome your feedback. If you encounter any bugs, please file a [GitHub issue](https://github.com/pancake37/briefly-ai/issues).

## Connect

Join our GitHub discussions or connect with other developers using Briefly AI to share tips, custom prompt configurations, and ideas.

## Data collection, usage, and retention

When you use Briefly AI, we collect absolutely **zero** user metrics, telemetry, or behavioral data. The application is completely serverless.

### How we use your data

All processing happens entirely in your local browser sandbox. No intermediate servers are used.

### Privacy safeguards

We have implemented several architecture safeguards to protect your privacy:
- **Direct Endpoints**: Browser API requests are sent directly to OpenRouter's official endpoint (`https://openrouter.ai/api/v1/chat/completions`) with no third-party proxies.
- **Secure Key Storage**: Your API keys are saved locally in the browser's `localStorage` and never leave your machine.
