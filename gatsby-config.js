require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `KATONO.CLOTHING`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: "https://c20f66963e9d4dbdbbe43aa59460bfa9@sentry.io/634835",
        version: "3.24.0"
      }
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN
      }
    }
  ]
};
