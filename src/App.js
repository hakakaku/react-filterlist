import "./styles.css";
import Joi from "joi";
import { useMemo } from "react";
import useListFilter from "./components/useListFilter";
import useDataValidate from "./components/useDataValidate";
import useDataComposition from "./components/useDataComposition";

export default function App() {
  // define test configuration
  const testConfig = useMemo(() => {
    return {
      unicode: `([a-z]|[A-Z])`,
      errorList: {
        pattern: "latin characters only",
        min: "min characters: 3",
        max: "max characters: 8",
        empty: "Let's Search!"
      },
      datalist: [
        "Adele",
        "Agnes",
        "Billy",
        "Bob",
        "Calvin",
        "Christina",
        "Cindy"
      ]
    };
  }, []);

  // Define validation schema for joi.
  const joiSchema = {
    data: Joi.string()
      .regex(RegExp(`^${testConfig.unicode}+$`))
      .min(3)
      .max(8)
      .required()
  };

  const { data, handleChange, handleComposition } = useDataComposition();

  // use input data to filter datalist
  const filteredList = useListFilter(
    data,
    testConfig.unicode,
    testConfig.datalist
  );

  // validate input data with Joi
  const error = useDataValidate(data, joiSchema, testConfig.errorList);

  return (
    <div className="App">
      <h1>Search Box</h1>
      <p className="ta-left wrapper -thin">{`Current Input: ${data}`}</p>
      <form>
        <label className="field">
          <input
            type="text"
            onChange={handleChange}
            onCompositionStart={handleComposition}
            onCompositionUpdate={handleComposition}
            onCompositionEnd={handleComposition}
          />
          <span className="label">{error}</span>
        </label>
        {
          <ul>
            {filteredList.map((item, key) => (
              <li key={key}>
                <a href="/">{item}</a>
              </li>
            ))}
          </ul>
        }
      </form>
    </div>
  );
}
