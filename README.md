# use-row-selection

A Vue 3 composable for managing table row checkbox selection state with support for individual row selection, per-page selection, and "select all" functionality.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Parameters](#parameters)
    - [Core Features](#core-features)
- [License](#license)

## Installation

```bash
npm install @veebisepad/use-row-selection
```

## Usage

```typescript
import { useRowSelection } from '@veebisepad/use-row-selection';

const {
    selectedRows,
    selectedRowCount,
    allRowsSelected,
    topSelectorState,
    isPartiallyChecked,
    isRowSelected,
    toggleAllRows,
    toggleRowState,
    togglePageRows,
    deSelectAllRows,
} = useRowSelection(pageRowIds, totalRows);
```

### Parameters

- `pageRowIds` - Current page row IDs (ref, getter, or array)
- `totalRows` - Total number of rows (ref, getter, or number)

### Core Features

| Name                 | Kind     | Description                                                   |
| -------------------- | -------- | ------------------------------------------------------------- |
| `selectedRows`       | State    | Set of selected/deselected row IDs                            |
| `selectedRowCount`   | Computed | Count of selected rows                                        |
| `allRowsSelected`    | Computed | Whether "select all" is active                                |
| `topSelectorState`   | Computed | Master checkbox state (`true`, `false`, or `'indeterminate'`) |
| `isPartiallyChecked` | Computed | Whether selection is partial                                  |
| `isRowSelected(id)`  | Function | Check if a row is selected                                    |
| `toggleAllRows()`    | Function | Toggle "select all" mode                                      |
| `toggleRowState(id)` | Function | Toggle individual row selection                               |
| `togglePageRows()`   | Function | Toggle current page selection                                 |
| `deSelectAllRows()`  | Function | Clear all selections                                          |

## License

MIT

---

Made by [Veebisepad](https://github.com/veebisepad) (Ralf Heinsoo)
