import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const queryGQL = gql`
  query {
    page(id: 2, idType: DATABASE_ID) {
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      date
    }
  }
`;

export default function Post() {
  const { loading, error, data } = useQuery(queryGQL);
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Loading...</div>;
  return (
    <React.Fragment>
      <ul className="example">
        <li>
          <h3>{data.page.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.page.content }} />
          {
            (data.page.featuredImage)
              ?
              <figure>
                <img src={data.page.featuredImage.node.mediaItemUrl} alt={data.page.title} />
              </figure>
              :
              null
          }
          <div><small>{data.page.date}</small></div>
        </li>
      </ul>
    </React.Fragment>
  );
}