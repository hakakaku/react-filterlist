import { useState, useEffect } from "react";

// fix the issue with IME composition like Chinese Pinyin or Japanese IME
function useDataComposition() {
  // initiate fixed input data
  const [data, setData] = useState("");

  // initiate IME status
  const [isCompositing, setIsCompositing] = useState(false);

  // initiate real-time input
  const [currentData, setCurrentData] = useState("");

  // handle real-time input change
  function handleChange(e) {
    setCurrentData(e.target.value);
  }

  // update IME status
  function handleComposition({ type }) {
    if (type === "compositionstart") {
      setIsCompositing(true);
    }
    if (type === "compositionend") {
      setIsCompositing(false);
    }
  }

  // get IME status and update fixed input data
  useEffect(() => {
    if (!isCompositing) setData(currentData);
  }, [isCompositing, currentData]);

  return { data, handleChange, handleComposition };
}

export default useDataComposition;
