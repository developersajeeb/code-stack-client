import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { LuTrash2 } from "react-icons/lu";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";

interface AnswerData {
    email: string | null | undefined;
    _id: string;
    body: string;
    username: string;
    uploadDate: string;
    uploadTime: string;
}

interface AnswerDetailsProps {
    allAnswers: AnswerData[];
    refetch: any;
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ allAnswers, refetch }) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [loading, setLoading] = useState<boolean>(true);
    const [answerUpdateLoading, setAnswerUpdateLoading] = useState<boolean>(false);
    const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
    const [body, setBody] = useState<string>('');    

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleEditClick = (answer: AnswerData) => {
        setEditingAnswerId(answer._id);
        setBody(answer.body);
    };

    const handleCancelEdit = () => {
        setEditingAnswerId(null);
        setBody('');
    };

    const handleUpdateAnswer = () => {
        setAnswerUpdateLoading(true);
        fetch(`http://localhost:5000/answers/${editingAnswerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    setEditingAnswerId(null);
                    setAnswerUpdateLoading(false);
                    toast.success('Your answer has been updated.');
                } else {
                    toast.error("Error, Please try again!");
                }
            });
    };

    const handleDeleteAnswer = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#33B89F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/delete-answer/${id}`, {
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
                        }
                    })
            }
        })
    }

    if (loading) {
        return <div className="mt-12">
            <div className="animate-pulse mb-8">
                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap gap-3 my-3">
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                    </ul>
                    <progress className="progress w-28 h-6 rounded-full" value={0} max="100"></progress>
                </div>
            </div>
            <div className="animate-pulse mb-8">
                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap gap-3 my-3">
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                    </ul>
                    <progress className="progress w-28 h-6 rounded-full" value={0} max="100"></progress>
                </div>
            </div>
            <div className="animate-pulse mb-8">
                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap gap-3 my-3">
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                        {/* <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress> */}
                    </ul>
                    <progress className="progress w-28 h-6 rounded-full" value={0} max="100"></progress>
                </div>
            </div>
        </div>;
    }

    return (
        <section>
            <Toaster position="top-center" reverseOrder={false} />
            {
                allAnswers?.length > 0 ? (
                    allAnswers.map((answer) => (
                        <div key={answer?._id} className="border-b py-4">
                            <div className="flex items-start gap-2 justify-between">
                                {editingAnswerId === answer._id ? (
                                    <div className="w-full">
                                        <Editor
                                            className="mt-3 w-full"
                                            value={body}
                                            onTextChange={(e: EditorTextChangeEvent) => setBody(e.htmlValue || '')}
                                            style={{ height: '300px' }}
                                        />
                                        <div className="flex gap-2 mt-5">
                                            <Button
                                                type="button"
                                                label="Update"
                                                loading={answerUpdateLoading}
                                                disabled={answerUpdateLoading}
                                                onClick={handleUpdateAnswer}
                                                className='max-w-[250px] cs-button'
                                            />
                                            <Button
                                                type="button"
                                                label="Cancel"
                                                disabled={answerUpdateLoading}
                                                onClick={handleCancelEdit}
                                                className='max-w-[250px] cs-secondary-button'
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full" dangerouslySetInnerHTML={{ __html: answer && answer?.body ? answer?.body : "" }} />
                                )}
                                <div className="hidden md:block">
                                    {
                                        answer?.email === user?.email && editingAnswerId !== answer._id &&
                                        <div className="flex items-center gap-2">
                                            <span><FiEdit size={19} className="cursor-pointer" onClick={() => handleEditClick(answer)} /></span>
                                            <span><LuTrash2 size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteAnswer(answer?._id)} /></span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex md:block items-end justify-between">
                                <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
                                    <p className="text-xs text-gray-500"><span>{answer?.uploadDate}</span> at <span>{answer?.uploadTime}</span></p>
                                    <p className="text-sm md:text-end">
                                        Answered by
                                        <Link
                                            to={
                                                answer?.email == user?.email
                                                    ? `/my-profile`
                                                    : `/user/${answer?.username}`
                                            }
                                        >
                                            <span className="text-[#02B1FC] duration-200 underline hover:text-black cursor-pointer ml-1">
                                                {answer?.username}
                                            </span>
                                        </Link>
                                    </p>
                                </div>
                                <div className="md:hidden">
                                    {
                                        answer?.email === user?.email && editingAnswerId !== answer._id &&
                                        <div className="flex items-center gap-2">
                                            <span><FiEdit size={19} className="cursor-pointer" onClick={() => handleEditClick(answer)} /></span>
                                            <span><LuTrash2 size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteAnswer(answer?._id)} /></span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-lg font-medium text-gray-400">No answers</div>
                )
            }
        </section>
    );
};

export default AnswerDetails;