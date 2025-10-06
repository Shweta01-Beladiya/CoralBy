import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios, { all } from "axios";

const BaseUrl = "http://localhost:9000";

// 1. All blog category fetch
export const fetchBlogAllCategories = createAsyncThunk(
    "blogallcategory/fetchAll",
    async () => {

        const response = await axios.get(`${BaseUrl}/api/all/category`);
        console.log("Blog Category Response:", response.data);
        return response.data.result.blogsCategory;

    }
);

// 2. All blog card fetch
export const fetchAllBlog = createAsyncThunk(
    "blogall/fetchAll",
    async () => {

        const response = await axios.get(`${BaseUrl}/api/all/blogs`);
        console.log("All Blog Response:", response.data);
        return response.data.blogs;

    }
);

// 3. Blog card fetch by id
export const fetchBlogById = createAsyncThunk(
    "blogall/fetchById",
    async (id) => {

        const response = await axios.get(`${BaseUrl}/api/blog/${id}`);
        console.log("Blog By ID Response:", response.data);
        return response.data.blog;

    }
);

// 4. Latest blog fetch
export const fetchLatestBlogs = createAsyncThunk(
    "blogall/fetchLatest",
    async () => {

        const response = await axios.get(`${BaseUrl}/api/latest/blog`);
        console.log("Latest Blog Response:", response.data);
        return response.data.result;

    }
);


const blogallcategorySlice = createSlice({
    name: "blogallcategory",
    initialState: {
        loading: false,
        categories: [],
        allblog: [],
        blogbyid: [],
        alllatestblog: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetch All Blog Categories
            .addCase(fetchBlogAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchBlogAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload || [];
                state.success = true;
            })
            .addCase(fetchBlogAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            })

            // Fetch All Blogs card
            .addCase(fetchAllBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchAllBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.allblog = action.payload || [];
                state.success = true;
            })
            .addCase(fetchAllBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            })

            // Fetch Blog By ID
            .addCase(fetchBlogById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.blogbyid = action.payload || [];
                state.success = true;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            })

            // Fetch Latest Blogs
            .addCase(fetchLatestBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.alllatestblog = action.payload || [];
                state.success = true;
            })
            .addCase(fetchLatestBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            });
    },
});

export default blogallcategorySlice.reducer;