const BasicTable = ({
  columns,
  data,
  pageRows,
  onRowClick,
  pageSize,
  onPageChange,
}) => {
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);

  const pageRows = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <table
      className="table"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#eee",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <thead
        style={{
          backgroundColor: "#ccc",
        }}
      >
        <tr>
          {columns.map((val) => {
            return (
              <th style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                {val.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {pageRows.map((row, i) => {
          return (
            <tr
              key={i}
              onClick={onRowClick && onRowClick(row)}
              style={{
                cursor: "pointer",
                backgroundColor: "#fff",
                borderBottom: "1px solid #eee",
              }}
            >
              {columns.map((val, i) => {
                return <td key={i}>{row[val.key]}</td>;
              })}
            </tr>
          );
        })}

        {pageRows.length === 0 && (
          <tr>
            <td colSpan={columns.length}>No data found</td>
          </tr>
        )}
      </tbody>

      <div>
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        <span> {page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </table>
  );
};

export default BasicTable;
