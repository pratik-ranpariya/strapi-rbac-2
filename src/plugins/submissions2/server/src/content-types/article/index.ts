import schema from './schema.json'; // Ensure this path is correct

// Temporarily simplified to check if the server starts
export default {
  schema,
  kind: 'collectionType',
  __schema__: schema, // This is important for Strapi's internal use
  uid: 'plugin::submissions2.article', // Ensure this is correct
  modelType: 'contentType',
  modelName: 'article', // Change this to match singularName
  connection: 'default',
};
