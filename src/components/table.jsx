const BasicTable = ({
  columns,
  data,
  page,
  onRowClick,
  pageSize,
  onPageChange,
}) => {
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);

  const pageRows = data.slice((page - 1) * pageSize, page * pageSize);

  const safeValue = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "object") return JSON.stringify(val);
    return val;
  };

  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#eee",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#ccc" }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ padding: 8, borderBottom: "1px solid #bbb" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {pageRows.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                cursor: "pointer",
                backgroundColor: "#fff",
                borderBottom: "1px solid #eee",
              }}
            >
              {columns.map((col, idx) => (
                <td key={idx} style={{ padding: 8 }}>
                  {safeValue(row[col.key])}
                </td>
              ))}
            </tr>
          ))}

          {pageRows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: 16, textAlign: "center" }}
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 10,
        }}
      >
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BasicTable;
