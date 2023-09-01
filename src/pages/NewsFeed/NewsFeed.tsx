import { AiOutlineEye } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import { MdUnfoldMore } from "react-icons/md";
import { PiChatsCircleBold } from "react-icons/pi";
import { Link, useLoaderData } from "react-router-dom";

interface Question {
    _id: string;
    body: string;
    title: string;
    selected: string[];
}

const NewsFeed = () => {
    const allQuestions = useLoaderData() as Question[] | undefined;


    return (
        <main className="px-0 lg:pl-6">
            <section className="md:flex justify-between items-end bg-purple-50 p-5 rounded-lg">
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                    <h2 className='text-2xl font-medium text-gray-800 mt-4 mb-4 md:mb-0'>Ask A Public Question For Solve Your Issus</h2>
                </div>
                <div>
                    <Link to='/main/ask-question'><button className="bg-button">Ask Question <BsQuestionCircle /></button></Link>
                </div>
            </section>

            <section className="mt-6">
                {
                    allQuestions?.map(question => <div key={question?._id} className="py-4 border-b md:flex justify-between gap-6 items-center">
                        <div>
                            <Link to={`/main/news-feed/${question?._id}`}>
                                <h2 className="text-xl font-medium hover:text-[#33B89F] cursor-pointer duration-200">{question?.title}</h2>
                            </Link>
                            <ul className="flex flex-wrap gap-3 my-3">
                                {
                                    question?.selected?.map((skill: string, index: number) => <li key={index} className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer">{skill}</li>)
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
                    </div>)
                }
                <div className="mt-10"><button className="bg-button mx-auto">Load More <MdUnfoldMore size={20} /></button></div>
            </section>
        </main>
    );
};

export default NewsFeed;