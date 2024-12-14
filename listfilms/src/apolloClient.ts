import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache(),
});

export const GET_FILMS = gql`
  query GetFilms {
    allFilms {
      films {
        id
        title
        episodeID
        director
        producers
        releaseDate
      }
    }
  }
`;
