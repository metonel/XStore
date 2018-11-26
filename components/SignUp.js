import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Erorr from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class SignUp extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={
          this.state //pt ca in state numa name email si password sunt
        }
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          }
        ]}
      >
        {(signup, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                signup().then(res => console.log(res));
                this.setState({
                  name: "",
                  password: "",
                  email: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                {/* <Error error={error} /> */}
                <h2>Creare cont nou</h2>
                <label htmlFpr="name">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nume:"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFpr="email">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email:"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFpr="password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Parola:"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Creare cont</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
