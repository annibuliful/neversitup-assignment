import { getColumnName, transformTableDataToJson, columns } from './table'; // adjust path if needed

import { columnDefinitions, ColumnKey, RowData } from '../@types/table';

describe('Table utils functions', () => {
  describe('getColumnName', () => {
    it('returns correct column name from ColumnKey', () => {
      const keys: ColumnKey[] = ['id', 'no', 'title', 'desc', 'date'];
      keys.forEach((key) => {
        expect(getColumnName(key)).toBe(columnDefinitions[key]);
      });
    });

    it('has exact type based on key', () => {
      const titleName = getColumnName('title');
      expect(typeof titleName).toBe('string');
    });
  });

  describe('transformTableDataToJson', () => {
    const sampleData: (string | number)[][] = [
      ['abc-123', 1, 'Task 1', 'Desc 1', '2023-10-01'],
      ['def-456', 2, 'Task 2', 'Desc 2', '2023-10-02'],
    ];

    it('transforms raw array data into RowData objects', () => {
      const result = transformTableDataToJson(columns as never, sampleData);
      expect(result).toEqual<RowData[]>([
        {
          id: 'abc-123',
          no: 1,
          title: 'Task 1',
          desc: 'Desc 1',
          date: '2023-10-01',
        },
        {
          id: 'def-456',
          no: 2,
          title: 'Task 2',
          desc: 'Desc 2',
          date: '2023-10-02',
        },
      ]);
    });

    it('returns an empty array when given empty data', () => {
      const result = transformTableDataToJson(columns as never, []);
      expect(result).toEqual([]);
    });

    it('handles mismatched column/data length', () => {
      const incompleteRow = [['only-id']];
      const result = transformTableDataToJson(columns as never, incompleteRow);
      expect(result[0]).toMatchObject({ id: 'only-id' });
    });
  });
});
