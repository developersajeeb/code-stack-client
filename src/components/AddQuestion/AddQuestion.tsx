import { SetStateAction, useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";

const image_hosting_name = 'ml_default';

interface UserInfo {
    name: string,
    username: string,
    imgURL: '',
    email: ''
}

const AddQuestion = () => {
    const [selected, setSelected] = useState(["Web Development"]);
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const uploadDate = new Date().toDateString();
    const uploadTime = new Date().toLocaleTimeString();
    
    useEffect(() => {
        fetch(`http://localhost:5000/user?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [])

    const handleQuill = (value: SetStateAction<string>) => {
        setBody(value)
    }

    const questionField = async (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        const form = event.target;
        const title: string = form.title.value;

        const formData = new FormData();
        if (image) {
            formData.append('file', image);
            formData.append('upload_preset', image_hosting_name);
        }

        const response = await fetch('https://api.cloudinary.com/v1_1/dunqmumwl/image/upload', {
            method: 'POST',
            body: formData
        });
        const imgResponse = await response.json();
        const imgURL = imgResponse?.secure_url || '';

        const question = {
            title,
            body,
            selected,
            problemImages:imgURL,
            username: userData?.username,
            name: userData?.name,
            email: userData?.email,
            userPhoto: userData?.imgURL,
            uploadDate,
            uploadTime
        }
        fetch('http://localhost:5000/questions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    form.reset()
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
                            <input required className="block border-2 w-full px-4 py-2 rounded-md mt-3" type="text" name="title" id="" placeholder="e.g Is there an R function for finding teh index of an element in a vector?" />
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

                        <div className="my-6 bg-white border p-4 border-dashed rounded-md shadow">
                            <label htmlFor="problemImage" className="block text-xl font-semibold mb-2">Upload Code/Problem Images</label>
                            <input className="cursor-pointer file:cursor-pointer relative m-0 block w-full min-w-0 rounded-md border py-3 px-5 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-[#5138EE] hover:file:text-white border-gray-300 file:bg-indigo-50 file:font-medium file:rounded-md" type="file" name="problemImage" multiple id="problemImage"
                                accept="image/*"
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    if (selectedFile) {
                                        setImage(selectedFile);
                                    }
                                }} />
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