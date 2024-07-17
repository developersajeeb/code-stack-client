import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { LuTrash2 } from "react-icons/lu";
import Swal from "sweetalert2";

interface AnswerData {
    email: string | null | undefined;
    _id: string;
    body: string;
    username: string;
    uploadDate: string;
    uploadTime: string;
}

interface AnswerDetailsProps {
    answerFullData: AnswerData[];
    refetch: any;
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ answerFullData, refetch }) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

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
        <>
            {
                answerFullData?.length > 0 ? (
                    answerFullData.map((answer) => (
                        <div key={answer?._id} className="border-b py-4">
                            <div className="flex items-start gap-2 justify-between">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: answer && answer?.body ? answer?.body : "",
                                    }}
                                />
                                {
                                    answer?.email === user?.email &&
                                    <div><LuTrash2 size={20} className="text-red-500 cursor-pointer" onClick={() => handleDeleteAnswer(answer?._id)} /></div>
                                }
                            </div>
                            <div className="mt-6 flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-500"><span>{answer?.uploadDate}</span> at <span>{answer?.uploadTime}</span></p>
                                </div>
                                <div>
                                    <p className="text-sm text-end">
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
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-lg font-medium text-gray-400">No answers</div>
                )
            }
        </>
    );
};

export default AnswerDetails;