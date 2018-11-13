import React from "react";

const Loader = () => (
  <p>
    <style jsx>
      {`
        p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    </style>
    Loading
  </p>
);

export default Loader;
