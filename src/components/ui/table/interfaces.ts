export type ColumnConfig<T> = {
  id: string
  header: string
  format?: (value: T) => React.JSX.Element | string
}
