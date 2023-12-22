import { get, post } from "../../lib/request/request";

export type TCategory = {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
};

export type TCategories = Array<TCategory>;

export type TBlog = {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: TCategories;
  author: string;
};

export type TBlogs = Array<TBlog>;

export type BlogsResponse = { data: TBlogs };

//get blogs
export const getBlogs = async () =>
  get<BlogsResponse>("https://api.blog.redberryinternship.ge/api/blogs");

//get single blog
export const getBlog = async (blogId: number) =>
  get<TBlog>(`https://api.blog.redberryinternship.ge/api/blogs/${blogId}`);

export type CategoryResponse = { data: TCategories };

//get categories
export const getCategories = async () =>
  get<CategoryResponse>(
    "https://api.blog.redberryinternship.ge/api/categories"
  );

type BlogInput = Pick<TBlog, "id">;

// add new blog
export const createBlog = async (body: BlogInput) =>
  post("https://api.blog.redberryinternship.ge/api/blogs", { body });

//login
// type EmailInput = { email: string };

export const login = async (body: string) =>
  post("https://api.blog.redberryinternship.ge/api/login", { body });
