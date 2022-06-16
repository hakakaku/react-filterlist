import { useState, useEffect } from "react";

function useListFilter(data, unicode, datalist) {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // GET data from server

    // use RegExp of input data to filter datalist
    const reg = new RegExp(`^${data}${unicode}*`, "i");
    const filter = datalist.filter((d) => reg.test(d));

    // update filtered list
    setFilteredList(filter);
  }, [data, unicode, datalist]);

  return data ? filteredList : [];
}

export default useListFilter;
