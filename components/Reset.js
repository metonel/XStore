import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Erorr from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import PropTypes from "prop-types";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    confirmPassword: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ mutation: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await resetPassword();
                this.setState({
                  password: "",
                  confirmPassword: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                {/* <Error error={error} /> */}
                <h2>Resetare Parola</h2>
                <label htmlFpr="password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Parola noua:"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFpr="confirmPassword">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma parola:"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Confirma schimbarea parolei</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;
