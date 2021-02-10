import { styled } from "@material-ui/core";

type ButtonWrapperProps = {
	correct: boolean;
	userClicked: boolean;
}

const Wrapper = styled("div")({
	maxWidth: "1100px",
  background: "#ebfeff",
  borderRadius: "10px",
  border: "2px solid #0085a3",
  padding: "20px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
  "& > p": { fontSize: "1rem" }
})


const ButtonWrapper = styled("div")(({ correct, userClicked }: ButtonWrapperProps) => ({
  transition: "all 0.3s ease",
  ":hover": { opacity: 0.8 },
  "& > button": {
    cursor: "pointer",
    userSelect: "none",
    fontSize: "0.8rem",
    width: "100%",
    height: "40px",
    margin: "5px 0",
    border: "3px solid #ffffff",
    boxShadow: "1px 2px 0px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    color: "#fff",
    textShadow: "0px 1px 0px rgba(0, 0, 0, 0.25)",

		background: correct
        ? 'linear-gradient(90deg, #56FFA4, #59BC86)'
        : !correct && userClicked
        ? 'linear-gradient(90deg, #FF5656, #C16868)'
        : 'linear-gradient(90deg, #56ccff, #6eafb4)'
  }
}));

export {Wrapper, ButtonWrapper}
