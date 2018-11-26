import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "../components/Pagination";
import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    #ii recomandat ca var in care o sa fie rezultatul query-ului sa aiba acelasi nume ca query-ul, da nu ii necesar
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      imageLarge
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props =>
    props.theme.maxWidth}; /*theme e facuta in Page.js si trimisa si aici */
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_ITEMS_QUERY}
          // fetchPolicy="network-only" sa se faca update in timp real, sa nu se foloseasca cache-ul
          variables={{
            skip: this.props.page * perPage - perPage
            // first: perPage nu trebuie neaparat
          }}
        >
          {({ data, error, loading }) => {
            //vine un ob, sa zicem payload, cu mai multe date, asa facem un destructuring sa luam ce vrem din el, la noi in loc de (payload) => am facut ({data, error, loading}) o sa ramanem cu payload.data, payload.error si payload.loading de ex.
            if (loading) return <p>se incarca...</p>;
            if (error) return <p>Eroare: {error.message}</p>;
            return (
              <ItemList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY }; //sa o putem folosi si in DeleteItems
