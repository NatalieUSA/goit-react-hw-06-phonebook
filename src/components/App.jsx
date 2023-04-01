import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Title } from './shared/Title/Title';
import { Phonebook } from './Phonebook/Phonebook';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <GlobalStyle />
          <Title>Phonebook</Title>

          <Phonebook />

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Layout>
      </PersistGate>
    </Provider>
  );
};
