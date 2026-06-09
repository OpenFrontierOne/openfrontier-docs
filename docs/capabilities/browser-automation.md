# Browser Automation

## Approach: iframe DOM, not Playwright

Traditional browser automation (Playwright, Puppeteer, Selenium) requires a server running headless Chrome. That's PAGS territory. For FAGS (free, browser-only), we use **direct iframe DOM manipulation**.

## Same-origin iframe automation

For content on `*.freeagentstore.online` (all our agents), we have full DOM access:

```javascript
// Load target in iframe
const iframe = document.createElement('iframe');
iframe.src = 'https://target.freeagentstore.online';
iframe.style.cssText = 'width:100%;height:600px;border:none';
document.body.appendChild(iframe);

iframe.onload = () => {
  const doc = iframe.contentDocument;

  // Read
  const title = doc.querySelector('h1').textContent;
  const links = [...doc.querySelectorAll('a')].map(a => a.href);

  // Write
  doc.querySelector('input[name="search"]').value = 'hello';

  // Click
  doc.querySelector('button[type="submit"]').click();

  // Watch for changes
  const observer = new MutationObserver((mutations) => {
    console.log('DOM changed:', mutations);
  });
  observer.observe(doc.body, { childList: true, subtree: true });
};
```

### What this enables

| Capability | How |
|---|---|
| Fill forms | `input.value = '...'`; dispatch `input` event |
| Click buttons | `button.click()` |
| Read content | `element.textContent`, `element.innerHTML` |
| Take "screenshots" | `html2canvas` or Canvas drawImage |
| Measure layout | `getBoundingClientRect()`, `getComputedStyle()` |
| Watch changes | `MutationObserver` |
| Check accessibility | Walk DOM, check ARIA attributes |
| Measure performance | `Performance API` (resource timing, paint timing) |
| Intercept network | `Service Worker` + `fetch` event |

## FAS Quality Reporter pattern (proven)

Already in production. Runs INSIDE the iframe, posts metrics to parent:

```javascript
// Reporter runs inside the agent (iframe)
function snapshot() {
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    document: {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      scrollsX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollsY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    },
    clipping: findClippedElements(),
  };
}

window.parent.postMessage({ type: 'agent:report', data: snapshot() }, '*');
```

This pattern works for any agent-to-agent or dashboard-to-agent communication.

## Cross-origin content

### Option 1: CORS proxy via Host Worker

The Host Worker can proxy external URLs, serving them as same-origin:

```
GET https://proxy.freeagentstore.online/fetch?url=https://example.com
→ Host Worker fetches example.com
→ Serves response with freeagentstore.online origin
→ iframe loads as same-origin → full DOM access
```

!!! warning "Limitations"
    - JavaScript on the page may break (relative URLs, CORS checks)
    - Dynamic content won't execute correctly
    - Best for static HTML analysis, not interactive pages

### Option 2: Fetch + DOMParser (no iframe)

For read-only analysis:

```javascript
const html = await fetch('/proxy?url=https://example.com').then(r => r.text());
const doc = new DOMParser().parseFromString(html, 'text/html');

// Full DOM API works
const headings = doc.querySelectorAll('h1, h2, h3');
const links = doc.querySelectorAll('a[href]');
const images = doc.querySelectorAll('img');
```

### Option 3: postMessage bridge (cooperative)

If the target page includes our bridge script, it can communicate with the parent:

```javascript
// Bridge script (injected into cooperative pages)
window.addEventListener('message', (e) => {
  if (e.data.type === 'agent:command') {
    const result = executeCommand(e.data.command);
    window.parent.postMessage({ type: 'agent:result', data: result }, e.origin);
  }
});
```

## Agent-on-agent automation

Agents within the store can orchestrate each other:

```
Transcriber Agent (Whisper)
  ↑ loads in iframe
  │
Orchestrator Agent
  │
  ↓ loads in iframe
Summarizer Agent (BART)

User uploads audio → Orchestrator:
1. Loads Transcriber in iframe
2. Passes audio blob via postMessage
3. Gets transcript back
4. Loads Summarizer in iframe
5. Passes transcript via postMessage
6. Gets summary back
7. Shows both to user
```

This is multi-agent orchestration, entirely in-browser, zero server cost.

## Existing QA infrastructure (FGS Auditor)

The FGS Auditor already does Playwright-based automation:

- 12-viewport responsive testing
- Horizontal/vertical scroll detection
- Touch target size validation
- Security scanning (tracking, miners, XSS)
- Console error capture

For PAGS (pro tier), this same framework can power server-side automation agents. For FAGS, the client-side Quality Reporter pattern handles the free tier.

## Comparison: Free vs Pro automation

| Capability | FAGS (iframe DOM) | PAGS (Playwright) |
|---|---|---|
| Same-origin pages | Full access | Full access |
| Cross-origin pages | Via proxy (limited) | Full access |
| JavaScript execution | Same-origin only | All pages |
| Network interception | Service Worker | Full |
| Multi-tab | No | Yes |
| Headless | No (visible iframe) | Yes |
| Screenshots | html2canvas (approximate) | Pixel-perfect |
| File download | No | Yes |
| Auth flows | If same-origin | Any site |
