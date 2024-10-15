import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { AuthContext } from "../../Provider/AuthProvider";
import { Button } from "primereact/button";
import { HiOutlineEye } from "react-icons/hi";
import giveQuestionImg from '../../assets/others/question.png';

interface QuestionData {
    _id: '',
    title: '',
}

const Questions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchQuestions = async () => {
        try {
            if (skip === 0) {
                setIsLoading(true);
            } else {
                setIsButtonLoading(true);
            }

            const res = await fetch(`http://localhost:5000/questions/${user?.email}?skip=${skip}&limit=10`);
            const questions = await res.json();

            if (questions.length > 0) {
                setAllQuestions((prev) => {
                    const newQuestions = questions.filter((newQuestion: any) =>
                        !prev.some((existingQuestion: any) => existingQuestion._id === newQuestion._id)
                    );
                    return [...prev, ...newQuestions];
                });
                setSkip(skip + 10);
            }

            if (questions.length < 10) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setIsLoading(false);
            setIsButtonLoading(false);
        }
    };

    const loadMoreQuestions = () => {
        if (hasMore) {
            fetchQuestions();
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchQuestions();
        }
    }, [user?.email]);

    return (
        <main>
            <section>
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Questions</span>
                    <h2 className='text-3xl font-semibold text-gray-700 leading-snug mt-4'>Your All Posted Questions</h2>
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
                            allQuestions.length > 0 ? (
                                allQuestions?.map(question => (
                                    <div key={question?._id} className='flex items-start justify-between border-b gap-4'>
                                        <p className="flex gap-2 py-2 text-base text-gray-500 font-normal">
                                            <span><RiQuestionAnswerLine size={24} /></span> {question?.title}
                                        </p>
                                        <Link to={`/news-feed/${question._id}`} className='text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 inline-block' title='View'>
                                            <HiOutlineEye size={24} />
                                        </Link>
                                    </div>
                                )))
                                :
                                <div className="flex justify-center">
                                    <div className="text-sm my-20 text-gray-500 text-center">
                                        <img className='w-32 mx-auto mb-4' src={giveQuestionImg} alt="" />
                                        <span className='font-medium'>Just getting started? Ask a question!</span>
                                        <p className="max-w-[384px] mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/ask-question'><span className="ml-1 text-color-second cursor-pointer">ask a question</span></Link> ans selecting tags that match topics with your questions.</p>
                                    </div>
                                </div>)
                    }
                </div>

                {!isLoading && hasMore && allQuestions.length > 0 && (
                    <div className="text-center mt-10">
                        <Button
                            label="Load More"
                            disabled={isButtonLoading}
                            loading={isButtonLoading}
                            className='max-w-[250px] cs-button'
                            onClick={loadMoreQuestions}
                        />
                    </div>
                )}
            </section>
        </main>
    );
};

export default Questions;