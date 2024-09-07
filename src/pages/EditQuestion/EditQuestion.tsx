import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from "react-tag-input-component";
import { toast, Toaster } from "react-hot-toast";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";

interface QuestionData {
    _id: '';
    selected: string[];
    body: '';
    title: '';
    problemImages: string[];
}

const image_hosting_name = 'ml_default';

const EditQuestion = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const questionData = useLoaderData() as QuestionData | undefined;
    const [selected, setSelected] = useState<string[]>(questionData?.selected ||[]);
    const [body, setBody] = useState<string>(questionData?.body || '');
    const [imageLinks, setImageLinks] = useState<string[]>([]);
    const navigate = useNavigate();
    const [validationError, setValidationErrors] = useState({ title: '', tags: '' });
    const [loading, setLoading] = useState<boolean>(false); 

    const questionField = async (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        const form = event.target;
        const title: string = form.title.value;

        if (!title || selected.length === 0) {
            setValidationErrors({
                title: !title ? 'Title is required.' : '',
                tags: selected.length === 0 ? 'At least one tag is required' : ''
            });
            toast('Check all required inputs', {
                icon: '⚠️',
              });
            return;
        }

        setLoading(true);
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
                    setLoading(false);
                    toast.success('Updated Successfully!');
                    navigate(`/news-feed/${questionData?._id}`)
                } else {
                    toast.error("Error, Please try again!")
                }
            })
    }

    return (
        <main className="px-0 lg:pl-6">
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
                    <div className="bg-slate-50 p-4 rounded-md mb-6">
                        <h3 className="text-xl font-semibold">Title<span className="text-red-500 text-sm">*</span></h3>
                        <small className="text-gray-400">
                            Be specific and imagine you are asking a question to another
                            person
                        </small>
                        <input defaultValue={questionData?.title} required className="block border-2 w-full px-4 py-2 rounded-md mt-3 outline-none" type="text" name="title" id="" placeholder="e.g Is there an R function for finding teh index of an element in a vector?" />
                        {validationError.title && <p className="text-red-500 text-sm mt-1">{validationError.title}</p>}
                    </div>

                    <div className="bg-slate-50 p-4 pb-24 md:pb-16 rounded-md">
                        <h3 className="text-xl font-semibold">Body</h3>
                        <small className="text-gray-400">
                            Include all the information someone would need to answer your
                            question
                        </small>
                        <Editor className="mt-3" value={body} onTextChange={(e: EditorTextChangeEvent) => setBody(e.htmlValue || '')} style={{ height: '300px' }} />
                    </div>

                    <div className="my-6 bg-slate-50 p-4 rounded-md">
                        <label htmlFor="problemImage" className="block text-xl font-semibold">Upload Code/Problem Images</label>
                        <p className="text-xs font-light text-yellow-500 mb-2">Uploading new photos will replace your previous photo.</p>
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

                    <div className="bg-slate-50 p-4 rounded-md my-6">
                        <h3 className="text-xl font-semibold">Tags<span className="text-red-500 text-sm">*</span></h3>
                        <small className="text-gray-400">
                            Add up to five tags to describe what your question is about
                        </small>
                        <TagsInput
                            value={selected}
                            onChange={setSelected}
                            name="tags"
                            placeHolder="Enter tags"
                        />
                        {validationError.tags && <p className="text-red-500 text-sm mt-1">{validationError.tags}</p>}
                    </div>
                    <Button
                        type="submit"
                        label="Update Now"
                        icon="pi-user-plus"
                        iconPos="right"
                        disabled={loading}
                        loading={loading}
                        className='max-w-[250px] cs-button'
                    />
                </form>
            </section>
        </main>
    );
};

export default EditQuestion;