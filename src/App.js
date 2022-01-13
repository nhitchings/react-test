import './App.css';import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import PostDetails from './components/PostDetails';
import DanDan from './components/DanDan';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerList />}>
          </Route>
          <Route path="/user/:userId" element={<CustomerDetail />}>
          </Route>
          <Route path="/post/:postId" element={<PostDetails />}>
          </Route>
          <Route path="/dandan" element={<DanDan />}>
          </Route>
          <Route path="*" element={<CustomerList />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
