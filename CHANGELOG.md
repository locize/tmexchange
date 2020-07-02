### 2.0.4

- transpile also esm

### 2.0.3

- remove \f before converting to tmx

### 2.0.2

- fix export for node v14 cjs

### 2.0.1

- fix export for dynamic imports

### 2.0.0

- complete refactoring to make this module universal
- MIGRATION:
    - `require('tmexchange/tmx2js')` should be replaced with `require('tmexchange/cjs/tmx2js')`
    - `require('tmexchange/js2tmx')` should be replaced with `require('tmexchange/cjs/js2tmx')`
