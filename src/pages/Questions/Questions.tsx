import { Link } from "react-router-dom";
import storage from '../../assets/others/pngwing.com.png'
import { useContext, useEffect, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdUnfoldMore } from "react-icons/md";
import { AuthContext } from "../../Provider/AuthProvider";

interface QuestionData {
    _id: '',
    title: '',
}

const Questions = () => {
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const [questionsToDisplay, setQuestionsToDisplay] = useState<number>(6);
    const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(true);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLoadMore = () => {
        const nextQuestionsToDisplay = questionsToDisplay + 6;
        setQuestionsToDisplay(nextQuestionsToDisplay);

        if (nextQuestionsToDisplay >= allQuestions.length) {
            setHasMoreQuestions(false);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/questions/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllQuestions(data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
    }, [])

    return (
        <main>
            <section>
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Questions</span>
                    <h2 className='text-3xl font-semibold text-gray-700 leading-snug mt-4'>Your All Posted Questions</h2>
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
                            allQuestions ? (
                                allQuestions?.map(question => <Link key={question._id} to={`/ news-feed/${question._id}`}>
                                    <p className="border-b flex items-center gap-2 py-2 text-lg text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 font-normal"><span><RiQuestionAnswerLine size={24} /></span> {question?.title}</p>
                                </Link>))
                                :
                                <div className="flex justify-center">
                                    <p className="text-sm mt-4 text-gray-500 text-center">
                                        <img className="w-40 mx-auto" src={storage} alt="" />
                                        <span>Just getting started? Try answering a question!</span>
                                        <p className="w-full md:w-96 mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/ ask-question'><span className="ml-1 text-color-second cursor-pointer">answering a question</span></Link> or selecting tags that match topics you’re interested in.</p>
                                    </p>
                                </div>)
                    }
                    {
                        hasMoreQuestions && !isLoading && (
                            <div className="mt-6">
                                <button className="bg-button mx-auto" onClick={handleLoadMore}>
                                    More <MdUnfoldMore size={20} />
                                </button>
                            </div>
                        )}
                </div>
            </section>
        </main>
    );
};

export default Questions;