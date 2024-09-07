import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { TbMessageQuestion } from "react-icons/tb";
import { AuthContext } from "../../Provider/AuthProvider";
import { Button } from "primereact/button";
import VavDetails from "../../components/VavDetails/VavDetails";
import useAdmin from "../../hooks/useAdmin";

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

const TagQuestions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [tagQuestions, setTagQuestions] = useState<Question[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('tag');
    const [visibleQuestions, setVisibleQuestions] = useState<number>(8);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<number | undefined>(undefined);

    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const { isAdmin } = useAdmin();

    useEffect(() => {
        setTagQuestions([]);
        setHasMore(undefined);
        setIsLoading(true);
    }, [paramValue]);

    useEffect(() => {
        if (tagQuestions.length === 0) {
            fetchQuestions(0);
        }
    }, [tagQuestions]);

    const fetchQuestions = async (skip: number) => {
        setLoadingMore(true);
        try {
            const res = await fetch(
                `http://localhost:5000/questions-by-tag?tag=${paramValue}&skip=${skip}&limit=10`
            );
            const newQuestions = await res.json();

            const allQuestions = [...tagQuestions, ...newQuestions];
            const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q._id, q])).values());

            setHasMore(newQuestions.length > 0 ? newQuestions.length : 0);
            setTagQuestions(uniqueQuestions);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        setLoadingMore(false);
    };

    const loadMore = () => {
        fetchQuestions(visibleQuestions);
        setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + 10);
    };

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
        <div className='px-0 lg:pl-6'>
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

                    ) : (tagQuestions?.map((question) => {
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
                    }))
                }
            </div>
            {hasMore === 0 && (
                <p className="text-xl text-gray-500 text-center mt-8 font-medium">No more questions</p>
            )}

            {tagQuestions.length >= 10 && (hasMore ?? 0) > 0 &&
                <div className="mt-10 text-center">
                    <Button
                        label="Load More"
                        disabled={loadingMore}
                        loading={loadingMore}
                        className='max-w-[250px] cs-button'
                        onClick={loadMore}
                    />
                </div>
            }
        </div>
    );
};

export default TagQuestions;