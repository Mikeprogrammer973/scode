{
  "name": "scode-monorepo",
  "private": true,
  "version": "0.0.0",
  "workspaces": [
    "web",
    "npm"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace=web",
    "dev:core": "npm run dev --workspace=@zyther/scode-core",
    "build:core": "npm run build --workspace=@zyther/scode-core",
    "test:core": "npm run test --workspace=@zyther/scode-core"
  }
}