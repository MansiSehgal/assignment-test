import { useState, useEffect } from "react";
import BasicTable from "../components/table";
import { useHistory } from "react-router-dom";

const Episodes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const pageSize = 20;
  const history = useHistory();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Episode data
  useEffect(() => {
    setLoading(true);

    fetch("https://rickandmortyapi.com/api/episode", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        const mapped = json.results.map((item) => ({
          ...item,
          id: item.id, // Episode API does not return URL, ID already exists
        }));

        setData(mapped);
        setFilteredData(mapped);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // Auto-generate table columns
  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => ({
          key,
          label: key.replace(/_/g, " ").toLowerCase(),
        }))
      : [];
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilteredData(data);
      return;
    }

    const query = debouncedSearch.toLowerCase();

    const results = data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(query);
        }
        return false;
      })
    );

    setFilteredData(results);
    setPage(1);
  }, [debouncedSearch, data]);

  return (
    <div>
      <h1>Episodes</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search episodes..."
      />

      <BasicTable
        data={filteredData}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onRowClick={(row) => history.push(`/episodes/${row.id}`)}
      />
    </div>
  );
};

export default Episodes;
