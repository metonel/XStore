import Link from "next/link";
import UpdateItem from "../components/UpdateItem";

const Sell = (
  props //nu redenumim componenta ca sa avem acces la query-ul transmis catre sell si aici
) => (
  <div>
    {" "}
    {/*in _app.js am expus prin props cu pageProps.query = ctx.query si o sa avem acces si aici*/}
    <UpdateItem id={props.query.id} />
  </div>
);

export default Sell;
