import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { Button } from 'primereact/button';
import { HiOutlineEye } from "react-icons/hi";
import giveAnswerImg from '../../assets/others/ask.png';

interface AnswerData {
    _id: string;
    body: '';
    questionID: '';
}

const Answers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [allAnswers, setAllAnswers] = useState<AnswerData[]>([]);
    const [limitAnswer, setLimitAnswer] = useState<AnswerData[]>(allAnswers);
    const [newAnswerLength, setNewAnswerLength] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [answerToShow, setAnswerToShow] = useState<number>(10);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isMoreBtnLoading, setIsMoreBtnLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/single-user-answers/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllAnswers(data);
            })
            .catch((error) => console.error("Failed to load answers:", error))
            .finally(() => setIsLoading(false));
    }, [user]);

    const loadMoreAnswer = async () => {
        setIsMoreBtnLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/answers/${user?.email}?skip=${limitAnswer?.length}&limit=10`);
            const newAnswers = await response.json();
            setNewAnswerLength(newAnswers?.length);

            setLimitAnswer((prevAnswers) => [...prevAnswers, ...newAnswers]);
            setAnswerToShow(answerToShow + 10);
        } catch (error) {
            console.error("Failed to load more answers:", error);
        } finally {
            setIsMoreBtnLoading(false);
        }
    };
    const skipAllAnswers = allAnswers?.slice(0, answerToShow);

    return (
        <main>
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Questions</span>
                <h2 className='text-xl md:text-3xl font-semibold text-gray-700 leading-snug mt-4'>Here Are Your All Answers</h2>
            </div>
            <div className="mt-5">
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
                        </div>
                    ) : (
                        allAnswers.length === 0 ? (
                            <div className="flex justify-center">
                                <div className="text-sm my-20 text-gray-500 text-center">
                                    <img className='w-32 mx-auto mb-4' src={giveAnswerImg} alt="" />
                                    <h4 className='font-medium'>Just getting started? Try answering a question!</h4>
                                    <p className="max-w-[384px] mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/news-feed'><span className="ml-1 text-color-second cursor-pointer">answering a question</span></Link> and selecting tags that match topics you’re interested in.</p>
                                </div>
                            </div>
                        ) : (
                            skipAllAnswers?.map(answer => (
                                <div key={answer?._id} className='flex items-start justify-between border-b gap-4'>
                                    <p className="flex gap-2 py-2 text-base text-gray-500 font-normal">
                                        <span><IoChatbubblesOutline size={24} /></span>
                                        <span dangerouslySetInnerHTML={{ __html: answer && answer.body ? answer.body : "" }}></span>
                                    </p>
                                    <Link to={`/news-feed/${answer?.questionID}`} className='text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 inline-block' title='View'>
                                        <HiOutlineEye size={24} />
                                    </Link>
                                </div>
                            ))
                        )
                    )
                }
                <div className={`mt-10 text-center ${newAnswerLength === 0 || skipAllAnswers.length < 10 && 'hidden'}`}>
                    <Button
                        label="Load More"
                        disabled={isMoreBtnLoading}
                        loading={isMoreBtnLoading}
                        className='max-w-[250px] cs-button'
                        onClick={loadMoreAnswer}
                    />
                </div>
            </div>
        </main>
    );
};

export default Answers;