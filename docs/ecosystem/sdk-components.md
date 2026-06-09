# SDK Components — Simulation Engines as Building Blocks

Every Free Store ships simulation engines as importable JavaScript/TypeScript packages. Use them standalone, embed in your app, or let AI agents call them programmatically.

## Available SDKs

### @freequantumstore/sdk — Quantum Circuit Engine

```typescript
import { QuantumCircuit } from '@freequantumstore/sdk';

const qc = new QuantumCircuit(3);
qc.h(0).cx(0, 1).cx(0, 2);  // GHZ state

const probs = qc.getProbabilities();
// [0.5, 0, 0, 0, 0, 0, 0, 0.5]  — only |000⟩ and |111⟩

const shots = qc.sample(1000);
// { "000": 498, "111": 502 }

console.log(qc.toQiskit());
// from qiskit import QuantumCircuit
// qc = QuantumCircuit(3)
// qc.h(0)
// qc.cx(0, 1)
// qc.cx(0, 2)
```

**Capabilities:** Up to 20 qubits (browser RAM limit). All standard gates (H, X, Y, Z, S, T, Rx, Ry, Rz, CX, CZ, SWAP, Toffoli). Measurement with collapse. Sampling without collapse. Export to Qiskit and Cirq code.

**Use cases:**
- Embed quantum circuit simulator in educational content
- Quantum algorithm research prototyping
- CI testing for quantum programs (verify circuits produce expected states)
- AI agents building and testing quantum circuits

---

### @freebiostore/sdk — Molecule Analyzer

```typescript
import { Molecule } from '@freebiostore/sdk';

const caffeine = new Molecule('CN1C=NC2=C1C(=O)N(C(=O)N2C)C');

console.log(caffeine.molecularWeight);  // 194.19
console.log(caffeine.formula);          // "C8H10N4O2"
console.log(caffeine.logP);             // -0.07
console.log(caffeine.lipinskiRule);
// { pass: true, violations: [] }
```

**Capabilities:** Full SMILES parser (branches, rings, aromatics, stereochemistry). Molecular weight, LogP, TPSA, H-bond donors/acceptors, rotatable bonds, ring count. Lipinski's Rule of 5 drug-likeness scoring.

**Use cases:**
- Drug screening pipeline (check drug-likeness before expensive lab work)
- Chemistry education (parse any molecule, visualize properties)
- AI agents evaluating molecular candidates

---

### @freespacestore/sdk — Orbital Mechanics

```typescript
import { Orbit, RocketEquation } from '@freespacestore/sdk';

const iss = new Orbit({ altitude: 408, inclination: 51.6 });
console.log(iss.period);    // 5554 seconds (92.6 min)
console.log(iss.velocity);  // 7.66 km/s

const geo = new Orbit({ altitude: 35786 });
const transfer = Orbit.hohmannTransfer(iss, geo);
console.log(transfer.totalDeltaV);  // 3.94 km/s
console.log(transfer.transferTime); // 19050 seconds (5.3 hours)

const dv = RocketEquation.deltaV(3100, 549054, 130000);
// 4521 m/s (Falcon 9 first stage)
```

**Capabilities:** Kepler orbital mechanics, vis-viva equation, Hohmann transfers, rocket equation, planet presets (Mercury through Neptune), orbital position calculation.

**Use cases:**
- Mission feasibility checks (can this rocket reach Mars?)
- Spacecraft trajectory planning
- Space education
- AI agents computing orbital parameters

---

### @freechipstore/sdk — Logic & ALU Simulator

```typescript
import { LogicGate, ALU, BinaryConverter } from '@freechipstore/sdk';

// Logic gates
const and = LogicGate.get('AND');
console.log(and(true, true));   // true
console.log(and(true, false));  // false

// ALU operations
const alu = new ALU(8);
const result = alu.add(42, 15);
// { result: 57, carry: false, overflow: false, zero: false }

// Conversions
BinaryConverter.decToBin(42);           // "00101010"
BinaryConverter.toIEEE754(3.14);        // { sign: 0, exponent: "10000000", mantissa: "10010001111010..." }
BinaryConverter.toTwosComplement(-5, 8); // "11111011"
```

**Capabilities:** All standard logic gates with truth tables. 8/16-bit ALU with all operations (ADD, SUB, AND, OR, XOR, NOT, SHL, SHR). Binary/hex/decimal conversion. IEEE 754 float representation. Two's complement.

**Use cases:**
- Digital logic course assignments (verify gate combinations)
- CPU simulator building blocks
- Binary arithmetic visualization
- AI agents testing circuit designs

## Architecture: Demo → SDK → API → MCP

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Free Tier)                                     │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │ Demo UI  │───▶│ SDK      │───▶│ AI Agent (local) │   │
│  │ (HTML)   │    │ (ES mod) │    │ via MCP tools    │   │
│  └──────────┘    └──────────┘    └──────────────────┘   │
│                       │                                  │
│                       ▼                                  │
│              npm install / CDN                           │
│              embed in any app                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Server (Pro Tier — $9/mo)                               │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │ REST API │───▶│ SDK      │───▶│ AI Agent (cloud) │   │
│  │ /v1/sim  │    │ (Workers)│    │ via MCP tools    │   │
│  └──────────┘    └──────────┘    └──────────────────┘   │
│                       │                                  │
│                       ▼                                  │
│       Higher limits: 30+ qubits, GPU training,           │
│       real hardware, persistent state                    │
└─────────────────────────────────────────────────────────┘
```

## Embedding Components

Every SDK can be used as a web component:

```html
<!-- Embed a quantum circuit in any page -->
<script type="module">
  import { QuantumCircuit } from 'https://cdn.freequantumstore.online/sdk/circuit.js';

  const qc = new QuantumCircuit(2);
  qc.h(0).cx(0, 1);

  document.getElementById('result').textContent =
    JSON.stringify(qc.sample(100));
</script>
```

## MCP Tools (AI Agent Integration)

Each store's MCP server exposes simulation engines as callable tools:

```
quantum_circuit(gates, qubits)      → state_vector, probabilities
molecule_analyze(smiles)            → properties, drug_score
orbit_calculate(altitude, target)   → delta_v, transfer_time
logic_simulate(gate_type, inputs)   → output, truth_table
```

AI agents (Claude, GPT, Gemini) can call these tools to solve problems:

> "What's the delta-v needed to transfer from ISS orbit to geostationary?"
> → Agent calls `orbit_calculate(408, 35786)` → returns `3.94 km/s`

> "Is this molecule drug-like? SMILES: CC(=O)OC1=CC=CC=C1C(=O)O"
> → Agent calls `molecule_analyze(smiles)` → returns Lipinski PASS, MW=180.16

## npm Packages

| Package | Install | Size | Status |
|---------|---------|------|--------|
| `@freequantumstore/sdk` | `npm i @freequantumstore/sdk` | ~15KB | Building |
| `@freebiostore/sdk` | `npm i @freebiostore/sdk` | ~20KB | Building |
| `@freespacestore/sdk` | `npm i @freespacestore/sdk` | ~8KB | Building |
| `@freechipstore/sdk` | `npm i @freechipstore/sdk` | ~10KB | Building |
| `@freerobotstore/sdk` | `npm i @freerobotstore/sdk` | ~12KB | Planned |
