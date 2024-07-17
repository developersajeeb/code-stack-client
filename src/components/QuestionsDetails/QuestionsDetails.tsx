import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { BiEditAlt, BiLike, BiSolidLike } from "react-icons/bi";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import AnswerDetails from "./AnswerDetails";
import notUser from '../../assets/icons/user-not.png';
import { useQuery } from "@tanstack/react-query";
import { BsBookmarks, BsThreeDots } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Image } from 'primereact/image';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";

interface QuestionInfo {
    _id: string;
    title: string;
    body: string;
    userPhoto: string;
    selected: string[];
    name: string;
    email: string;
    username: string;
    QuestionsVote: string[];
    problemImages: string[];
}

const QuestionsDetails = () => {
    const navigate = useNavigate();
    const questionData = useLoaderData() as QuestionInfo | undefined;
    const [body, setBody] = useState('');
    const [likeCount, setLikeCount] = useState(questionData?.QuestionsVote?.length || 0);
    const [isFormBtnLoading, setIsFormBtnLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <p>Loading...</p>;
    }

    const { user } = authContext;
    const [isLike, setIsLike] = useState<boolean>(false);

    const { data: answerFullData = [], refetch } = useQuery([questionData?._id], async () => {
        const res = await fetch(`http://localhost:5000/answer/${questionData?._id}`);
        const data = await res.json();
        return data;
    });

    useEffect(() => {
        if (user?.email && questionData?.QuestionsVote) {
            const hasVoted = questionData.QuestionsVote.some(vote => vote === user.email);
            setIsLike(hasVoted);
        }
    }, [questionData, user?.email]);    

    const handleLike = () => {
        const email = user?.email;
        const url = `http://localhost:5000/vote/${questionData?._id}`;
        const method = isLike ? 'DELETE' : 'POST';
        const body = JSON.stringify({ email });

        fetch(url, {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body
        })
            .then(result => result.json())
            .then((data) => {
                if (data.updateResult.modifiedCount > 0) {
                    setIsLike(!isLike);
                    setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
                    refetch();
                }
            });
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

    const handleDeleteQuestion = (id: string) => {
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
                            navigate('/news-feed')
                        }
                    })
            }
        })
    }

    return (
        <main>
            <Toaster position="top-center" reverseOrder={false} />
            <section>
                <div className="flex justify-between items-end">
                    <Link to={questionData?.email === user?.email ? `/my-profile` : `/user/${questionData?.username}`}>
                        <div className="inline-block">
                            <div className="flex items-center gap-2 bg-gray-100 pl-3 pr-8 py-2 shadow rounded-lg relative">
                                <span className="text-[10px] bg-gray-400 p-1 text-white rounded-full absolute -right-2 -top-2">Entry</span>
                                <img className="w-11 h-11 object-cover rounded-full" src={questionData?.userPhoto || notUser} alt="" />
                                <div>
                                    <h5 className="font-medium -mb-[3px]">{questionData?.name}</h5>
                                    <span className="text-sm font-light">{questionData?.username}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <p onClick={handleLike} className="cursor-pointer bg-gray-100 text-gray-500 rounded-full flex items-center gap-1 px-2 py-1 border-gray-400">
                            <span>
                                {isLike ? <BiSolidLike size={25} /> : <BiLike size={25} />}
                            </span>
                            {
                                likeCount > 0 && <span className="text-white p-1 rounded-full font-medium badge primary-bg">{likeCount}</span>
                            }
                        </p>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="cursor-pointer">
                                <p><BsThreeDots size={22} /></p>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content bg-gray-100 shadow">
                                <ul className=" bg-base-200 rounded-lg flex px-2 pt-2">
                                    <li>
                                        <a className="hover:bg-gray-200 p-2 rounded-md cursor-pointer tooltip tooltip-bottom" data-tip="share" onClick={() => handleCopyClick(`/news-feed/${questionData?._id}`)}>
                                            <FiShare2 size={20} />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover:bg-gray-200 p-2 rounded-md cursor-pointer tooltip tooltip-bottom" data-tip="save" onClick={() => handleSaves(questionData?._id)}>
                                            <BsBookmarks size={20} />
                                        </a>
                                    </li>
                                    {questionData?.email === user?.email && (
                                        <>
                                            <Link to={`/edit-question/${questionData?._id}`}>
                                                <li>
                                                    <a className="hover:bg-gray-200 p-2 rounded-md cursor-pointer duration-300 tooltip tooltip-bottom" data-tip="edit">
                                                        <BiEditAlt size={24} />
                                                    </a>
                                                </li>
                                            </Link>
                                            {questionData?._id && (
                                                <li>
                                                    <a className="hover:bg-gray-200 p-2 rounded-md cursor-pointer duration-300 tooltip tooltip-bottom" data-tip="delete" onClick={() => handleDeleteQuestion(questionData._id)}>
                                                        <FaRegTrashCan size={20} />
                                                    </a>
                                                </li>
                                            )}
                                        </>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-3xl font-medium text-gray-700">{questionData?.title}</h1>
                    </div>
                    <div className="my-4 overflow-x-auto" dangerouslySetInnerHTML={{
                        __html: questionData?.body || ""
                    }} />
                </div>
                <div className="flex flex-wrap gap-2">
                    {
                        questionData?.problemImages?.map((image, index) => <Image key={index} className="w-36 md:w-44" src={image} alt="Image" preview />)
                    }
                </div>

                <div className="my-6">
                    <ul className="flex gap-2 flex-wrap">
                        {
                            questionData?.selected?.map((tag, index) =>
                                <li key={index} >
                                    <Link
                                        className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer"
                                        to={`/tagged?tag=${tag}`}>{tag}</Link>
                                </li>)
                        }
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Answers</h2>
                <AnswerDetails answerFullData={answerFullData} refetch={refetch}></AnswerDetails>
            </section>

            <form className="mt-8" onSubmit={(event) => {
                event.preventDefault();
                if (!body || body === '<p><br></p>') {
                    toast.error("Please enter your answer!");
                    return;
                }

                setIsFormBtnLoading(true);

                const answerData = {
                    username: user?.displayName?.slice(0, 6) + '...' || 'anonymous',
                    email: user?.email,
                    questionID: questionData?._id,
                    body,
                    uploadDate: new Date().toDateString(),
                    uploadTime: new Date().toLocaleTimeString(),
                };

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
                            toast.success('Posted your answer!');
                            setBody('');
                        } else {
                            toast.error("Error, Please try again!");
                        }
                        setIsFormBtnLoading(false);
                    })
                    .catch(() => {
                        toast.error("Error, Please try again!");
                        setIsFormBtnLoading(false);
                    });
            }}>
                <h3 className="text-lg font-medium text-gray-700">Do you know someone who can answer? Please share this question via Email, Twitter, or Facebook.</h3>
                <h2 className="font-medium text-gray-700 text-2xl mt-4">Your Answer</h2>
                <Editor className="mt-3" value={body} onTextChange={(e: EditorTextChangeEvent) => setBody(e.htmlValue || '')} style={{ height: '300px' }} />
                <Button
                    type="submit"
                    label="Post Answer"
                    icon="pi-user-plus"
                    iconPos="right"
                    disabled={isFormBtnLoading}
                    loading={isFormBtnLoading}
                    className='max-w-[250px] !mt-5 cs-button'
                />
            </form>
        </main>
    );
};

export default QuestionsDetails;
