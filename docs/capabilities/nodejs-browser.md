# Node.js in Browser

## WebContainers (StackBlitz)

### What it is

Full Node.js runtime compiled to WebAssembly. Runs inside the browser tab with:

- Virtual file system (read/write/watch)
- npm install (full registry access)
- Process spawning (`child_process.exec`)
- TCP networking (via ServiceWorker API)
- Build tools (vite, webpack, esbuild, tsc)
- Package managers (npm, pnpm, yarn)

### Requirements

- **SharedArrayBuffer** — requires Cross-Origin Isolation headers:
  ```
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
  ```
- **Browser support**: Chrome 92+, Edge 92+, Firefox 79+
- **NOT Safari** (SharedArrayBuffer restrictions in cross-origin contexts)
- Our Host Worker already controls headers — we can add COOP/COEP per-agent

### API usage

```javascript
import { WebContainer } from '@webcontainer/api';

// Boot the container
const container = await WebContainer.boot();

// Write files
await container.mount({
  'index.js': { file: { contents: 'console.log("Hello from Node!")' } },
  'package.json': { file: { contents: '{"name":"test","dependencies":{"lodash":"^4"}}' } }
});

// Install packages
const install = await container.spawn('npm', ['install']);
await install.exit; // Wait for completion

// Run code
const run = await container.spawn('node', ['index.js']);
run.output.pipeTo(new WritableStream({
  write(data) { console.log(data); }
}));

// Start a dev server
const server = await container.spawn('npx', ['vite']);
container.on('server-ready', (port, url) => {
  // url points to the in-browser dev server
  iframe.src = url;
});
```

### Agent use cases

| Agent | What it runs in WebContainers |
|---|---|
| **Code Linter** | ESLint/Biome on user's code → structured results |
| **TypeScript Checker** | `tsc --noEmit` → type errors with explanations |
| **Test Runner** | vitest/jest on pasted test files → pass/fail results |
| **Build Analyzer** | esbuild/webpack → bundle size analysis |
| **Package Auditor** | `npm audit` → vulnerability report |
| **Formatter** | Prettier/Biome → formatted code |
| **Markdown Renderer** | remark/unified → rendered HTML |
| **API Mock Server** | Express/Hono → local test server in iframe |
| **Static Site Builder** | Eleventy/Astro → preview site in iframe |
| **Prototype Builder** | Vite + React → working prototype from description |

### COOP/COEP headers on Host Worker

To enable WebContainers, agents that need it declare `"runtime": "webcontainers"` in their manifest. The Host Worker then adds the required headers:

```typescript
// host worker modification
if (agentManifest.runtime === 'webcontainers') {
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
}
```

!!! warning "Safari limitation"
    WebContainers don't work in Safari due to SharedArrayBuffer restrictions. Agents using WebContainers should detect this and show a "Use Chrome/Firefox" message. Non-WebContainer features should still work.

## Nodebox (CodeSandbox)

### Alternative for broader browser support

| Feature | WebContainers | Nodebox |
|---|---|---|
| Safari | No | Yes (beta) |
| SharedArrayBuffer | Required | Not required |
| npm install | Full | Full |
| Performance | Better | Good |
| TCP networking | Full (ServiceWorker) | Limited |
| License | Commercial | Commercial |

### When to use Nodebox

- Agent needs Safari support
- Agent doesn't need TCP/networking
- Simple npm package execution

## Combined: WebContainers + AI Models

The killer combination: Node.js tooling + AI intelligence, all in browser.

```
User pastes code
  ↓
WebContainers runs ESLint → finds 12 issues
  ↓
WebGPU LLM (Phi-3) analyzes issues → explains each one
  ↓
WebContainers runs Prettier → formats fixed code
  ↓
User gets: issues + explanations + fixed code
  ↓
Zero server calls. Zero cost.
```

## Combined: WebContainers + Browser Automation

```
User describes a web component
  ↓
LLM generates React code
  ↓
WebContainers boots Vite + React
  ↓
Component renders in iframe (live preview)
  ↓
User iterates via chat
  ↓
Export final code
```

This is essentially VibeCode running INSIDE the agent — the agent IS the development environment.
