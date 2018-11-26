import { Query } from "react-apollo";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

// const Permissions = props => (
//   <Query query={ALL_USERS_QUERY}>
//     {({ data, loading, error }) => {
//       <div>
//         <DisplayError error={error} />
//         <p>hello.</p>
//       </div>;
//     }}
//   </Query>
// );

import React, { Component } from "react";

class Permissions extends Component {
  render() {
    return <div />;
  }
}

export default Permissions;
