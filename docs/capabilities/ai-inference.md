# AI Inference in Browser

## Technology stack

### Transformers.js v4 (February 2026)

The primary library for browser-based inference. v4 introduced a **C++ WebGPU runtime** that made browser AI production-grade.

- 120+ model architectures supported
- 1,200+ pre-converted checkpoints on HuggingFace
- WebGPU backend: 30x faster than WASM for supported models
- Tasks: text generation, classification, NER, Q&A, summarization, translation, speech recognition, TTS, image classification, object detection, segmentation, depth estimation, embeddings

```javascript
import { pipeline } from '@huggingface/transformers';

// Text generation
const generator = await pipeline('text-generation', 'onnx-community/Llama-3.2-1B-Instruct-q4f16', {
  device: 'webgpu'
});
const result = await generator('Explain quantum computing:', { max_new_tokens: 200 });

// Speech to text
const transcriber = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small');
const transcript = await transcriber(audioBlob);

// Image segmentation
const segmenter = await pipeline('image-segmentation', 'Xenova/sam-vit-base');
const masks = await segmenter(imageUrl, { input_points: [[300, 400]] });
```

### ONNX Runtime Web

Lower-level runtime for ONNX models. Used by kokoro-js (bepub) and any custom ONNX export.

```javascript
import * as ort from 'onnxruntime-web';

// Try WebGPU, fall back to WASM
const session = await ort.InferenceSession.create('./model.onnx', {
  executionProviders: navigator.gpu ? ['webgpu'] : ['wasm']
});
const results = await session.run({ input: tensor });
```

### WebLLM (MLC)

Optimized specifically for chat/text-generation. Pre-compiled models with TVM.

```javascript
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const engine = await CreateMLCEngine('Llama-3.2-3B-Instruct-q4f16_1-MLC');
const reply = await engine.chat.completions.create({
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### kokoro-js (proven in bepub)

Text-to-speech with Kokoro 82M model. Real-time audio generation.

```javascript
// In Web Worker (off main thread)
import { KokoroTTS } from 'kokoro-js';

const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
  dtype: navigator.gpu ? 'fp32' : 'q8'
});
const audio = await tts.generate('Hello world', { voice: 'af_heart' });
// Returns 24kHz Float32 PCM
```

## Performance benchmarks (2026)

| Model | Task | WebGPU | WASM | Notes |
|---|---|---|---|---|
| Llama 3.2 1B (q4) | Text gen | 60 tok/s | 5-10 tok/s | Laptop GPU |
| Llama 3.2 3B (q4) | Text gen | 30 tok/s | 2-5 tok/s | Needs 4GB VRAM |
| Whisper small | STT | ~1x realtime | ~0.3x realtime | 240MB model |
| Kokoro 82M | TTS | Real-time | Near real-time | 160MB model |
| SAM ViT-B | Segmentation | <2s/image | <5s/image | 200MB model |
| RMBG | Bg removal | <1s/image | <2s/image | 50MB model |
| all-MiniLM-L6 | Embeddings | <50ms | <100ms | 23MB model |

## Model size ceiling

In-browser ceiling is **3B-7B parameters** depending on quantization and available memory:

| Quantization | 1B model | 3B model | 7B model |
|---|---|---|---|
| fp16 | 2GB | 6GB | 14GB (too big) |
| q8 | 1GB | 3GB | 7GB (borderline) |
| q4 | 500MB | 1.5GB | 3.5GB (works) |

Rule of thumb: keep total model size under 2GB for broad compatibility.

## Web Worker pattern (required)

All inference MUST run in a Web Worker to prevent UI freezing:

```javascript
// main.ts
const worker = new Worker('/inference-worker.js');
worker.postMessage({ type: 'generate', text: 'Hello world', voice: 'af_heart' });
worker.onmessage = (e) => {
  if (e.data.type === 'progress') updateProgressBar(e.data.percent);
  if (e.data.type === 'result') playAudio(e.data.audio);
};

// inference-worker.js
self.onmessage = async (e) => {
  if (e.data.type === 'generate') {
    const model = await loadModel(); // cached in Cache Storage
    const result = await model.generate(e.data.text);
    self.postMessage({ type: 'result', audio: result });
  }
};
```

## Caching strategy

```
First visit:
  Browser → HuggingFace CDN → download model (200MB)
  Browser → Cache Storage API → store model

Subsequent visits:
  Browser → Cache Storage → model loaded instantly
  (No network request, works offline)
```

Cache Storage is the right choice (not IndexedDB) because:
- Designed for large binary blobs
- No size limit (browser-managed)
- Survives browser restarts
- Fast streaming reads
