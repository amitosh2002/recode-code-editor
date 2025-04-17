import "./customLoader.scss";

const CustomLoader = () => {
  const text = ["<", "re", "/", "code", ">"];

  return (
    <div className="loader-container">
      <div className="loader-text">
        {text.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomLoader;
