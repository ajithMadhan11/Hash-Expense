import { useState } from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/RiseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#27b05a");

  return (
    <div className="sweet-loading">
      <RiseLoader color={color} loading={loading} css={override} size={30} />
    </div>
  );
}

export default Loader;
