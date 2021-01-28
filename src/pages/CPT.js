import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const queryGQL = gql`
  query CPTList(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    photos(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          date
        }
      }
    }
  }
`;

export default function CPT() {
  const variables = {
    first: 3,
    last: null,
    after: null,
    before: null
  };
  const { loading, error, data, fetchMore } = useQuery(queryGQL, {
    variables,
    notifyOnNetworkStatusChange: true
  });
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    return fetchMoreResult.photos.edges.length ? fetchMoreResult : previousResult;
  };
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Loading...</div>;
  return (
    <React.Fragment>
      {
        (data.photos.edges.length > 0)
          ?
          <React.Fragment>
            <ul className="example">
              {
                data.photos.edges.map((item, index) => (
                  <li key={index}>
                    <h3>{item.node.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
                    {
                      (item.node.featuredImage)
                        ?
                        <figure>
                          <img src={item.node.featuredImage.node.mediaItemUrl} alt={item.node.title} />
                        </figure>
                        :
                        null
                    }
                    <div><small>{item.node.date}</small></div>
                  </li>
                ))
              }
            </ul>
            <div className="navi">
              {
                data.photos.pageInfo.hasPreviousPage
                  ?
                  <button
                    onClick={() => fetchMore(
                      {
                        variables: {
                          first: null,
                          after: null,
                          last: 3,
                          before: data.photos.pageInfo.startCursor || null
                        },
                        updateQuery
                      }
                    )}
                  >
                    이전
                  </button>
                  :
                  null
              }
              {
                data.photos.pageInfo.hasNextPage
                  ?
                  <button
                    onClick={() => fetchMore(
                      {
                        variables: {
                          first: 3,
                          after: data.photos.pageInfo.endCursor || null,
                          last: null,
                          before: null
                        },
                        updateQuery
                      }
                    )}
                  >
                    다음
                  </button>
                  :
                  null
              }
            </div>
          </React.Fragment>
          :
          <div>게시글이 없습니다.</div>
      }
    </React.Fragment>
  );
}