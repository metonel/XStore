import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    console.log("in item", item);
    return (
      <ItemStyles>
        {item.image ? <img src={item.image} alt={item.title} /> : null}
        <Title>
          <Link
            href={{
              //double {{}} pt ca transmitem un obiect, facem si un query nu o sa fie doar link simplu
              pathname: "/item",
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: item.id }
            }}
          >
            <a>editeaza</a>
          </Link>
          <button>adauga in cos</button>
          <DeleteItem id={item.id}>sterge produs</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}
