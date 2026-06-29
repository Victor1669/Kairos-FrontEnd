type PropType<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
  columns: string[];
  className?: string;
};

export default function Table<T>({
  className,
  data,
  render,
  columns,
}: PropType<T>) {
  return (
    <table cellSpacing={10} className={className}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(render)}</tbody>
    </table>
  );
}
