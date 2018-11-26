import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

import React, { Component } from "react";

class PleaseSignin extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>loading...</p>;
          if (!data.me)
            return (
              <div>
                <p>Trebuie sa fii logat pentru a vinde produse</p>
                <Signin />
              </div>
            );
          return this.props.children;
        }}
      </Query>
    );
  }
}

export default PleaseSignin;
