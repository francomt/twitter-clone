import React, { useEffect, useState } from "react";
import history from "../history";

const SearchPage = ({ location }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("q");

    if (!q) return history.push("/explore");

    const t = params.get("type");

    setQuery(q);
    setType(t ? t : "tweet");
  });

  return <div>SEARCHING!</div>;
};

export default SearchPage;
