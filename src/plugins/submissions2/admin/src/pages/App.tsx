import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Editors from '../components/Editors';
import Contributors from '../components/Contributors';
import AddArticle from '../components/AddArticle';
import EditArticle from '../components/EditArticle';
import ArticleDetails from './ArticleDetails';
import UpdateAuthorBio from './UpdateAuthorBio';
const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="contributors" element={<Contributors />} />

      <Route path="editors" element={<Editors />} />
      <Route path="add-article" element={<AddArticle />} />
      <Route path="contributors/edit-article/:id" element={<EditArticle />} />
      <Route path="contributors/article/:id" element={<ArticleDetails />} />
      <Route path="update-author-bio/:id" element={<UpdateAuthorBio />} />

      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
