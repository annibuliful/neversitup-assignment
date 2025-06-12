import {
  ItemKey,
  columnDefinitions,
  ColumnKey,
  ColumnName,
} from '../@types/table';

export const columns: readonly ItemKey[] = (
  Object.entries(columnDefinitions) as [ColumnKey, ColumnName][]
).map(([key, name]) => ({ key, name })) as readonly ItemKey[];

export function getColumnName<K extends ColumnKey>(
  key: K
): typeof columnDefinitions[K] {
  return columnDefinitions[key];
}
