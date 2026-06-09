# Agent Categories

50+ agent ideas organized by category. All run in-browser on the free tier.

## Audio

| Agent | Model | Input | Output |
|---|---|---|---|
| **Audiobook Maker** | Kokoro TTS (82M) | Text / URL / ebook | MP3 audiobook chapters |
| **Transcriber** | Whisper small | Audio / video file | Text transcript + timestamps |
| **Voice Cloner** | Kokoro + voice embedding | Text + voice sample | Speech in target voice |
| **Podcast Summarizer** | Whisper + BART | Podcast audio | Written summary + key points |
| **Music Separator** | Demucs (ONNX) | Song file | Vocals / drums / bass / other stems |
| **Audio Translator** | Whisper + NLLB + Kokoro | Audio in language A | Audio in language B |
| **Meeting Notes** | Whisper + T5 | Meeting recording | Structured notes + action items |
| **Sound Effects Generator** | AudioLDM (small) | Text description | Sound effect WAV |

## Vision / Image

| Agent | Model | Input | Output |
|---|---|---|---|
| **Background Remover** | RMBG / SAM | Image | Image with transparent background |
| **Image Describer** | Florence-2 | Image | Detailed text description |
| **Object Detector** | YOLO | Image / webcam | Annotated image with labels |
| **OCR Scanner** | Florence-2 / Tesseract | Photo of document | Extracted text |
| **Depth Map** | DPT | Image | Depth visualization |
| **Image Upscaler** | Real-ESRGAN (ONNX) | Low-res image | 4x upscaled image |
| **Style Transfer** | Neural style (ONNX) | Image + style | Stylized image |
| **Face Detector** | MediaPipe / BlazeFace | Image / webcam | Face landmarks + emotion |
| **Color Palette Extractor** | k-means + CLIP | Image | Color palette + hex codes |
| **Image Compressor** | Browser canvas + quality tuning | Image | Optimized smaller image |

## Text / Language

| Agent | Model | Input | Output |
|---|---|---|---|
| **Translator** | NLLB-200 | Text in any language | Text in target language |
| **Summarizer** | BART / T5 | Long text / article URL | Concise summary |
| **Grammar Checker** | DistilBERT fine-tuned | Text | Corrected text + explanations |
| **Sentiment Analyzer** | DistilBERT | Reviews / comments | Sentiment scores + analysis |
| **Text-to-Emoji** | Classification model | Text | Emoji summary |
| **Paraphraser** | T5-small | Text | Rewritten text |
| **Keyword Extractor** | TF-IDF + embeddings | Document | Key phrases ranked |
| **Readability Scorer** | Rule-based + LLM | Text | Grade level + suggestions |
| **Name Generator** | Small LLM | Domain / category | Name suggestions |

## Code / Developer

| Agent | Model | Input | Output |
|---|---|---|---|
| **Code Reviewer** | Phi-3 mini / Gemma 2B | Code snippet | Review comments + suggestions |
| **Code Explainer** | Small LLM | Code | Plain English explanation |
| **Regex Builder** | Small LLM | Natural language | Regex pattern + test cases |
| **JSON Formatter** | Built-in | Messy JSON | Formatted + validated JSON |
| **CSS Generator** | Small LLM | Description | CSS code |
| **SQL Helper** | Small LLM | Natural language | SQL query |
| **Diff Viewer** | Built-in | Two code snippets | Visual diff |
| **Linter** | WebContainers + ESLint | Code | Lint results + fixes |
| **TypeScript Playground** | WebContainers + tsc | TypeScript | Compiled JS + type errors |

## Document / Data

| Agent | Model | Input | Output |
|---|---|---|---|
| **PDF Reader** | PDF.js + Florence-2 | PDF file | Extracted text + Q&A |
| **CSV Analyzer** | In-browser LLM + Chart.js | CSV file | Charts + insights + summary |
| **Spreadsheet Formula** | Small LLM | Description | Excel/Sheets formula |
| **Invoice Parser** | Florence-2 / LayoutLM | Invoice image/PDF | Structured data (JSON) |
| **Resume Parser** | NER model | Resume PDF | Structured profile |
| **Markdown Editor** | Built-in + LLM assist | Markdown text | Live preview + AI suggestions |
| **Citation Generator** | Rule-based + NLP | Paper title / DOI | Formatted citation |
| **Data Anonymizer** | NER (PII detection) | Text with PII | Redacted text |

## Productivity / Utility

| Agent | Model | Input | Output |
|---|---|---|---|
| **Smart Clipboard** | Embeddings + IndexedDB | Copy anything | Searchable clipboard history |
| **Flashcard Maker** | T5 / small LLM | Study material | Anki-style flashcards |
| **Mind Map Generator** | NLP + D3.js | Text / outline | Visual mind map |
| **Timer with Focus** | Built-in + ambient sounds | Pomodoro config | Focus timer + analytics |
| **QR Code AI** | Built-in + CLIP | Text / URL / image | QR code (smart formatting) |
| **Color Picker AI** | CLIP + color theory | Description / image | Color palette |
| **Font Pairer** | Heuristic + preview | Style description | Google Font combinations |

## Browser Automation

| Agent | Model | Input | Output |
|---|---|---|---|
| **Form Filler** | DOM inspection + LLM | Form URL (iframe) | Auto-filled form |
| **Screenshot Differ** | Canvas + pixel diff | Two URLs | Visual diff report |
| **Accessibility Checker** | DOM audit (axe-core rules) | URL (iframe) | A11y issues + fixes |
| **SEO Analyzer** | HTML parsing + rules | URL | SEO score + recommendations |
| **Performance Profiler** | Performance API | URL (iframe) | Core Web Vitals report |
| **Link Checker** | Fetch + parse | URL | Broken links report |
| **Responsive Tester** | iframe resize | URL | Multi-viewport screenshots |

## Creative

| Agent | Model | Input | Output |
|---|---|---|---|
| **Logo Maker** | Stable Diffusion | Brand description | Logo variations |
| **Avatar Generator** | SD / SDXL | Description or selfie | Avatar illustrations |
| **Meme Generator** | CLIP + templates | Text | Meme with matching template |
| **Story Writer** | Small LLM | Prompt / genre | Short story |
| **Poetry Generator** | Small LLM | Theme / style | Poem |
| **Coloring Page** | SD (line art LoRA) | Description | Printable coloring page |

## Agents using WebContainers + Ollama combo

These are power-user agents that combine Node.js in browser with local LLM:

| Agent | Stack | What it does |
|---|---|---|
| **Full Stack Reviewer** | WebContainers + Ollama | Paste repo → runs ESLint, tsc, tests → LLM reviews |
| **Dependency Auditor** | WebContainers (npm audit) + Ollama | Check for vulnerabilities + explain risks |
| **API Tester** | WebContainers (node-fetch) + Ollama | Test endpoints, LLM validates responses |
| **Doc Generator** | WebContainers (TypeDoc) + Ollama | Generate docs from source code |
| **Prototype Builder** | WebContainers (Vite) + Ollama | Describe feature → working prototype |
