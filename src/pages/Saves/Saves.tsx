import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { Button } from "primereact/button";
import { GoBookmarkFill } from "react-icons/go";
import personThinkingImg from '../../assets/others/person-thinking.png';

interface SavesData {
    _id: string;
    questionTitle: string;
    questionID: '';
    userEmail: '';
}

const Saves = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [allSaves, setAllSaves] = useState<SavesData[]>([]);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchSavesQuestions = async () => {
        try {
            if (skip === 0) {
                setIsLoading(true);
            } else {
                setIsButtonLoading(true);
            }

            const res = await fetch(`http://localhost:5000/single-user-saves/${user?.email}?skip=${skip}&limit=10`);
            const questions = await res.json();

            if (questions.length > 0) {
                setAllSaves((prev) => {
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
            fetchSavesQuestions();
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchSavesQuestions();
        }
    }, [user?.email]);

    return (
        <main>
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Saved Questions</span>
                <h2 className='text-3xl font-semibold text-gray-700 leading-snug mt-4'>Your All Saved Questions</h2>
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
                            allSaves.length > 0 ? (
                                allSaves?.map(question => (
                                    <div key={question?._id} className='flex items-start justify-between border-b gap-4'>
                                        <p className="flex gap-2 py-2 text-base text-gray-500 font-normal">
                                            <span><GoBookmarkFill size={24} /></span> {question?.questionTitle}
                                        </p>
                                        <Link to={`/news-feed/${question.questionID}`} className='text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 inline-block' title='View'>
                                            <HiOutlineEye size={24} />
                                        </Link>
                                    </div>
                                )))
                                :
                                <div className="flex justify-center">
                                    <div className="text-sm my-20 text-gray-500 text-center">
                                        <img className='w-32 mx-auto mb-4' src={personThinkingImg} alt="" />
                                        <span className='font-medium'>Saved questions will appear here!</span>
                                        <p className="max-w-[384px] mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/ask-question'><span className="ml-1 text-color-second cursor-pointer">ask a question</span></Link> ans selecting tags that match topics with your questions.</p>
                                    </div>
                                </div>)
                    }
                </div>

                {!isLoading && hasMore && allSaves.length > 0 && (
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
        </main>
    );
};

export default Saves;