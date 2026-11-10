export type Cell = string | number | null;
export type DataRow = Record<string, Cell>;

export type ColumnInfo = {
  name: string;
  kind: 'numeric' | 'text' | 'empty' | 'mixed';
  missing: number;
  invalid: number;
  min?: number;
  max?: number;
  mean?: number;
};

export type ParsedDataset = {
  columns: string[];
  rows: DataRow[];
  columnsInfo: ColumnInfo[];
  warnings: string[];
  sourceLabel: string;
};

function parseCell(value: string): Cell {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const numeric = Number(trimmed);
  return Number.isFinite(numeric) ? numeric : trimmed;
}

function parseCsvRows(text: string, warnings: string[]) {
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (inQuotes && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (character === ',' && !inQuotes) {
      record.push(field);
      field = '';
      continue;
    }
    if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      record.push(field);
      if (record.some((value) => value.trim().length > 0)) records.push(record);
      record = [];
      field = '';
      continue;
    }
    field += character;
  }

  if (inQuotes) warnings.push('The file contains an unterminated quoted field; the remaining text was retained in that field.');
  if (field.length > 0 || record.length > 0) {
    record.push(field);
    if (record.some((value) => value.trim().length > 0)) records.push(record);
  }
  return records;
}

export function parseCsv(text: string, sourceLabel = 'Uploaded CSV'): ParsedDataset {
  const warnings: string[] = [];
  const records = parseCsvRows(text.replace(/^\uFEFF/, ''), warnings);
  if (records.length === 0) return { columns: [], rows: [], columnsInfo: [], warnings: ['The file is empty.'], sourceLabel };

  const seenHeaders = new Map<string, number>();
  const columns = (records.shift() ?? []).map((name, index) => {
    const base = name.trim() || `column_${index + 1}`;
    const count = seenHeaders.get(base) ?? 0;
    seenHeaders.set(base, count + 1);
    if (count > 0) warnings.push(`Duplicate header "${base}" was renamed to "${base}_${count + 1}".`);
    return count > 0 ? `${base}_${count + 1}` : base;
  });

  const rows = records.slice(0, 10000).map((record) => {
    if (record.length > columns.length) warnings.push('Some rows contain more cells than the header; extra cells were ignored.');
    const row: DataRow = {};
    columns.forEach((column, index) => { row[column] = parseCell(record[index] ?? ''); });
    return row;
  });
  if (records.length > 10000) warnings.push('Only the first 10,000 rows are retained for browser analysis.');
  if (columns.length === 0) warnings.push('No header row was found.');

  const columnsInfo = columns.map((name) => {
    const values = rows.map((row) => row[name]);
    const present = values.filter((value): value is number | string => value !== null);
    const numeric = present.filter((value): value is number => typeof value === 'number');
    const textCount = present.length - numeric.length;
    const kind: ColumnInfo['kind'] = present.length === 0 ? 'empty' : textCount === 0 ? 'numeric' : numeric.length === 0 ? 'text' : 'mixed';
    const info: ColumnInfo = { name, kind, missing: values.length - present.length, invalid: kind === 'mixed' ? textCount : 0 };
    if (kind === 'mixed') warnings.push(`Column "${name}" contains mixed numeric and text values; ${textCount} text cell(s) are excluded from numeric charts.`);
    if (kind === 'numeric') {
      info.min = Math.min(...numeric);
      info.max = Math.max(...numeric);
      info.mean = numeric.reduce((sum, value) => sum + value, 0) / numeric.length;
    }
    return info;
  });

  return { columns, rows, columnsInfo, warnings: Array.from(new Set(warnings)), sourceLabel };
}

export function detectColumn(columns: string[], candidates: string[]): string | undefined {
  const normalized = columns.map((column) => ({ original: column, normalized: column.toLowerCase().replace(/[^a-z0-9]/g, '') }));
  return normalized.find(({ normalized: value }) => candidates.some((candidate) => value.includes(candidate)))?.original;
}

export function toChartRows(rows: DataRow[], xColumn?: string, yColumn?: string) {
  if (!xColumn || !yColumn) return [];
  return rows
    .map((row) => ({ x: row[xColumn], y: row[yColumn] }))
    .filter((row): row is { x: string | number; y: number } => row.x !== null && typeof row.y === 'number');
}

export function csvFromRows(columns: string[], rows: DataRow[]) {
  const escape = (value: Cell) => {
    const text = value === null ? '' : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [columns.map(escape).join(','), ...rows.map((row) => columns.map((column) => escape(row[column])).join(','))].join('\n');
}
