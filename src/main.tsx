import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss";

import { Provider } from "react-redux";
import { store } from './redux/store.ts';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
)
