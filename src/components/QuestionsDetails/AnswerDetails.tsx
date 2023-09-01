import { useEffect, useState } from "react";
import { BiCommentDetail, BiDislike, BiLike } from "react-icons/bi";

interface AnswerInfo {
    username: string;
    body: string;
}

const AnswerDetails = (questionId: { questionId: any; }) => {
    const [answerData, setAnswerData] = useState([] as Array<AnswerInfo>)

    useEffect(() => {
        fetch(`http://localhost:5000/answer/${questionId.questionId}`)
            .then(res => res.json())
            .then(data => setAnswerData(data))
    }, [])    

    return (
        <>
            {
                answerData?.map(answer => <div className="border-b py-4">
                    <p className="" dangerouslySetInnerHTML={{
                        __html: answer && answer?.body ? answer?.body : ""
                    }} />
                    <div className="mt-6 flex items-end justify-between">
                        <ul>
                            <li className="inline-block"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiLike size={22} /> <span className="text-sm">14 votes</span></p></li>
                            <li className="inline-block mx-3"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiDislike size={22} /> <span className="text-sm">-13 votes</span></p></li>
                            <li className="inline-block"><p className="cursor-pointer border border-gray-400 flex items-center gap-1 px-2 py-1 rounded-full"><BiCommentDetail size={22} /> <span className="text-sm">8 reply</span></p></li>
                        </ul>
                        <div>
                            <p>Answered by <span className="text-[#02B1FC] duration-200 underline hover:text-black cursor-pointer">{answer?.username}</span></p>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default AnswerDetails;