import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DynamicDetailsPage = () => {
  const { category, id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/${category}/${id}`, {
      header: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [category, id]);

  const formatKey = (key) => {
    return key.replace(/_/g, " ").replace(/^\w/, (m) => m.toUpperCase());
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span> None</span>;
      }

      return (
        <ul>
          {value.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <div>
        <h1>{data.title}</h1>

        {Object.entries(data).map(([key, value]) => {
          return (
            <div>
              <strong>{formatKey(key)}</strong>
              <div>{renderValue(value)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DynamicDetailsPage;
