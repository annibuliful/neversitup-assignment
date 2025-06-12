import {
  ItemKey,
  columnDefinitions,
  ColumnKey,
  ColumnName,
  RowData,
} from '../@types/table';

export const columns: readonly ItemKey[] = (
  Object.entries(columnDefinitions) as [ColumnKey, ColumnName][]
).map(([key, name]) => ({ key, name })) as readonly ItemKey[];

export function getColumnName<K extends ColumnKey>(
  key: K
): typeof columnDefinitions[K] {
  return columnDefinitions[key];
}

export function transformTableDataToJson(
  columns: { key: ColumnKey; name: string }[],
  data: (string | number)[][]
): RowData[] {
  return data.map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = {} as any;
    columns.forEach((col, index) => {
      obj[col.key] = row[index];
    });
    return obj;
  });
}
