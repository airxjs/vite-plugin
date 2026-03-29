# Project Architecture

## Mission and Scope

**Mission**: `vite-plugin-airx` is a thin Vite plugin that integrates `airx` JSX transformation into the Vite build pipeline. It configures esbuild's JSX handling so that `.tsx`/`.jsx` files are compiled using airx's JSX runtime.

**Scope**:
- Configuring esbuild JSX transformation options
- Supporting `automatic` JSX runtime mode (default, recommended)
- Supporting `classic` createElement mode (for backwards compatibility)
- Allowing custom `importSource` for the automatic runtime

**Out of Scope**:
- Custom JSX transform implementations (delegates to esbuild)
- Hot module replacement (HMR) hooks
- Dev server middleware
- Type checking or type generation

---

## System Boundaries

### Inputs

| Input | Source | Description |
|-------|--------|-------------|
| `AirxPluginOptions` | Developer | `{ runtime?: 'automatic'|'classic', importSource?: string }` |
| Vite config | Developer | Vite configuration object |
| Existing esbuild config | Vite internal | Pre-existing esbuild settings to merge with |

### Outputs

| Output | Destination | Description |
|--------|-------------|-------------|
| Modified Vite config | Vite | Config with updated esbuild options for JSX |
| Bundled JSX | esbuild → Vite | Transformed `.tsx`/`.jsx` files |

### External Integrations

| Integration | Role |
|-------------|------|
| `vite` | Build tool; calls plugin's `config()` hook during resolution |
| `esbuild` | JSX transformer; receives the configured options from this plugin |
| `airx` | JSX runtime library; provides `createElement`, `Fragment`, and `jsx-runtime` |

---

## Modules and Responsibilities

### `source/index.ts` — Plugin Implementation (~65 lines)

Single module exporting:

**Options Type** (`AirxPluginOptions`):
- `runtime?: 'automatic' | 'classic'` — JSX runtime mode
- `importSource?: string` — Import source for automatic mode (default: `'airx'`)

**Plugin Factory** (`VitePluginAirx(options?)`):
- Returns a Vite plugin object with:
  - `name: 'airx'` — Plugin identifier
  - `enforce: 'pre'` — Runs before default plugins
  - `config(config)` — Merges esbuild JSX options into vite config

**Runtime Modes**:

| Mode | esbuild `jsx` | esbuild `jsxImportSource` | esbuild `jsxFactory/Fragment` | esbuild `jsxInject` |
|------|---------------|--------------------------|------------------------------|---------------------|
| `automatic` (default) | `'automatic'` | `importSource` (default `'airx'`) | — | — |
| `classic` | `'transform'` | — | `__airx__.createElement` / `__airx__.Fragment` | `import * as __airx__ from 'airx'` |

### `examples/minimal/` — Minimal Usage Example

Demonstrates the simplest setup:
```typescript
// vite.config.ts
import airx from 'vite-plugin-airx'
export default { plugins: [airx()] }
```

---

## Key Flows

### Plugin Integration Flow

```
1. Developer adds airx() to plugins array in vite.config.ts
   ↓
2. Vite resolves plugins, calls airx plugin's config() hook
   ↓
3. config() merges developer's esbuild options with airx JSX settings
   ├── automatic mode: jsx: 'automatic', jsxImportSource: 'airx'
   └── classic mode: jsx: 'transform', jsxFactory: '__airx__.createElement', ...
   ↓
4. Vite passes merged config to esbuild
   ↓
5. esbuild transforms .tsx/.jsx files using airx JSX runtime
```

### `enforce: 'pre'` Rationale

`enforce: 'pre'` ensures this plugin's esbuild config is applied **before** other plugins that might set conflicting esbuild options. Without it, another `enforce: 'post'` plugin could override the JSX settings.

---

## Change Triggers

Update this document when any of the following occur:

1. **esbuild JSX API changes** — Plugin's esbuild option merging would need updating
2. **airx JSX runtime changes** — Import source or API changes
3. **New runtime mode added** — e.g., `jsx-runtime` dev mode
4. **Plugin hooks added** — e.g., adding `transform` or `handleHotUpdate` hooks
5. **Breaking change to Vite config API** — Plugin's `config()` hook signature changes
