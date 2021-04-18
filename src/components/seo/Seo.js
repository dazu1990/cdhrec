import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from './useSiteMetadata';
import avatarIcon from 'images/logo.svg';


// type Props = {
//   description?: String,
//   lang?: String,
//   meta: [],
//   title: String,
// };

function SEO({ description, lang, meta, title }) {
  const siteMetadata = useSiteMetadata();

  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `keywords`,
          content: `Custom;Commander;EDH;CDH;MTG;Magic The Gathering;Alter;`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:image",
          content: "http://api.cdhrec.com/wp-content/uploads/2021/01/ogLogo.png",
        }
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default SEO;
