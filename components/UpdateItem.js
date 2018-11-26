import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import From from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID! #chiar daca nu se schimba, geaphql il asteapta si da eroare daca nu il transmitem
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      #asta e din dcheme.graphql din backend
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    //folosint ES6 asa nu mai trebuie sa folosim constructor pt .bind
    //console.log(e.target.value);
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value; //din form value vine string
    //this.setState({ title: val }); asta ar fi doar pt titlu, dar pt a refolosi handleChange-ul:
    this.setState({ [name]: val });
  };

  handleSubmit = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("updateing item");
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log("updated");
  };

  //   uploadFile = async e => {
  //     console.log("uploading file");
  //     const files = e.target.files;
  //     const data = new FormData();
  //     data.append("file", files[0]);
  //     data.append("upload_preset", "XStore"); //pt cloudinary
  //     const res = await fetch(
  //       "https://api.cloudinary.com/v1_1/tonelcloud/image/upload",
  //       {
  //         method: "POST",
  //         body: data
  //       }
  //     );
  //     const file = await res.json();
  //     console.log(file);
  //     this.setState({
  //       image: file.secure_url,
  //       imageLarge: file.eager[0].secure_url
  //     });
  //   };
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>produs inexistent</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(
                updateItem,
                { loading, error } //functia child ia ca parametri o mutationfunction si payload. pe langa loadng si error mai are si payload.called ce ii un boolean daca functia a fost apelata sau nu si payload.data, ar fi ce se intoarce
              ) => (
                //am folosit () in loc de {return ... }, ES6 implicit return
                <From onSubmit={e => this.handleSubmit(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    {" "}
                    {/*in caz ca a fost dat submit si exista loading, sa nu se poata edita nimic in form. aria-busy e pt style, in styles/form ii css-ul */}
                    {/* <label htmlFor="file">
                Imagine:
                <input
                type="file"
                id="file"
                name="file"
                placeholder="Adauga o imagine"
                required
                onChange={this.uploadFile}
                />
                {this.state.image && (
                    <img
                    width="200"
                    src={this.state.image}
                    alt="Upload preview"
                    />
                    )}
                </label> */}
                    <label htmlFor="title">
                      Titlu:
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Titlu"
                        required
                        defaultValue={data.item.title} //defaultValue updateaza valoarea din state doar cand valoare din form se schimba
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Pret:
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Pret"
                        required
                        defaultValue={data.item.price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Descriere:
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Adauga o scurta descriere"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Salv{loading ? "are in curs..." : "eaza modificari"}
                    </button>
                  </fieldset>
                </From>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
