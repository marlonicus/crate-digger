import spotify from "../utils/spotify";

const LoginTemplate = () => (
  <main>
    <style jsx>{`
      main {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        background: white;
      }

      button {
        border: none;
        outline: none;
        background: none;
        color: #333;
        font-size: 4em;
        cursor: pointer;
      }

      button:hover {
        color: grey;
      }
    `}</style>

    <button onClick={spotify.login}>dig</button>
  </main>
);

export default LoginTemplate;
