import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { BiBookmarkAlt } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbTags, TbUserQuestion } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";

interface Tag {
    tagName: string;
    count: number;
}
interface HotQuestion {
    _id: string;
    title: string;
    likeCount: number;
}

const Main = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hotQuestions, setHotQuestions] = useState<HotQuestion[]>([]);
    const [questionLoading, setQuestionLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/top-tags');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Tag[] = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const fetchHotQuestion = async () => {
            try {
                setQuestionLoading(true);
                const response = await fetch('http://localhost:5000/hot-questions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: HotQuestion[] = await response.json();
                setHotQuestions(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setQuestionLoading(false);
            }
        };

        fetchHotQuestion();
    }, []);

    return (
        <main className="px-4 pt-7 pb-10 max-w-[1300px] mx-auto">
            <section>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <main className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <section className="col-span-1 md:col-span-3">
                                <Outlet></Outlet>
                            </section>
                            <main className="col-span-1">
                                <section>
                                    <div className="relative">
                                        <h2 className="text-8xl font-medium text-gray-100">top</h2>
                                        <h3 className="font-medium text-2xl text-gray-500 absolute bottom-0 left-0">Tags</h3>
                                    </div>
                                    {loading ? (
                                        <>
                                            <Skeleton height="1.5rem" width="9rem" className="my-6"></Skeleton>
                                            <Skeleton height="1.5rem" width="7rem" className="mb-6"></Skeleton>
                                            <Skeleton height="1.5rem" width="6rem" className="mb-6"></Skeleton>
                                            <Skeleton height="1.5rem" width="8rem" className="mb-6"></Skeleton>
                                            <Skeleton height="1.5rem" width="5rem"></Skeleton>
                                        </>
                                    ) : (
                                        <ul className="mt-6 grid gap-6">
                                            {
                                                tags?.map((tag, index) => (
                                                    <li className="flex items-center justify-between" key={index}>
                                                        <Link to={`/tagged?tag=${tag?.tagName}`} className="bg-indigo-50 px-3 text-sm py-1 text-color rounded-md font-medium cursor-pointer">{tag?.tagName}</Link>
                                                        <span className="font-medium text-gray-600">{tag?.count}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )}
                                </section>

                                <section className="mt-4">
                                    <div className="relative">
                                        <h2 className="text-8xl font-medium text-gray-100">hot</h2>
                                        <h3 className="font-medium text-2xl text-gray-500 absolute bottom-0 left-0">Questions</h3>
                                    </div>
                                    {questionLoading ? (
                                        <>
                                            <Skeleton height="1.5rem" width="12rem" className="mt-6 mb-4"></Skeleton>
                                            <Skeleton height="1.5rem" width="10rem" className="mb-4"></Skeleton>
                                            <Skeleton height="1.5rem" width="9rem" className="mb-4"></Skeleton>
                                            <Skeleton height="1.5rem" width="8rem" className="mb-4"></Skeleton>
                                            <Skeleton height="1.5rem" width="10rem"></Skeleton>
                                        </>
                                    ) : (
                                        <ul className="mt-6 grid gap-4">
                                            {
                                                hotQuestions?.map(question => (
                                                    <li key={question?._id}>
                                                        <Link to={`/news-feed/${question?._id}`} className="hover:text-[#5138EE] cursor-pointer duration-200 flex items-center justify-between gap-4">
                                                            {question?.title} <span><MdKeyboardArrowRight size={25} /></span>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )}
                                </section>
                            </main>
                        </main>
                    </div>
                    <ul className="menu text-base h-full font-medium hidden lg:block">
                        <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/news-feed'><FaRegNewspaper /> News Feed</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/ask-question'><TbUserQuestion /> Ask Question</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/tags'><TbTags /> Tags</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/users'><FiUsers /> Users</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-color flex items-center gap-2' : ' text-gray-500 flex items-center gap-2'} to='/badges'><BiBookmarkAlt /> Badges</NavLink></li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Main;