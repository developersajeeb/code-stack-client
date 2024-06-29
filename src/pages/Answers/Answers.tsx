import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { MdUnfoldMore } from 'react-icons/md';
import { IoChatbubblesOutline } from 'react-icons/io5';

interface AnswerData {
    _id: string;
    body: '';
    questionID: '';
}

const Answers = () => {
    const [allAnswers, setAllAnswers] = useState<AnswerData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [visibleAnswers, setVisibleAnswers] = useState<number>(8);    

    useEffect(() => {
        fetch(`http://localhost:5000/answers/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllAnswers(data)
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
    }, [])

    const loadMoreAnswers = () => {
        setVisibleAnswers((prevVisibleAnswers) => prevVisibleAnswers + 8);
    };

    console.log(allAnswers);
    

    return (
        <main>
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Questions</span>
                <h2 className='text-3xl font-semibold text-gray-700 leading-snug mt-4'>Here Are Your All Answers</h2>
            </div>
            <div className="h-[450px] overflow-y-auto custom-scrollbar mt-5">
                {
                    isLoading ? (
                        <div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-4/5 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-full rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-10/12 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-8/12 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-9/12 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-7/12 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-10/12 rounded-full" value={0} max="100"></progress>
                            </div>
                            <div className="animate-pulse mb-4 flex items-center">
                                <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                <progress className="progress h-7 w-11/12 rounded-full" value={0} max="100"></progress>
                            </div>
                        </div>

                    ) : (
                        allAnswers.length === 0 ? (
                            <div className="flex justify-center">
                                <p className="text-sm mt-4 text-gray-500 text-center">
                                    <span>Just getting started? Try answering a question!</span>
                                    <p className="w-full md:w-96 mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/ask-question'><span className="ml-1 text-color-second cursor-pointer">answering a question</span></Link> or selecting tags that match topics you’re interested in.</p>
                                </p>
                            </div>)
                            :
                            (
                                allAnswers?.slice(0, visibleAnswers).map(answer => <Link key={answer?._id} to={`/news-feed/${answer?.questionID}`}>
                                    <p className="border-b flex gap-2 py-2 text-lg text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 font-normal"><span><IoChatbubblesOutline size={24} /></span> <span dangerouslySetInnerHTML={{
                                        __html: answer && answer.body ? answer.body : ""
                                    }} ></span></p>
                                </Link>))
                    )
                }
                {visibleAnswers < allAnswers.length && !isLoading && (
                    <div className="mt-6">
                        <button className="bg-button mx-auto" onClick={loadMoreAnswers}>
                            More <MdUnfoldMore size={20} />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Answers;