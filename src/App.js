import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList'; // Blog List Component
import BlogEditor from './components/BlogEditor'; // Blog Editor Component
import BlogPost from './components/BlogPost'; // Single Blog Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/post/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
