import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DynamicDetailsPage = () => {
  const { category, id } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/${category}/${id}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category, id]);

  if (loading) return <h2>Loading...</h2>;
  if (!data) return <p>No details found</p>;

  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return <span>None</span>;
      return (
        <ul>
          {value.map((item) => (
            <li key={item}>
              {isURL(item) ? (
                <a href={item} target="_blank" rel="noreferrer">
                  {item}
                </a>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "string" && isURL(value)) {
      return (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      );
    }

    return <span>{String(value)}</span>;
  };

  const isURL = (str) => typeof str === "string" && str.startsWith("http");

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <button
        onClick={() => history.goBack()}
        style={{
          marginBottom: 20,
          padding: "8px 12px",
          background: "#eee",
          border: "1px solid #ccc",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>{data.name || data.title || "Details"}</h1>

        {Object.entries(data).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 15 }}>
            <strong>{formatKey(key)}:</strong>
            <div>{renderValue(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicDetailsPage;
