import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`);

    const delBlog = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`,{
            method: 'DELETE'
        })
        .then(res => {
            history.push('/');
        })
    }

    return (
        <div className="blog-details">
            {error && <div>{ error }</div>}
            {isLoading && <div>Loading ...</div>}
            {blog && 
                <article>
                    <h2>{ blog.title }</h2>
                    <div>{ blog.body }</div>
                    <p>Written by: { blog.author }</p>
                    <button onClick={delBlog}>Delete</button>
                </article>
            }
        </div> 
    );
}

export default BlogDetails;