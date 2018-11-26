import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Erorr from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={
          this.state //pt ca in state numa email e
        }
      >
        {(requestReset, { error, loading, called }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await requestReset();
                this.setState({
                  email: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                {/* <Error error={error} /> */}
                {!error && !loading && called && (
                  <p>Verifica email-ul pentru link-ul de resetare</p>
                )}
                <h2>Resetare Parola</h2>
                <label htmlFpr="email">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email:"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Resetare</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
