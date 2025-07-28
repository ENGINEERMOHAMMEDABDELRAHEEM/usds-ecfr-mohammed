import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import TableExportButtons from "./TableExportButtons";

function GlobalFilter({ filter, setFilter }) {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="🔍 Search agency..."
      style={{
        marginBottom: "1rem",
        padding: "0.5rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        maxWidth: "400px",
      }}
    />
  );
}

function DataTable({ data, title }) {
  const tableData = useMemo(
    () =>
      Object.entries(data).map(([key, value]) => ({
        agency: key,
        value,
      })),
    [data]
  );

  const columns = useMemo(
    () => [
      { Header: "Agency", accessor: "agency" },
      { Header: "Value", accessor: "value" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable({ columns, data: tableData }, useGlobalFilter, useSortBy);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      <TableExportButtons data={data} filename={title || "table_data"} />

      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ backgroundColor: "#f5f5f5" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "2px solid #ddd",
                    padding: "0.75rem",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ borderBottom: "1px solid #eee" }}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ padding: "0.75rem", textAlign: "left" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
