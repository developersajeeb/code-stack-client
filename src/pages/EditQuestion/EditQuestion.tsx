import { useLoaderData, useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

interface QuestionData {
    _id: '';
    selected: string[];
    body: '';
    title: '';
    problemImages: string[];
}

const image_hosting_name = 'ml_default';

const EditQuestion = () => {
    const questionData = useLoaderData() as QuestionData | undefined;
    const [selected, setSelected] = useState(questionData?.selected);
    const [body, setBody] = useState<string>(questionData?.body || '');
    const [imageLinks, setImageLinks] = useState<string[]>([]);
    const navigate = useNavigate();
    // const currentDate = new Date();
    // const uploadDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    // const uploadTime = new Date().toLocaleTimeString();    

    const handleQuill = (value: SetStateAction<string>) => {
        setBody(value)
    }
    console.log(imageLinks);


    const questionField = async (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        const form = event.target;
        const title: string = form.title.value;

        const imageUrls: string[] = [];

        for (let i = 0; i < imageLinks.length; i++) {
            const formData = new FormData();
            formData.append('file', imageLinks[i]);
            formData.append('upload_preset', image_hosting_name);

            const response = await fetch('https://api.cloudinary.com/v1_1/dunqmumwl/image/upload', {
                method: 'POST',
                body: formData
            });

            const imgResponse = await response.json();
            const imgURL = imgResponse?.secure_url || '';
            imageUrls.push(imgURL);
        }

        const question = {
            title,
            body,
            selected,
            problemImages: imageLinks.length > 0 ? imageUrls : questionData?.problemImages,
        };

        fetch(`http://localhost:5000/update-question/${questionData?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(question)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Updated Successfully!');
                    navigate(`/news-feed/${questionData?._id}`)
                } else {
                    toast.error("Error, Please try again!")
                }
            })
    }

    return (
        <main>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                <h2 className='text-4xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Update Your Questions Details</h2>
            </div>
            <section className="mt-6">
                <form onSubmit={questionField}>
                    <div className="bg-white border p-4 border-dashed rounded-md shadow mb-6">
                        <h3 className="text-xl font-semibold">Title</h3>
                        <small className="text-gray-400">
                            Be specific and imagine you are asking a question to another
                            person
                        </small>
                        <input defaultValue={questionData?.title} required className="block border-2 w-full px-4 py-2 rounded-md mt-3" type="text" name="title" id="" placeholder="e.g Is there an R function for finding teh index of an element in a vector?" />
                    </div>

                    <div className="bg-white border p-4 pb-24 md:pb-16 border-dashed rounded-md shadow">
                        <h3 className="text-xl font-semibold">Body</h3>
                        <small className="text-gray-400">
                            Include all the information someone would need to answer your
                            question
                        </small>
                        <Editor className="mt-3" value={body} onTextChange={(e: EditorTextChangeEvent) => setBody(e.htmlValue || '')} style={{ height: '300px' }} />
                    </div>

                    <div className="my-6 bg-white border p-4 border-dashed rounded-md shadow">
                        <label htmlFor="problemImage" className="block text-xl font-semibold mb-2">Upload Code/Problem Images</label>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 rounded-md my-2">
                            {
                                questionData?.problemImages?.map((singleImage: string, index: number) => <img key={index} src={singleImage} alt="Problem Image" />)
                            }
                        </div>
                        <input className="cursor-pointer file:cursor-pointer relative m-0 block w-full min-w-0 rounded-md border py-3 px-5 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-[#02B1FC] hover:file:text-white border-gray-300 file:bg-indigo-50 file:font-medium file:rounded-md" type="file" name="problemImage" multiple id="problemImage"
                            accept="image/*"
                            onChange={async (e) => {
                                const selectedFiles = Array.from(e.target.files || []);
                                const fileDataUrls = await Promise.all(selectedFiles.map(async (file) => {
                                    return new Promise<string>((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            if (event.target) {
                                                resolve(event.target.result as string);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                }));

                                setImageLinks(fileDataUrls);
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
                    <button className="bg-button">Update Now <FaArrowRight size={15} /></button>
                </form>
            </section>
        </main>
    );
};

export default EditQuestion;