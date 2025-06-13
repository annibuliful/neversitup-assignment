# Neversitup Assignment - Project Folder Structure

## Folder Structure

```
neversitup-assignment/
├── .github/                    # GitHub workflows and templates
├── .nx/                       # Nx cache and configuration
├── .vscode/                   # VSCode workspace settings
├── apps/                      # Application projects
│   ├── [app-name]/           # Individual applications
│   │   ├── src/
│   │   ├── project.json      # Project configuration
│   │   └── ...
├── libs/                      # Shared libraries
│   ├── [lib-name]/           # Individual libraries
│   │   ├── src/
│   │   ├── project.json      # Library configuration
│   │   └── ...
├── tools/                     # Custom tools and scripts
├── dist/                      # Build output directory
├── node_modules/              # Dependencies
├── .editorconfig             # Editor configuration
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── jest.config.ts           # Jest testing configuration
├── jest.preset.js           # Jest preset
├── nx.json                  # Nx workspace configuration
├── package.json             # Package dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.base.json       # TypeScript base configuration
└── pnpm-lock.yml                # Dependency lock file (or package-lock.json)
```

## Key Files and Directories

### Configuration Files

- **nx.json**: Main Nx workspace configuration file
- **package.json**: Project dependencies, scripts, and metadata
- **tsconfig.base.json**: Base TypeScript configuration shared across projects
- **jest.config.ts**: Testing framework configuration

### Project Structure

- **apps/**: Contains all application projects in the workspace
- **libs/**: Contains shared libraries that can be imported by apps and other libs
- **tools/**: Custom tooling, scripts, and workspace-specific utilities

## Getting Started

**[Frontend Demo https://neversitup-assignment.annibuliful-lab.dev/](https://neversitup-assignment.annibuliful-lab.dev/)**

```bash
# Install dependencies
pnpm install

# Prepare env file for Frontend
cp frontend/.env.sample frontend/.env

# Running Frontend
pnpm run frontend:run:dev

# Running test for Frontend
pnpm run frontend:run:test

# Running test for Golang Backend assignments
pnpm run golang:run:test

# Running test for Typescript Backend assignment
pnpm run typescript:run:test
```

## Message from me

Honestly I forgot about permutation(Heap algorithm) which had been used to solve "manipulate" question so I followed [permutation-string](https://www.geeksforgeeks.org/print-all-permutations-of-a-string-with-duplicates-allowed-in-input-string/) and [heaps algorithms](https://www.geeksforgeeks.org/dsa/heaps-algorithm-for-generating-permutations/) to solve it

I don't have much time to implement Bonus point for Frontend assignements which is about transforming 2 dimensional array to freindly JSON format, but you can check the utils function with Typescript types safe [HERE](https://github.com/annibuliful/neversitup-assignment/blob/main/frontend/src/utils/table.ts)
