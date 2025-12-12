import { useState, useEffect } from "react";
import useNavigate from "react-router-dom";
const Episodes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSerach] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const pageSize = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearSetTimeout(handler);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    fetch("https://rickandmortyapi.com/api/episode", {
      header: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((json) => {
        console.log(json);

        const mapped = json.results.map((item) => ({
          ...item,
          id: item.url.split("/").filter(Boolean).pop(),
        }));
        setData(mapped);
        setFilteredData(mapped);
      })
      .catch((error) => console.error(error))
      .finally(setLoading(false));
  }, []);
  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => ({
          key,
          label: key.replace(/_/g, " ").toLowerCase(),
        }))
      : [];

  //  useEffect(()={

  //   if(!debouncedSearch.trim()){
  //     setFilteredData(data)
  //     return
  //   }

  //   const query = debouncedSearch.toLowerCase();

  //   const results= data.filter((item) => {
  //     Object.values(item).some((value) => {
  //       if(typeof value === "string"){
  //         return value.toLowerCase().includes(query)
  //       }
  //       return false;
  //     })
  //   })

  //   setFilteredData(results);

  //   setPage(1)

  // },[debouncedSearch, data]);

  return (
    <div>
      <h1>Episodes</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <BasicTable
        data={filteredData}
        columns={columns}
        pageSize={pageSize}
        onPageChange={onPageChange}
        page={page}
        onRowChange={(row) => navigate(`/episodes/${row.id}  `)}
      />
    </div>
  );
};

export default Episodes;
