var getProducts = function (take, skip) {
    if (take === void 0) { take = null; }
    if (skip === void 0) { skip = 0; }
    if (take === null && !skip) {
        return "with NumberedRowsTab as (select *, ROW_NUMBER() OVER (ORDER BY name ASC) as RowIndex from products)\nselect name, price, RowIndex from NumberedRowsTab where RowIndex > ".concat(skip);
    }
    return 'select * from products';
};
export {};
//# sourceMappingURL=queriesService.js.map