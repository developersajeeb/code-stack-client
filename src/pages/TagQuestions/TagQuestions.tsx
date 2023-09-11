import { useState, useEffect, useContext } from "react";
import { MdUnfoldMore } from "react-icons/md";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { PiChatsCircleBold } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import { TbMessageQuestion } from "react-icons/tb";
import { AuthContext } from "../../Provider/AuthProvider";

interface Question {
    _id: string;
    body: string;
    title: string;
    selected: string[];
    email: string;
    username: string;
    name: string;
}

const TagQuestions = () => {
    const allQuestions = useLoaderData() as Question[];
    const [tagQuestions, setTagQuestions] = useState<Question[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('tag');
    const [visibleQuestions, setVisibleQuestions] = useState<number>(8);
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    useEffect(() => {
        setTimeout(() => {
            if (paramValue !== null) {
                const filtered = allQuestions.filter((question) =>
                    question?.selected?.includes(paramValue)
                );
                setTagQuestions(filtered);
                setIsLoading(false);
            }
        }, 1000);
    }, [paramValue, allQuestions]); 

    const loadMore = () => {
        setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + 8);
    };

    return (
        <div className=''>
            <h2 className='text-3xl bg-indigo-50 px-3 py-1 text-color-second rounded-md font-medium inline-block'>{paramValue}</h2>
            <p className='mt-3 text-gray-500'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            <div className="divider text-gray-500"><TbMessageQuestion size={50} /></div>
            <div>
                {
                    isLoading ? (
                        <div className="mt-12">
                            <div className="animate-pulse mb-8">
                                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                                <ul className="flex flex-wrap gap-3 my-3">
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                </ul>
                            </div>
                            <div className="animate-pulse mb-8">
                                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                                <ul className="flex flex-wrap gap-3 my-3">
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                </ul>
                            </div>
                            <div className="animate-pulse mb-8">
                                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                                <ul className="flex flex-wrap gap-3 my-3">
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-20 h-6 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress w-14 h-6 rounded-full" value={0} max="100"></progress>
                                </ul>
                            </div>
                        </div>

                    ) : (tagQuestions?.slice(0, visibleQuestions).map((question) => <div key={question?._id} className="py-4 border-b md:flex justify-between gap-6 items-center">
                        <div>
                            <Link to={`/main/news-feed/${question?._id}`}>
                                <h2 className="text-xl font-medium hover:text-[#33B89F] cursor-pointer duration-200">{question?.title}</h2>
                            </Link>
                            <p className="mt-2 text-gray-500 text-sm" dangerouslySetInnerHTML={{
                                __html: question && question?.body ? question?.body.slice(0, 120) + '...' : ""
                            }} />
                            <ul className="flex flex-wrap gap-3 my-3 mt-5">
                                {
                                    question?.selected?.map((skill: string, index: number) => <li key={index} className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer"><Link to={`/main/tagged?tag=${skill}`}
                                    >{skill}</Link></li>)
                                }
                            </ul>
                            <p className="flex items-center gap-2 mt-5">
                                <span className="border rounded-full p-1.5 border-gray-400 text-color-second"><FiUploadCloud /></span>
                                <span className="text-gray-500 text-sm">Upload 5 min ago</span>
                                <Link to={question?.email == user?.email && `/my-profile/${question?.email}` || `/main/user/${question?.email}`}>
                                    <span className="hover:text-[#02B1FC] text-gray-700 duration-200 cursor-pointer underline">{question?.username || question?.name?.slice(0, 6) + '...'}</span>
                                </Link>
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
                    </div>))
                }
            </div>

            {visibleQuestions < tagQuestions.length && !isLoading && (
                <div className="mt-10">
                    <button className="bg-button mx-auto" onClick={loadMore}>
                        Load More <MdUnfoldMore size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TagQuestions;