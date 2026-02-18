import type { ComputedRef, Ref, ShallowRef } from 'vue';

export interface RowSelection<T extends string | number> {
    /**
     * The underlying Set of row IDs.
     * - When `allRowsSelected` is `false`: inclusion list (selected IDs)
     * - When `allRowsSelected` is `true`: exclusion list (deselected IDs)
     */
    selectedRows: ShallowRef<Set<T>>;

    /** Total number of currently selected rows. Accounts for both normal and "select all" modes. */
    selectedRowCount: ComputedRef<number>;

    /** Whether global "Select All" is active. When `true`, `selectedRows` acts as an exclusion list. */
    allRowsSelected: Ref<boolean>;

    /**
     * State of the master/header checkbox.
     * - `true` — all rows selected
     * - `false` — no rows selected
     * - `'indeterminate'` — some rows selected
     */
    topSelectorState: ComputedRef<boolean | 'indeterminate'>;

    /** `true` when `topSelectorState` is `'indeterminate'`. Useful for driving a checkbox's `indeterminate` DOM property. */
    isPartiallyChecked: ComputedRef<boolean>;

    /** Returns whether a given row ID is currently selected. Handles both inclusion and exclusion modes. */
    isRowSelected: (value: T) => boolean;

    /** Toggles global "Select All" on or off. Resets `selectedRows` to an empty Set. */
    toggleAllRows: () => void;

    /** Toggles the selection state of a single row. */
    toggleRowState: (value: T) => void;

    /** Selects or deselects all rows on the current page. */
    togglePageRows: () => void;

    /** Clears all selection state and exits "Select All" mode if active. */
    deSelectAllRows: () => void;
}
