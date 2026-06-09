# FreeRobotStore (FRS)

## Status: LIVE

| Field | Value |
|-------|-------|
| URL | [freerobotstore.online](https://freerobotstore.online) |
| GitHub | [freerobotstore-online/platform](https://github.com/freerobotstore-online/platform) |
| Simulations | 40 |
| Discord | [discord.gg/fttQZKvB](https://discord.gg/fttQZKvB) |
| Accent | `#f97316` (orange) |
| Favicon | FRS |
| Deploy | CF Pages via GitHub Actions (wrangler 3.91.0) |
| Doppler | `frs` project |

## Categories (6)

| Category | Count | Examples |
|----------|-------|----------|
| Composed | 6 | SLAM, path planning comparison, control systems lab, sensor fusion, robot olympics, nav pipeline |
| Motion | 5 | Drone sim, spider robot, snake robot, car physics, walker |
| Sensing | 5 | LiDAR scan, depth camera, object detector, pose tracker, kalman filter |
| Learning | 4 | RL walker 3D, RL walker, neural network, reinforcement learning (Q-learning) |
| Physics | 3 | Fluid sim, spring-mass, pendulum |
| Planning | 2 | Maze solver, multi-robot task allocation |

## Key Simulations

- **SLAM Simulator** — LiDAR + particle filter + occupancy grid mapping
- **3D RL Walker** — 20 creatures evolving walking gaits via neuroevolution (Three.js)
- **Drone Simulator** — 3D quadcopter with landscape, ring course, first-person camera
- **Control Systems Lab** — PID, LQR, MPC, Bang-Bang compared on same plant
- **Path Planning Comparison** — A*, Dijkstra, BFS, DFS, RRT side-by-side

## Infrastructure

- Custom domain: `freerobotstore.online` (CF DNS)
- CF Pages project: `freerobotstore`
- D1 database: `frs`
- R2 bucket: `frs-robots`
- Secrets: Doppler `frs` project, synced via manual `gh secret set`

## Contribution

- CONTRIBUTING.md with design rules
- Template at `store/items/_template/`
- Community section on all pages
- Discord channel: #robotics
