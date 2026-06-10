# AI Image Generation in Browser

## Status: Experimental (June 2026)

Browser-based AI image generation is possible but constrained. This page documents every approach we've tested, what works, what doesn't, and the hard limits.

## The Bottleneck: Model Size

Stable Diffusion has three components that must all fit in browser memory:

| Component | Purpose | FP32 size | FP16 size | INT4 size |
|-----------|---------|-----------|-----------|-----------|
| Text encoder (CLIP) | Converts text prompt to embeddings | 470-650MB | 235-325MB | 119MB |
| UNet | Denoises latent image (the core) | 3.3GB | 1.6GB | ~900MB |
| VAE decoder | Converts latents to pixels | 190MB | 95MB | 93MB |
| **Total** | | **~4.4GB** | **~2.0GB** | **~1.1GB** |

The UNet is always the bottleneck. Browser tabs typically can allocate 2-4GB of memory depending on the system and browser. Loading the UNet alone (1.6GB FP16) plus creating an ONNX Runtime session for it pushes close to the limit.

**Rule of thumb: Total model size under 2.5GB for broad compatibility.**

## Approach 1: ONNX Runtime Web + WebGPU (Current)

This is what FreeAdStore's AI Image Ad tool uses. Load ONNX model files directly, run inference via `onnxruntime-web`.

### Architecture

```
User prompt
    ↓
CLIP Tokenizer (JS) → token IDs [1, 77]
    ↓
Text Encoder (ONNX) → embeddings [1, 77, 768]
    ↓
Random noise [1, 4, 64, 64]  ←──┐
    ↓                             │
UNet (ONNX) → predicted noise    │  × N steps (4 for Turbo, 20 for SD1.5)
    ↓                             │
DDPM scheduler → less noisy   ───┘
    ↓
VAE Decoder (ONNX) → pixels [1, 3, 512, 512]
    ↓
Canvas → downloadable image
```

### Available ONNX Models

| Model | Repo | Total Size | UNet | Steps | Quality | Browser? |
|-------|------|-----------|------|-------|---------|----------|
| **Tiny SD** | `IlyasMoutawwakil/tiny-stable-diffusion-onnx` | 9MB | 6MB | 20 | Garbage | YES — test only |
| **SD 1.5 FP16** | `nmkd/stable-diffusion-1.5-onnx-fp16` | 2.0GB | 1.6GB | 20 | Good | YES — tested |
| **SD-Turbo** | `jdp8/sd-turbo-onnx` | 2.4GB | 1.6GB | 4 | Good | YES — tested |
| **SD-Turbo WebNN** | `microsoft/sd-turbo-webnn` | 2.4GB | 1.6GB | 4 | Good | YES — Microsoft official |
| **SD-Turbo ORT-Web** | `schmuell/sd-turbo-ort-web` | 2.4GB | 1.6GB | 4 | Good | YES — community |
| **SDXL-Turbo Q4F16** | `webnn/sdxl-turbo` | 2.5GB | 1.8GB | 4 | Better | MAYBE — quantized UNet |
| **Inkpunk ONNX** | `TheyCallMeHex/Inkpunk-Diffusion-ONNX` | 4.0GB | 3.3GB | 20 | Great style | NO — too large |
| **Ghibli ONNX** | `TheyCallMeHex/Ghibli-Diffusion-ONNX` | 4.0GB | 3.3GB | 20 | Great style | NO — too large |
| **Mo-Di ONNX** | `TheyCallMeHex/Mo-Di-Diffusion-ONNX` | 4.0GB | 3.3GB | 20 | Great style | NO — too large |
| **Redshift ONNX** | `TheyCallMeHex/Redshift-Diffusion-ONNX` | 4.0GB | 3.3GB | 20 | Great style | NO — too large |

### Models with External Data Files

Some ONNX models split weights into `model.onnx` (structure, ~2MB) + `model.onnx_data` (weights, GBs). ONNX Runtime Web supports this via the `externalData` session option:

```javascript
const modelData = await downloadFile(modelUrl);
const weightsData = await downloadFile(weightsUrl);

const session = await ort.InferenceSession.create(modelData.buffer, {
  executionProviders: ['webgpu'],
  externalData: [{ path: 'model.onnx_data', data: weightsData.buffer }]
});
```

The styled models (Inkpunk, Ghibli, etc.) use this format but their combined size (4GB+) exceeds browser memory limits.

### Known Issues

**Black image output:** The DDPM scheduler math must be correct. A naive `latents -= noise * stepSize` produces black. The correct formula:

```javascript
// Standard linear beta schedule
const betaStart = 0.00085, betaEnd = 0.012;
// ... compute alphas_cumprod

// Per step:
const predX0 = (sample - sqrt(1 - alpha_t) * noisePred) / sqrt(alpha_t);
const samplePrev = sqrt(alpha_prev) * predX0 + sqrt(1 - alpha_prev) * noisePred;
```

**Timestep dtype:** SD-Turbo expects `int64` timesteps, SD 1.5 and styled models expect `float32`. Must detect and auto-switch.

**Memory allocation:** `ArrayBuffer` allocation can fail for files >2GB. The browser tab memory limit is typically 2-4GB total.

### CLIP Tokenizer

SD models use the CLIP ViT-L tokenizer. For browser use, load `vocab.json` + `merges.txt` from the model repo and implement a simplified BPE tokenizer in JS. The tokenizer output is a `[1, 77]` int32 tensor padded with token 49407.

## Approach 2: Transformers.js

Hugging Face's [Transformers.js](https://huggingface.co/docs/transformers.js) supports many pipelines but **does NOT support `text-to-image`** as of v3 (June 2026).

### What Works

| Pipeline | Example model | Works? |
|----------|--------------|--------|
| `image-to-image` | `Xenova/swin2SR-classical-sr-x2-64` | YES — super-resolution only |
| `image-segmentation` | `Xenova/sam-vit-base` | YES |
| `background-removal` | `briaai/RMBG-1.4` | YES |
| `depth-estimation` | `Xenova/depth-anything-small-hf` | YES |
| `text-to-image` | N/A | **NO — not a supported pipeline** |

### What Doesn't Work

```javascript
// This FAILS — "Unsupported pipeline: text-to-image"
const pipe = await pipeline('text-to-image', 'onnx-community/sd-turbo');
```

Transformers.js focuses on transformer architectures (encoder/decoder models). Diffusion models (UNet + scheduler + VAE) require a different pipeline architecture that hasn't been implemented in the library yet.

### Alternative: Janus-Pro-1B

[Janus-Pro-1B](https://huggingface.co/onnx-community/Janus-Pro-1B-ONNX) is an **autoregressive** image generator (not diffusion). It generates images token-by-token like a language model. It works with Transformers.js but:

- INT4 quantized: ~2.7GB total (7 ONNX files)
- FP16: ~4.3GB (too large)
- Different architecture — not Stable Diffusion
- Reported `Float16Array` errors in some browsers

## Approach 3: WebNN (Microsoft)

[WebNN](https://www.w3.org/TR/webnn/) is a newer API (separate from WebGPU) designed for neural network inference. Microsoft has a working [SD-Turbo WebNN demo](https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/).

### Pros

- ~100ms generation time with GPU acceleration (claimed)
- Purpose-built for ML inference
- Integrated with ONNX Runtime Web

### Cons

- Only works in **Edge Canary** (not stable Chrome/Edge/Firefox/Safari)
- Very limited browser support as of June 2026
- Separate API from WebGPU — different execution path

### Model

`microsoft/sd-turbo-webnn` — ONNX model specifically optimized for WebNN with static input shapes and unused operator elimination.

## Approach 4: MLC Web Stable Diffusion

[MLC-AI's web-stable-diffusion](https://github.com/mlc-ai/web-stable-diffusion) uses the TVM compiler to compile Stable Diffusion for WebGPU.

### Pros

- Working demo at [websd.mlc.ai](https://websd.mlc.ai/)
- Uses SD v1.5 from Hugging Face diffusers
- Everything runs inside the browser, no server

### Cons

- Requires pre-compiling models with TVM (not drop-in ONNX)
- Needs 8GB GPU VRAM
- Complex build pipeline
- Not easily integrated into a single HTML file

## Approach 5: Ultra-Compressed Models

Lee Butterman demonstrated [Stable Diffusion in 250MB](https://www.leebutterman.com/2025/03/01/running-stable-diffusion-in-250-megabytes-in-onnx-and-webgpu.html) using custom 6-bit/8-bit quantization with full 16-bit compute precision.

### Key Insight

Quantizing the UNet weights to 6-bit while performing operations in 16-bit precision achieves near-original quality at a fraction of the size. A ControlNet model compressed to under 250MB.

### Status

The technique is proven but **no public drop-in model/repo is available**. Would require custom quantization of SD models to reproduce.

## Approach 6: OnnxStream (298MB RAM)

[OnnxStream](https://github.com/vitoplantamura/OnnxStream) is a C++ ONNX inference library that can run SDXL in 298MB of RAM by using tiled decoding and streaming weights from disk/HTTP.

### How It Works

- Decouples inference from weights storage via `WeightsProvider`
- Streams weights chunk-by-chunk during inference
- Tiled VAE decoding reduces peak memory from 4.4GB to 298MB
- Supports WASM (JavaScript bindings available)

### Status

Working C++ library with WASM bindings. Could theoretically run in browser via the JS/WASM bridge, but would require significant integration work. 55x less memory than ONNX Runtime with 50-200% latency increase.

## Practical Recommendations

### For Free stores (browser-only, no backend)

1. **Use SD-Turbo via ONNX Runtime Web + WebGPU** — 2.4GB download (cached), 4 steps, fastest option
2. **Default to Tiny SD (9MB)** for first-run testing so users verify their browser works
3. **Warn about memory** — 16GB system RAM recommended, close other tabs
4. **Always run in Web Worker** — diffusion steps block the main thread
5. **Cache aggressively** — use Cache Storage API for model files so they persist

### For Pro stores (backend available)

1. **Workers AI** on Cloudflare — Stable Diffusion models available, pay-per-inference
2. **Generate server-side, serve image** — no browser limits, any model, any size
3. **Batch generation** — generate 4-8 variants per prompt for A/B testing
4. **Higher resolution** — 1024x1024 or larger, not limited to 512x512

### Model selection matrix

| Scenario | Recommended model | Why |
|----------|------------------|-----|
| Test if pipeline works | Tiny SD (9MB) | Instant download, verifies WebGPU |
| General ads | SD-Turbo (2.4GB) | Fast (4 steps), good quality |
| Higher quality | SD 1.5 FP16 (2.0GB) | More steps but smaller download |
| Styled/creative ads | **Pro tier only** | Styled models need 4GB+, exceed browser limits |
| Production quality | **Pro tier (Workers AI)** | Server-side, any model, any resolution |

## Browser Compatibility (June 2026)

| Browser | WebGPU | WebNN | Status |
|---------|--------|-------|--------|
| Chrome 113+ | YES | No | Best option — widest GPU support |
| Edge 113+ | YES | Canary only | Same as Chrome (Chromium) |
| Firefox 139+ | YES | No | WebGPU shipped Nov 2025 |
| Safari 18+ | Partial | No | WebGPU support improving |
| Mobile Chrome | Limited | No | Some Android devices with Adreno/Mali GPUs |
| Mobile Safari | No | No | Not enough GPU memory |

**Global WebGPU coverage: ~82.7%** (as of late 2025, likely higher now).

## DDPM Scheduler Reference

The correct noise schedule for Stable Diffusion models:

```javascript
// Linear beta schedule (standard SD)
const betaStart = 0.00085, betaEnd = 0.012, T = 1000;
const betas = new Float32Array(T);
for (let i = 0; i < T; i++) {
  const t = i / (T - 1);
  const sqrtBeta = Math.sqrt(betaStart) * (1 - t) + Math.sqrt(betaEnd) * t;
  betas[i] = sqrtBeta * sqrtBeta;
}
const alphas = betas.map(b => 1 - b);
const alphasCumprod = new Float32Array(T);
alphasCumprod[0] = alphas[0];
for (let i = 1; i < T; i++) {
  alphasCumprod[i] = alphasCumprod[i - 1] * alphas[i];
}

// DDPM sampling step (epsilon prediction)
function ddpmStep(sample, noisePred, t, tPrev, alphasCumprod) {
  const alphaT = alphasCumprod[t];
  const alphaPrev = tPrev > 0 ? alphasCumprod[tPrev] : 1.0;

  // Predict clean image from noisy sample + predicted noise
  const predX0 = (sample - Math.sqrt(1 - alphaT) * noisePred) / Math.sqrt(alphaT);
  const clampedX0 = Math.max(-5, Math.min(5, predX0)); // stability clamp

  // Step to previous (less noisy) timestep
  return Math.sqrt(alphaPrev) * clampedX0 + Math.sqrt(1 - alphaPrev) * noisePred;
}
```

### Timestep schedules

| Model | Steps | Timesteps | Guidance scale | Timestep dtype |
|-------|-------|-----------|---------------|----------------|
| SD-Turbo | 4 | `[999, 749, 499, 249]` | 1.0 | int64 |
| SD 1.5 | 20-50 | Evenly spaced from 999 to 0 | 7.5 | float32 |
| SDXL-Turbo | 4 | `[999, 749, 499, 249]` | 0.0 | int64 |

### VAE scaling

SD models use a VAE scaling factor of `1/0.18215`. Latents must be divided by this before decoding:

```javascript
const scaledLatents = latents.map(v => v / 0.18215);
```

Output is `[1, 3, H, W]` in range `[-1, 1]`. Convert to pixels:

```javascript
const pixel = Math.round(Math.min(255, Math.max(0, (value + 1) * 127.5)));
```

## Future: What Would Change This

1. **Transformers.js adds `text-to-image` pipeline** — would simplify everything to one `pipeline()` call
2. **WebNN ships in stable Chrome** — hardware-optimized ML inference, ~10x faster
3. **Smaller high-quality models** — SDXL-Lightning, Hyper-SD, or future distilled models under 1GB
4. **Browser memory limits increase** — 8GB+ tabs would enable styled models
5. **OnnxStream WASM integration** — streaming inference could run SDXL in 300MB RAM

## Links & References

- [ONNX Runtime Web + WebGPU announcement](https://opensource.microsoft.com/blog/2024/02/29/onnx-runtime-web-unleashes-generative-ai-in-the-browser-using-webgpu/)
- [Running SD in 250MB in browser](https://www.leebutterman.com/2025/03/01/running-stable-diffusion-in-250-megabytes-in-onnx-and-webgpu.html)
- [SD in Browser with WebNN + ONNX Runtime](https://scribbler.live/2026/04/02/Stable-Diffusion-in-the-Browser-with-WebNN-ONNX.html)
- [Microsoft WebNN SD-Turbo Demo](https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/)
- [MLC Web Stable Diffusion](https://github.com/mlc-ai/web-stable-diffusion)
- [OnnxStream (298MB SDXL)](https://github.com/vitoplantamura/OnnxStream)
- [Transformers.js](https://huggingface.co/docs/transformers.js)
- [Janus-Pro-1B ONNX](https://huggingface.co/onnx-community/Janus-Pro-1B-ONNX)
- [microsoft/sd-turbo-webnn](https://huggingface.co/microsoft/sd-turbo-webnn)
- [schmuell/sd-turbo-ort-web](https://huggingface.co/schmuell/sd-turbo-ort-web)
- [How to build text-to-image with Transformers.js](https://dev.to/emojiiii/how-to-build-a-text-to-image-generator-with-react-and-transformersjs-mj)
