require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `CDHREC`,
    description: `Welcome to Custom Dragon Highlander, a community dedicated to designing only the finest custom commanders!`,
    
    author: `Adrian Davila-Zuniga`,
  },
  plugins: [
    `gatsby-plugin-flow`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src',
        aliases: {
          components: './components',
          containers: './containers',
          images: './images',
          state: './state',
          styles: './styles',
          utils: './utils',
          static: {
            root: './public',
            alias: './static',
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter`,
        short_name: `Gatsby Starter`,
        start_url: `/`,
        background_color: `black`,
        theme_color: `black`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/store',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
    
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `http://localhost:10003/graphql`
      },
    },
    // {
    //   resolve: `gatsby-source-wordpress`,
    //   options: {
    //     /*
    //      * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
    //      * Example : 'dev-gatbsyjswp.pantheonsite.io' or 'www.example-site.com'
    //      */
    //     baseUrl: `localhost:10003/graphql`,
    //     protocol: `http`,
    //     hostingWPCOM: false,
    //     useACF: true,
    //   },
    // },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENV,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Cardo'],
        },
      },
    },
  ],
};
