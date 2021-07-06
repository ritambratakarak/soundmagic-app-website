export const Input = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        style={{width: "100%",
    height: 55,
    color: "#051445",
    fontSize: 18,
    padding: 0,
    outline: 0,
    backgroundColor: "transparent",
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomColor:"#ccc",
    borderBottomWidth:1,
  }}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
