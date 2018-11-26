import Link from "next/link";
import Reset from "../components/Reset";

const Sell = props => (
  <div>
    <p>resetare parola {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default Sell;
