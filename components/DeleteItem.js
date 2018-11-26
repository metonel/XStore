import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    //updatare manuala a cache-ului sa stergem produsul sters din baza de data. update ii fct de apollo, prin ea avem acces la cache si payload e raspunsul din query-ul prin care am sters produsul. alternativ, se putea si apela query-ul items sa facem un refresh
    //luam produsul din cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    //scoatem produsul sters din cache
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    //punem produsele inapoi in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{
          id: this.props.id
        }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm("sigur doresti sa stergi produsul?")) {
                deleteItem();
              }
              //prin props.children vine textul butonului din item.js
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
