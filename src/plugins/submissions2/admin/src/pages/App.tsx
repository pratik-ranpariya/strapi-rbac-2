import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Editors from '../components/Editors';
import Contributors from '../components/Contributors';
import AddArticle from '../components/AddArticle';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="contributors" element={<Contributors />} />

      <Route path="editors" element={<Editors />} />
      <Route path="add-article" element={<AddArticle />} />

      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
