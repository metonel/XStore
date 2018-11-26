import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>;
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      return (
        <PaginationStyles>
          <Head>
            <title>XStore Pagina {props.page}</title>
          </Head>
          <Link
            prefetch //pt a randa pagina inainte sa fie accesata
            href={{
              pathname: "items",
              query: { page: props.page - 1 }
            }}
          >
            <a className="prev" aria-disabled={props.page <= 1}>
              Inapoi
            </a>
          </Link>
          <p>
            pagina {props.page} din {pages}
          </p>
          <p>{count} Produse in total</p>
          <Link
            prefetch //pt a randa pagina inainte sa fie accesata
            href={{
              pathname: "items",
              query: { page: props.page + 1 }
            }}
          >
            <a className="prev" aria-disabled={props.page >= pages}>
              Inainte
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
