import { BiCommentDetail, BiDislike, BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

interface AnswerData {
    email: string | null | undefined;
    _id: string;
    body: string;
    username: string;
}

interface AnswerDetailsProps {
    answerFullData: AnswerData[];
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ answerFullData }) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <div className="mt-12">
            <div className="animate-pulse mb-8">
                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap gap-3 my-3">
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
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
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
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
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                        <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                    </ul>
                    <progress className="progress w-28 h-6 rounded-full" value={0} max="100"></progress>
                </div>
            </div>
        </div>;
    }

    return (
        <>
            {
                answerFullData?.map(answer => <div key={answer?._id} className="border-b py-4">
                    <div dangerouslySetInnerHTML={{
                        __html: answer && answer?.body ? answer?.body : ""
                    }} />
                    <div className="mt-6 flex items-end justify-between">
                        <ul>
                            <li className="inline-block mb-3 md:mb-0"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiLike size={22} /> <span className="text-sm">14 votes</span></p></li>
                            <li className="inline-block mx-3"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiDislike size={22} /> <span className="text-sm">-13 votes</span></p></li>
                            <li className="inline-block"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiCommentDetail size={22} /> <span className="text-sm">8 reply</span></p></li>
                        </ul>
                        <div>
                            <p className="text-sm text-end">Answered by
                                <Link to={answer?.email == user?.email && `/my-profile/${answer?.email}` || `/main/user/${answer?.email}`}>
                                    <span className="text-[#02B1FC] duration-200 underline hover:text-black cursor-pointer ml-1">{answer?.username}</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default AnswerDetails;