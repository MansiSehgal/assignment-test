import { useState, useEffect } from "react";
import BasicTable from "../components/table";
import { useHistory } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const history = useHistory();

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Character Data
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setFilteredData(json.results);
      });
  }, []);

  // Sorted species list (unique)
  const speciesOptions = [...new Set(data.map((c) => c.species))].sort();

  // SEARCH + FILTER Logic
  useEffect(() => {
    let results = [...data];

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      results = results.filter((item) =>
        Object.values(item).some(
          (v) => typeof v === "string" && v.toLowerCase().includes(query)
        )
      );
    }

    // Status filter (case-insensitive)
    if (statusFilter) {
      results = results.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Species filter
    if (speciesFilter) {
      results = results.filter((item) => item.species === speciesFilter);
    }

    setFilteredData(results);
    setPage(1);
  }, [debouncedSearch, statusFilter, speciesFilter, data]);

  // Auto-generate table columns
  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => ({
          key,
          label: key.replace(/_/g, " ").toUpperCase(),
        }))
      : [];

  return (
    <div>
      <h1>Characters</h1>

      <b>Filter characters (status + species):</b>

      <div style={{ display: "flex", gap: "20px", margin: "10px 0" }}>
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Species Filter */}
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">All Species</option>
          {speciesOptions.map((species, idx) => (
            <option key={idx} value={species}>
              {species}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          placeholder="Search characters..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <BasicTable
        data={filteredData}
        columns={columns}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onRowClick={(row) => history.push(`/characters/${row.id}`)}
      />
    </div>
  );
};

export default Characters;
