// import React from "react";
import Link from "next/link";
import Items from "../components/Items";

// class Home extends React.Component {
//   render() {
//     return <div>hey@</div>;
//   }
// }
//sau cu next:

const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
    {/*daca e in home nu are pagina si va transmite NaN*/}
    {/*de aici trimitem in items si in items trimitem im pagination*/}
  </div>
);

export default Home;
