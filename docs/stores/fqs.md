# FreeQuantumStore (FQS)

## Status: LIVE

| Field | Value |
|-------|-------|
| URL | [freequantumstore.pages.dev](https://freequantumstore.pages.dev) |
| GitHub | [freequantumstore-online/platform](https://github.com/freequantumstore-online/platform) |
| Simulations | 25 |
| Discord | [discord.gg/HT8ukjwR](https://discord.gg/HT8ukjwR) |
| Accent | `#7c3aed` (purple) |
| Favicon | FQS |
| Deploy | CF Pages via GitHub Actions |

## Categories (4)

| Category | Count | Examples |
|----------|-------|----------|
| Algorithms | 9 | Grover's, Deutsch-Jozsa, VQE, Simon's, QFT, Bernstein-Vazirani, quantum ML |
| Protocols | 3 | Teleportation, quantum key distribution (BB84), quantum crypto pipeline |
| Error Correction | 2 | Error correction (3-qubit, Shor's 9-qubit) |
| Fundamentals | 11 | Qubit sim, quantum gates, quantum walk, annealing, phase estimation |

## Key Simulations

- **Qubit Simulator** — real state-vector engine, up to 6 qubits, 100-shot sampling, Qiskit export
- **VQE** — variational eigensolver for H2/LiH/HeH+ with energy landscape heatmap
- **Quantum ML** — parameterized circuit learning to classify 2D data
- **Error Correction** — 3-qubit bit-flip + Shor's 9-qubit with syndrome measurement
- **Quantum Annealing** — classical vs quantum optimization side-by-side

## SDK (source, not published)

`@freequantumstore/sdk` — QuantumCircuit class with h/x/y/z/s/t/rx/ry/rz/cx/cz/swap/ccx gates, measure, sample, toQiskit, toCirq export.
