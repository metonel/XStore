import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import From from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $imageLarge: String
    $price: Int!
  ) {
    createItem( #asta e din dcheme.graphql din backend
      title: $title
      description: $description
      image: $image
      imageLarge: $imageLarge
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    imageLarge: "",
    price: 0
  };

  handleChange = e => {
    //folosint ES6 asa nu mai trebuie sa folosim constructor pt .bind
    //console.log(e.target.value);
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value; //din form value vine string
    //this.setState({ title: val }); asta ar fi doar pt titlu, dar pt a refolosi handleChange-ul:
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log("uploading file");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "XStore"); //pt cloudinary
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tonelcloud/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      imageLarge: file.eager[0].secure_url
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(
          createItem,
          { loading, error, called, data } //functia child ia ca parametri o mutationfunction si payload. pe langa loadng si error mai are si payload.called ce ii un boolean daca functia a fost apelata sau nu si payload.data, ar fi ce se intoarce
        ) => (
          //am folosit () in loc de {return ... }, ES6 implicit return
          <From
            onSubmit={async e => {
              //nu am folosit o fct gen handleSubmit, pt ca daca scoteam din render nu mai vedea fct createItem, ce e render prop in mutation
              e.preventDefault();
              //aici se apeleaza mutation
              const data = await createItem();
              //
              Router.push({
                pathname: "/item",
                query: { id: data.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              {" "}
              {/*in caz ca a fost dat submit si exista loading, sa nu se poata edita nimic in form. aria-busy e pt style, in styles/form ii css-ul */}
              <label htmlFor="file">
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
              </label>
              <label htmlFor="title">
                Titlu:
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titlu"
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Adauga produs</button>
            </fieldset>
          </From>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
