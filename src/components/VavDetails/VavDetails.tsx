import {useState} from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { PiChatsCircleBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { BiLike, BiSolidLike } from "react-icons/bi";

interface Question {
    email: any;
    username: '';
    name: '';
    _id: string;
    body: string;
    title: string;
    selected: string[];
    uploadTime: '';
    uploadDate: '';
    likes: [];
}

const VavDetails = ({question}:{ question: Question }) => {

    const [isLike, setIsLike] = useState<boolean>(false);
    const handleLike = async () => {
          setIsLike(true);
      };

    const { data: totalAnswers = [] } = useQuery([question?._id], async () => {
        const res = await fetch(`http://localhost:5000/answer/${question?._id}`);
        const data = await res.json();
        return data;
    });     

    return (
        <div className="flex items-center gap-10 mt-6 md:mt-0">
            <ul className="text-center">
                <li>0</li>
                <li className="text-gray-600 my-1">votes</li>
                <li onClick={()=>handleLike()} className="grid justify-center text-gray-600">{isLike ? <BiSolidLike/>:<BiLike />}</li>
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