# microservices-orchestration

Imagine we have a distributed system where several tasks need to be processed by different microservices. Each task goes through several steps. The challenge is to create a Task Orchestrator that:

1. Receives a task (via REST API).
2. Orchestrates its execution in other services (just a `console.log` for simplicity).

The objective of this project was to practice clean architecture.

## Usage

To install dependencies: `npm install`

To run tests: `npm run test`

To run server: `npm run dev`

To create a task:

```bash
curl -X POST http://localhost:8000/tasks \
-H "Content-Type: application/json" \
-d '{
  "steps": ["step-1", "step-2", "step-3"]
}'
```

To process the next step of a task:

```bash
curl -X POST http://localhost:8000/tasks/:taskId/process \
-H "Content-Type: application/json"
```
