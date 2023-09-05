import { AiOutlineEye } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { PiChatsCircleBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";

const VavDetails = ({questionId}:{ questionId: string }) => {

    const { data: totalAnswers = [] } = useQuery([questionId], async () => {
        const res = await fetch(`http://localhost:5000/answer/${questionId}`);
        const data = await res.json();
        return data;
    });     

    return (
        <div className="flex items-center gap-10 mt-6 md:mt-0">
            <ul className="text-center">
                <li>0</li>
                <li className="text-gray-600 my-1">votes</li>
                <li className="grid justify-center text-gray-600"><BiLike /></li>
            </ul>
            <ul className="text-center">
                <li>{totalAnswers?.length}</li>
                <li className="text-gray-600 my-1">answers</li>
                <li className="grid justify-center text-gray-600"><PiChatsCircleBold /></li>
            </ul>
            <ul className="text-center">
                <li>0</li>
                <li className="text-gray-600 my-1">views</li>
                <li className="grid justify-center text-gray-600"><AiOutlineEye /></li>
            </ul>
        </div>
    );
};

export default VavDetails;