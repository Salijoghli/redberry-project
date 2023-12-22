import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { TCategories, TBlogs, getCategories, getBlogs } from "../api/blogs/api";

type ContextType = {
  categories: TCategories;
  blogs: TBlogs;
};

const defaultContext: ContextType = {
  categories: [],
  blogs: [],
};

const DataContext = createContext<ContextType>(defaultContext);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [categories, setCategories] = useState<TCategories>([]);
  const [blogs, setBlogs] = useState<TBlogs>([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories.data);
    });

    getBlogs()
      .then((blogs) => {
        setBlogs(blogs.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DataContext.Provider value={{ categories, blogs }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  return context;
};
