const bgColor = "red";
const clr = "#fff";

const App = () => {
  return (
    <>
      <h1
        className="hello"
        style={{
          backgroundColor: bgColor,
          color: clr,
        }}
      >
        Hello World
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, accusamus?
      </p>
      <input type="text" />
    </>
  );
};

export default App;
