import { createBrowserRouter } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';

const prod = false; // Automatically set to true in production
const basename = prod ? '/brotecs' : '/';

export const router = createBrowserRouter([ LayoutRoutes], {
  basename,
});
