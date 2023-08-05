import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [author, setAuthor] = useState('mario');
    const [isSaving, setIsSaving] = useState(false);

    const history = useHistory();

    const saveBlog = (e) => {
        e.preventDefault();

        const blog = { title, body, author };

        setIsSaving(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        })
        .then(res => {
            setIsSaving(false);
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <form onSubmit={saveBlog}>
                <label>BLog Title: </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>BLog Body: </label>
                <textarea
                    rows="6"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author: </label>
                <select
                    required
                    value={author}
                    onChange={(e) => {setAuthor(e.target.value)}}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                {!isSaving && <button>Add Blog</button>}
                {isSaving && <button disabled>Adding Blog ...</button>}
            </form>
        </div>
    );
}

export default Create;