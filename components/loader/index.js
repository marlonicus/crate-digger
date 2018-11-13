import React from "react";

const Loader = () => (
  <p>
    <style jsx>
      {`
        p {
          position: absolute;
          top: 50%;
          opacity: 0.5;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    </style>
    Gimme a second...
  </p>
);

export default Loader;
