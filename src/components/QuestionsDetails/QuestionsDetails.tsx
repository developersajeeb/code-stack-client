import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { FaArrowRight } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import AnswerDetails from "./AnswerDetails";
import { BiEditAlt, BiLike, BiSolidLike } from "react-icons/bi";
import notUser from '../../assets/icons/user-not.png';
import { useQuery } from "@tanstack/react-query";
import { BsBookmarks, BsThreeDots } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import ImageGallery from "../ImageGallery/ImageGallery";

interface QuestionInfo {
    _id: '',
    title: string,
    body: '',
    userPhoto: '',
    selected: string[],
    name: '',
    email: '',
    username: '',
    QuestionsVote: ''
    problemImages: string[],
}

const QuestionsDetails = () => {
    const navigate = useNavigate();
    const questionData = useLoaderData() as QuestionInfo | undefined;
    const [body, setBody] = useState('');
    const uploadDate = new Date().toDateString();
    const uploadTime = new Date().toLocaleTimeString();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isQuillValid, setIsQuillValid] = useState(false);
    const [isLike, setIsLike] = useState<boolean>(false);

    const handleQuill = (value: string) => {
        setBody(value);
        setIsQuillValid(value.trim() !== '');
    }

    const { data: userData = null } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user?email=${user?.email}`)
            const data = res.json()
            return data;
        }
    })

    const { data: answerFullData = [], refetch } = useQuery([questionData?._id], async () => {
        const res = await fetch(`http://localhost:5000/answer/${questionData?._id}`);
        const data = await res.json();
        return data;
    });

    const handlePostAnswer = (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        if (!isQuillValid || body == '<p><br></p>') {
            toast.error("Please enter your answer!");
            return;
        }
        const answerData = {
            username: userData?.username || user?.displayName?.slice(0, 6) + '...' || 'anonymous',
            email: user?.email,
            questionID: questionData?._id,
            body,
            uploadDate,
            uploadTime,
        }

        fetch('http://localhost:5000/answers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(answerData)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    refetch();
                    toast.success('Post your answer!');
                    setBody('');
                } else {
                    toast.error("Error, Please try again!")
                }
            })

    }

    const handleLike = () => {
        setIsLike(true);
        const email = user?.email;
        fetch(`http://localhost:5000/vote/${questionData?._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    refetch();
                }
            })
    };

    const handleCopyClick = (postLink: string) => {
        navigator.clipboard.writeText(postLink)
            .then(() => {
                toast.success("Copied question link!");
            })
            .catch(() => {
                toast.error("Copy failed");
            });
    };

    const { data: questionLike = null } = useQuery(['questionLike', questionData?._id], async () => {
        const res = await fetch(`http://localhost:5000/question-details/${questionData?._id}`);
        const data = await res.json();
        return data;
    });

    const handleSaves = (questionID: string | undefined) => {
        const savesData = { questionID, userEmail: user?.email, questionTitle: questionData?.title };

        fetch('http://localhost:5000/saves', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(savesData)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    refetch();
                    toast.success('Saved this question!');
                } else {
                    toast.error("Error, Please try again!");
                }
            })
    }

    const handleDeleteQuestion = (id: any) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#33B89F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/delete-question/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            navigate('/main/news-feed')
                        }
                    })
            }
        })
    }


    return (
        <main>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <section>
                <div className="flex justify-between items-end">
                    <Link to={questionData?.email == user?.email && `/my-profile/${questionData?.email}` || `/main/user/${questionData?.email}`}>
                        <div className="inline-block">
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                <img className="w-11 h-11 object-cover rounded-full" src={questionData?.userPhoto || notUser} alt="" />
                                <div>
                                    <p className="font-medium">{questionData?.name}</p>
                                    <p className="text-sm text-color-second">Top Level</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <p onClick={() => handleLike()} className="cursor-pointer bg-gray-100 text-gray-500 rounded-full flex items-center gap-1 px-2 py-1 border-gray-400">
                            <span>
                                {isLike ? <BiSolidLike size={25} /> : <BiLike size={25} />}
                            </span>
                            {
                                questionLike?.QuestionsVote?.length && <span className="text-white p-1 rounded-full font-medium badge primary-bg">{questionLike?.QuestionsVote?.length}</span>
                            }
                        </p>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <p><BsThreeDots size={22} /></p>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content bg-gray-100 shadow">
                                <ul className=" bg-base-200 rounded-lg flex p-2">
                                    <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer tooltip tooltip-bottom" data-tip="share" onClick={() => handleCopyClick(`/main/news-feed/${questionData?._id}`)}>
                                        <a>
                                            <FiShare2 size={20} />
                                        </a>
                                    </li>
                                    <li>
                                        {/* <a className="p-2 rounded-md tooltip tooltip-bottom" data-tip="saved">
                                            <BsBookmarksFill size={20} />
                                        </a> */}

                                        <a className="hover:bg-gray-200 p-2 rounded-md cursor-pointer tooltip tooltip-bottom" data-tip="save" onClick={() => handleSaves(questionData?._id)}>
                                            <BsBookmarks size={20} />
                                        </a>
                                    </li>
                                    {
                                        questionData?.email == user?.email && <>
                                            <Link to={`/main/edit-question/${questionData?._id}`}>
                                                <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer duration-300 tooltip tooltip-bottom" data-tip="edit">
                                                    <a>
                                                        <BiEditAlt size={24} />
                                                    </a>
                                                </li>
                                            </Link>
                                            <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer duration-300 tooltip tooltip-bottom" data-tip="delete" onClick={() => handleDeleteQuestion(questionData?._id)}>
                                                <a>
                                                    <FaRegTrashCan size={20} />
                                                </a>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-3xl font-medium text-gray-700">{questionData?.title}</h1>
                    </div>
                    <div className="my-4" dangerouslySetInnerHTML={{
                        __html: questionData && questionData.body ? questionData.body : ""
                    }} />
                </div>
                <ImageGallery images={questionData?.problemImages || []}></ImageGallery>

                <div className="my-6">
                    <ul className="flex gap-2 flex-wrap">
                        {
                            questionData?.selected?.map((tag, index) => <Link
                                key={index}
                                to={`/main/tagged?tag=${tag}`}>
                                <li className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer">{tag}</li>
                            </Link>)
                        }
                    </ul>
                    <div>

                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Answers</h2>
                <AnswerDetails answerFullData={answerFullData}></AnswerDetails>
            </section>

            <form className="mt-8" onSubmit={handlePostAnswer}>
                <h3 className="text-lg font-medium text-gray-700">Do you know someone who can answer? Please share this question via Email, Twitter, or Facebook.</h3>
                <h2 className="font-medium text-gray-700 text-2xl mt-4">Your Answer</h2>
                <ReactQuill
                    value={body}
                    onChange={handleQuill}
                    className="react-quill block w-full rounded-md mt-3 h-56"
                    theme="snow"
                />
                <button className="bg-button mt-20 md:mt-16">Post Answer <FaArrowRight size={15} /></button>
            </form>
        </main>
    );
};

export default QuestionsDetails;