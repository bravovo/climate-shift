import { RouterProvider } from "react-router-dom";
import { router } from './router/router';
import './App.css';

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;