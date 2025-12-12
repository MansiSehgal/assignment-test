import { useState, useEffect } from "react";
import BasicTable from "../components/table";
import { useHistory } from "react-router-dom";

const Locations = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const pageSize = 20;
  const history = useHistory();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setLoading(true);

    fetch("https://rickandmortyapi.com/api/location", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        const mapped = json.results.map((item) => ({
          ...item,
          id: item.id,
        }));

        setData(mapped);
        setFilteredData(mapped);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
      <h1>Locations</h1>

      <input
        type="text"
        value={search}
        placeholder="Search locations..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <BasicTable
        data={filteredData}
        columns={columns}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onRowClick={(row) => history.push(`/locations/${row.id}`)}
      />
    </div>
  );
};

export default Locations;
