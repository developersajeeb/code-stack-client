import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../AddQuestion/AddQuestion.css'
import { TagsInput } from "react-tag-input-component";
import { toast, Toaster } from "react-hot-toast";


const AddQuestion = () => {
    const [selected, setSelected] = useState(["Web Development"]);
    const [body, setBody] = useState('');

    const handleQuill = value => {
        setBody(value)
    }

    const questionField = event => {
        event.preventDefault();
        const form = event.target;
        const title: string = form.title.value;
        const question = { title, body, selected }

        fetch('https://code-stack-server.vercel.app/questions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success('Added Successfully!');
                } else {
                    toast.error("Error, Please try again!")
                }
                form.reset()
            })
    }

    return (
        <form onSubmit={questionField}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="add-question">
                <div className="add-question-container">
                    <div className="head-title">
                        <h1>Ask a public question</h1>
                    </div>
                    <div className="question-container">
                        <div className="question-options">
                            <div className="question-option">
                                <div className="title">
                                    <h3>Title</h3>
                                    <small>
                                        Be specific and imagine you are asking a question to another
                                        person
                                    </small>
                                    <input type="text" name="title" id="" placeholder="e.g Is there an R function for finding teh index of an element in a vector?" />
                                </div>
                            </div>
                            <div className="question-option">
                                <div className="title">
                                    <h3>Body</h3>
                                    <small>
                                        Include all the information someone would need to answer your
                                        question
                                    </small>
                                    <ReactQuill
                                        value={body}
                                        onChange={handleQuill}
                                        className="react-quill"
                                        theme="snow"
                                    />
                                </div>
                            </div>


                            <div className="question-option">
                                <div className="title">
                                    <h3>Tags</h3>
                                    <small>
                                        Add up to five tags to describe what your question is about
                                    </small>
                                    <TagsInput
                                        value={selected}
                                        onChange={setSelected}
                                        name="tags"
                                        placeHolder="Enter tags"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button>ADD NOW</button>
                    {/* <button className="button"> Add  question </button> */}

                </div>
            </div>
        </form>
    )
};



export default AddQuestion;