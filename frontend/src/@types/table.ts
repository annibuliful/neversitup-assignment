export const columnDefinitions = {
  id: '',
  no: 'No.',
  title: 'Title',
  desc: 'Description',
  date: 'Created Date',
} as const;

export type ColumnKey = keyof typeof columnDefinitions;
export type ColumnName = typeof columnDefinitions[ColumnKey];

export type ItemKey<K extends ColumnKey = ColumnKey> = {
  key: K;
  name: typeof columnDefinitions[K];
};

export type ItemData = {
  id: string;
  no: number;
};

export type RowData = {
  [K in ColumnKey]: K extends 'no' ? number : string;
};
