import { Table as BootstrapTable } from "react-bootstrap";

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
    <BootstrapTable className={className} responsive hover>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(render)}</tbody>
    </BootstrapTable>
  );
}
