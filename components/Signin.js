import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Erorr from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    password: "",
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={
          this.state //pt ca in state numa name email si password sunt
        }
        refetchQueries={[{ query: CURRENT_USER_QUERY, variables: {} }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                signin().then(res => console.log(res));
                this.setState({
                  password: "",
                  email: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                {/* <Error error={error} /> */}
                <h2>Logare User</h2>
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
                <button type="submit">Logare</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
