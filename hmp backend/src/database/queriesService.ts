const getProducts = (take: number | null = null, skip: number = 0): string => {
  if (take === null && !skip) {
    return `with NumberedRowsTab as (select *, ROW_NUMBER() OVER (ORDER BY name ASC) as RowIndex from products)
select name, price, RowIndex from NumberedRowsTab where RowIndex > ${skip}`
  }

  return 'select * from products'
}
