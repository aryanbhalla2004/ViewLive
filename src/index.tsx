import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
//? Font Imports
import "./assets/Font/TT-Norms-Fonts/ExtraLight.otf";
import "./assets/Font/TT-Norms-Fonts/Heavy.otf";
import "./assets/Font/TT-Norms-Fonts/Light.otf";
import "./assets/Font/TT-Norms-Fonts/Medium.otf";
import "./assets/Font/TT-Norms-Fonts/Regular.otf";
import "./assets/Font/TT-Norms-Fonts/Thin.otf";
//? Contexts
import { AccountProvider } from './setup/context-manager/AuthContext';
//? Auth Config
import { Amplify, Storage} from 'aws-amplify';
import awsExports from "./aws-exports";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DbProvider } from './setup/context-manager/dbContext';


Amplify.configure(awsExports);

Storage.configure({
  region: awsExports.aws_user_files_s3_bucket_region,
  bucket: awsExports.aws_user_files_s3_bucket,
  identityPoolId: awsExports.aws_user_pools_id,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AccountProvider>
      <DbProvider>
        <Router>
          <App />
          <ToastContainer autoClose={8000} />
          </Router>
      </DbProvider>
    </AccountProvider>
  </React.StrictMode>
);
