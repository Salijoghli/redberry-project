import { Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/blog-details";
import Home from "./pages/home";
import NewBlog from "./pages/new-blog";
import NotFound from "./pages/not-found";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  element: ReactNode;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) =>
  sessionStorage.getItem("email") ? element : <NotFound />;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route
        path="new-blog"
        element={<ProtectedRoute element={<NewBlog />} />}
      />
      <Route path="blog-details/:blogId" element={<BlogDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
