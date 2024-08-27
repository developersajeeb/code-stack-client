import { useEffect, useState, useContext } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiUploadCloud } from "react-icons/fi";
import VavDetails from "../../components/VavDetails/VavDetails";
import useAdmin from "../../hooks/useAdmin";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";

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
    totalViews: '';
}

interface Tag {
    tagName: string;
    count: number;
}

const NewsFeed = () => {
    const allQuestions = useLoaderData() as Question[];
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const [questionsToShow, setQuestionsToShow] = useState<number>(10);
    const [newQuestionLength, setNewQuestionLength] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>(allQuestions);
    const [tags, setTags] = useState<Tag[]>([]);
    const [isMoreBtnLoading, setIsMoreBtnLoading] = useState<boolean>(false);

    const location = useLocation();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <div className='h-screen flex justify-center items-center'>
            <div className="w-12 h-12 rounded-full animate-spin border-x-8 border-solid border-[#33B89F] border-t-transparent"></div>
        </div>;
    }
    const { user } = authContext;
    const { isAdmin } = useAdmin();

    const loadMoreQuestions = async () => {
        setIsMoreBtnLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/questions?skip=${questions.length}&limit=10`);
            const newQuestions = await response.json();
            setNewQuestionLength(newQuestions?.length);

            setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
            setQuestionsToShow((prevShow) => prevShow + 10);
        } catch (error) {
            console.error("Failed to load more questions:", error);
        } finally {
            setIsMoreBtnLoading(false);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("search_query");

        setLoading(true);

        let filteredQuestions = questions;
        if (selectedTag?.tagName === "All" || !selectedTag?.tagName) {
            if (searchQuery) {
                filteredQuestions = questions.filter(question =>
                    question.title.includes(searchQuery) || question.body.includes(searchQuery)
                );
            }
        } else {
            filteredQuestions = questions.filter((question) =>
                question?.selected?.includes(selectedTag?.tagName)
            );
        }

        setFilteredQuestions(filteredQuestions);
        setLoading(false);

    }, [selectedTag?.tagName, questions, location.search]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:5000/top-tags');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Tag[] = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchTags();
    }, []);

    const incrementViewCount = async (questionId: string) => {
        try {
            await fetch(`http://localhost:5000/questions/${questionId}/increment-view`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Failed to increment view count:", error);
        }
    };

    return (
        <main className="px-0 lg:pl-6">
            <section className="md:flex justify-between items-end bg-purple-50 p-5 rounded-lg">
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                    <h2 className='text-lg md:text-2xl font-medium text-gray-800 mt-4 mb-4 md:mb-0'>Ask A Public Question For Solve Your Issus</h2>
                </div>
                <div>
                    <Link to='/ask-question'><button className="bg-button">Ask Question <BsQuestionCircle /></button></Link>
                </div>
            </section>
            <div id="box" className="mt-5 md:mt-8 flex flex-col md:flex-row md:items-center gap-3">
                <h4 className="text-lg md:text-2xl font-medium">Filtering by top tags: </h4>
                <Dropdown
                    value={selectedTag}
                    onChange={(e: DropdownChangeEvent) => setSelectedTag(e.value)}
                    options={[{ tagName: "All", count: 0 }, ...tags]}
                    optionLabel="tagName"
                    placeholder="Select a Tag"
                    className="max-w-80"
                />
            </div>
            <section className="mt-6">
                {
                    loading ? (
                        <div className="mt-12">
                            <div className="animate-pulse mb-8">
                                <progress className="progress h-7 rounded-full md:w-5/6" value={0} max="100"></progress>
                                <progress className="progress h-7 w-1/2 rounded-full" value={0} max="100"></progress>
                                <ul className="flex flex-wrap gap-2 my-3">
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

                    ) : (
                        filteredQuestions?.slice(0, questionsToShow).map(question => {                            
                            return (
                                <div key={question?._id} className="py-4 border-b md:flex justify-between gap-6 items-center">
                                    <div>
                                        <Link to={`/news-feed/${question?._id}`} onClick={() => incrementViewCount(question?._id)}>
                                            <h2 className="text-xl font-medium hover:text-[#33B89F] cursor-pointer duration-200 inline-block">{question?.title}</h2>
                                        </Link>
                                        <p className="mt-2 text-gray-500 text-sm w-full" dangerouslySetInnerHTML={{
                                            __html: question && question?.body ? question?.body.slice(0, 120) + "..." : ""
                                        }} />
                                        <ul className="flex flex-wrap gap-2 my-3 mt-5">
                                            {
                                                question?.selected?.map((tag: string, index: number) => <Link
                                                    key={index}
                                                    to={`/tagged?tag=${tag}`}>
                                                    <li className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer">{tag}</li>
                                                </Link>)
                                            }
                                        </ul>
                                        <p className="flex items-center gap-2 mt-5">
                                            <span className="border rounded-full p-1.5 border-gray-400 text-color-second"><FiUploadCloud /></span>
                                            <span className="text-gray-400 text-sm">{question?.uploadDate} | {question?.uploadTime}</span>
                                            {
                                                isAdmin ?
                                                    <Link to={question?.email == user?.email ? `/dashboard` : `/user/${question?.username}`}>
                                                        <span className="hover:text-[#02B1FC] text-gray-700 duration-200 cursor-pointer underline">{question?.username || question?.name?.slice(0, 6) + '...'}</span>
                                                    </Link>
                                                    :
                                                    <Link to={question?.email == user?.email ? `/my-profile` : `/user/${question?.username}`}>
                                                        <span className="hover:text-[#02B1FC] text-gray-700 duration-200 cursor-pointer underline">{question?.username || question?.name?.slice(0, 6) + '...'}</span>
                                                    </Link>
                                            }
                                        </p>
                                    </div>
                                    <VavDetails question={question}></VavDetails>
                                </div>
                            )
                        })
                    )}
                {newQuestionLength === 0 &&
                    <p className="text-xl text-gray-500 text-center mt-8 font-medium">No more questions</p>
                }
                <div className={`${newQuestionLength === 0 && 'hidden'} mt-10 text-center`}>
                    <Button
                        label="Load More"
                        disabled={isMoreBtnLoading}
                        loading={isMoreBtnLoading}
                        className='max-w-[250px] cs-button'
                        onClick={loadMoreQuestions}
                    />
                </div>
            </section>
        </main>
    );
};

export default NewsFeed;