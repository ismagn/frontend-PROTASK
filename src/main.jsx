
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router';
import './index.css'
import { ProtaskProvider } from '../context/ProtaskProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ProtaskProvider>
      <RouterProvider router={router} />
    </ProtaskProvider>
)
