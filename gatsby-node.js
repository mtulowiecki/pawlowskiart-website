const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const locales = ['pl', 'en'];

  await Promise.all(
    locales.map(locale => {
      graphql(`
        {
          index: datoCmsHomePage(locale: { eq: "${locale}" }) {
              locale
              slug
          }
          about: datoCmsAboutPage(locale: { eq: "${locale}" }) {
              locale
              slug
          }
          contact: datoCmsContactPage(locale: { eq: "${locale}" }) {
              locale
              slug
          },
          shop: datoCmsShopPage(locale: { eq: "${locale}" }) {
              locale
              slug
          },
          portfolio: datoCmsPortfolioPage(locale: { eq: "${locale}" }) {
              locale
              slug
          },
          products: allDatoCmsProduct(filter: {locale: {eq: "${locale}"}}) {
            nodes {
              locale
              originalId
            }
          }
        }
      `).then(result => {
        ['index', 'about', 'contact', 'shop', 'portfolio'].forEach(template => {
          let page = result.data[template];
          const prefix = page.locale === 'pl' ? '' : `/${page.locale}`;
          let slug = template === 'index' ? '' : page.slug;
          createPage({
            path: `${prefix}/${slug}`,
            component: path.resolve(`./src/templates/${template}.js`),
            context: { locale: page.locale },
          });
        });

        result.data.products.nodes.forEach(product => {
          const prefix = product.locale === 'pl' ? '' : `/${product.locale}`;
          createPage({
            path: `${prefix}/shop/${product.originalId}`,
            component: path.resolve(`./src/templates/product.js`),
            context: {
              originalId: product.originalId,
              locale: product.locale,
            },
          });
        });
      });
    })
  );
};
