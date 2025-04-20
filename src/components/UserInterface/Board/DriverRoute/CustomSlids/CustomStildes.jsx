export const CustomPrev = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      left: "10px",
      zIndex: 3,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "24px",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    ◀
  </div>
);

export const CustomNext = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      right: "10px",
      zIndex: 3,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "24px",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    ▶
  </div>
);
