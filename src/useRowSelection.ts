import { computed, ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { RowSelection } from './types';

export function useRowSelection<T extends string | number>(pageRowIds: MaybeRefOrGetter<T[]>, totalRows: MaybeRefOrGetter<number>): RowSelection<T> {
    const selectedRows = shallowRef(new Set<T>());
    const allRowsSelected = ref(false);

    const isRowSelected = (value: T) => {
        return allRowsSelected.value ? !selectedRows.value.has(value) : selectedRows.value.has(value);
    };

    const selectedRowCount = computed(() => {
        const total = toValue(totalRows);
        return allRowsSelected.value ? Math.max(0, total - selectedRows.value.size) : selectedRows.value.size;
    });

    const isPageFullySelected = computed(() => {
        const ids = toValue(pageRowIds);
        return ids.length > 0 && ids.every(id => isRowSelected(id));
    });

    const topSelectorState = computed(() => {
        const count = selectedRowCount.value;
        const total = toValue(totalRows);

        if (count === 0 || total === 0) {
            return false;
        }

        if (count >= total) {
            return true;
        }

        return 'indeterminate' as const;
    });

    const isPartiallyChecked = computed(() => topSelectorState.value === 'indeterminate');

    const toggleRowState = (value: T) => {
        const next = new Set(selectedRows.value);
        next.has(value) ? next.delete(value) : next.add(value);
        selectedRows.value = next;
    };

    const toggleAllRows = () => {
        allRowsSelected.value = !allRowsSelected.value;
        selectedRows.value = new Set();
    };

    const togglePageRows = () => {
        const ids = toValue(pageRowIds);
        const next = new Set(selectedRows.value);
        if (isPageFullySelected.value) {
            ids.forEach(id => (allRowsSelected.value ? next.add(id) : next.delete(id)));
        } else {
            ids.forEach(id => (allRowsSelected.value ? next.delete(id) : next.add(id)));
        }
        selectedRows.value = next;
    };

    const deSelectAllRows = () => {
        allRowsSelected.value = false;
        selectedRows.value = new Set();
    };

    watch(
        () => toValue(pageRowIds),
        newPageIds => {
            if (allRowsSelected.value || selectedRows.value.size === 0) {
                return;
            }
            const pageSet = new Set(newPageIds);
            const filteredSet = new Set([...selectedRows.value].filter(id => pageSet.has(id)));

            if (filteredSet.size !== selectedRows.value.size) {
                selectedRows.value = filteredSet;
            }
        },
    );

    return {
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
    } as RowSelection<T>;
}
