import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { PiChatsCircleBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

const QueCard = ({ question }) => {
    return (
        <div className="py-4 border-b md:flex justify-between gap-6 items-center">
            <div>
                <Link to={`/main/news-feed/${question?._id}`}>
                    <h2 className="text-xl font-medium hover:text-[#33B89F] cursor-pointer duration-200">{question?.title}</h2>
                </Link>
                <ul className="flex flex-wrap gap-3 my-3">
                    {
                        question?.selected?.map((skill: string, index: number) => <li key={index} className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer"><Link to={`/main/tags?tag=${skill}`}
                        >{skill}</Link></li>)
                    }
                </ul>
                <p className="flex items-center gap-2 mt-5">
                    <span className="border rounded-full p-1.5 border-gray-400 text-color-second"><FiUploadCloud /></span>
                    <span className="text-gray-500 text-sm">Upload 5 min ago</span>
                    <span className="hover:text-[#02B1FC] text-gray-700 duration-200 cursor-pointer">sajeeb.dev</span>
                </p>
            </div>
            <div className="flex items-center gap-10 mt-6 md:mt-0">
                <ul className="text-center">
                    <li>0</li>
                    <li className="text-gray-600 my-1">votes</li>
                    <li className="grid justify-center text-gray-600"><BiLike /></li>
                </ul>
                <ul className="text-center">
                    <li>0</li>
                    <li className="text-gray-600 my-1">answer</li>
                    <li className="grid justify-center text-gray-600"><PiChatsCircleBold /></li>
                </ul>
                <ul className="text-center">
                    <li>0</li>
                    <li className="text-gray-600 my-1">views</li>
                    <li className="grid justify-center text-gray-600"><AiOutlineEye /></li>
                </ul>
            </div>
        </div>
    );
};

export default QueCard;


