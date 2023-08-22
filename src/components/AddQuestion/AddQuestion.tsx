import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";


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
        console.log(question);


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
        <>
            <main>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                    <h2 className='text-4xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Ask A Public Question For Solve Your Issus</h2>
                </div>
                <section className="mt-6">
                    <form onSubmit={questionField}>
                        <div className="bg-white border p-4 border-dashed rounded-md shadow mb-6">
                            <h3 className="text-xl font-semibold">Title</h3>
                            <small className="text-gray-400">
                                Be specific and imagine you are asking a question to another
                                person
                            </small>
                            <input className="block border-2 w-full px-4 py-2 rounded-md mt-3" type="text" name="title" id="" placeholder="e.g Is there an R function for finding teh index of an element in a vector?" />
                        </div>

                        <div className="bg-white border p-4 pb-16 border-dashed rounded-md shadow">
                            <h3 className="text-xl font-semibold">Body</h3>
                            <small className="text-gray-400">
                                Include all the information someone would need to answer your
                                question
                            </small>
                            <ReactQuill
                                value={body}
                                onChange={handleQuill}
                                className="react-quill block w-full rounded-md mt-3 h-56"
                                theme="snow"
                            />
                        </div>

                        <div className="bg-white border p-4 border-dashed rounded-md shadow my-6">
                            <h3 className="text-xl font-semibold">Tags</h3>
                            <small className="text-gray-400">
                                Add up to five tags to describe what your question is about
                            </small>
                            <TagsInput
                                value={selected}
                                onChange={setSelected}
                                name="tags"
                                placeHolder="Enter tags"
                            />
                        </div>
                        <button className="bg-button">Add Now <FaArrowRight size={15} /></button>
                    </form>
                </section>
            </main>
        </>
    )
};



export default AddQuestion;