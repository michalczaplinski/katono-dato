require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `KATONO.CLOTHING`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN
      }
    }
  ]
};
