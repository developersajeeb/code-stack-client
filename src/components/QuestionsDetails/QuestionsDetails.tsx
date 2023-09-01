import { Link, useLoaderData } from "react-router-dom";
import notUser from '../../assets/icons/user-not.png';
import ReactQuill from "react-quill";
import { useState, useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import AnswerDetails from "./AnswerDetails";
import { BiLike } from "react-icons/bi";

interface QuestionInfo {
    _id: '',
    title: string,
    body: '',
    userPhoto: '',
    selected: string[],
    name: '',
    email: '',
    username: ''
}

interface UserInfo {
    username: ''
}

const QuestionsDetails = () => {
    const questionData = useLoaderData() as QuestionInfo | undefined;
    const [body, setBody] = useState('');
    const [userData, setUserData] = useState<UserInfo | null>(null);
    const uploadDate = new Date().toDateString();
    const uploadTime = new Date().toLocaleTimeString();
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [isQuillValid, setIsQuillValid] = useState(false);

    const handleQuill = (value: string) => {
        setBody(value);
        setIsQuillValid(value.trim() !== '');
    }

    useEffect(() => {
        fetch(`https://code-stack-server.vercel.app/user?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [])

    const handlePostAnswer = (event: { preventDefault: () => void; target: any; }) => {
        event.preventDefault();
        if (!isQuillValid) {
            toast.error("Please enter your answer!");
            return;
        }
        const answerData = {
            username: userData?.username || user?.displayName?.slice(0, 6) + '...' || 'anonymous',
            email: user?.email,
            questionID: questionData?._id,
            body,
            uploadDate,
            uploadTime,
        }

        fetch('https://code-stack-server.vercel.app/answers', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(answerData)
        })
            .then(result => result.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success('Post your answer!');
                    setBody('');
                } else {
                    toast.error("Error, Please try again!")
                }
            })

    }

    return (
        <main>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <section>
                <Link to='/'>
                    <div className="inline-block mb-6">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                            <img className="w-11 h-11 object-cover rounded-full" src={questionData?.userPhoto || user?.photoURL || notUser} alt="" />
                            <div>
                                <p className="font-medium">{questionData?.name}</p>
                                <p className="text-sm text-color-second">Total Badges: 10</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="flex gap-4 items-center">
                    <div className="border border-gray-300 p-2 rounded-full text-center">
                        <p className="cursor-pointer text-gray-500"><BiLike size={25} /> <span className="text-sm font-medium">11</span></p>
                    </div>
                    <h1 className="text-3xl font-medium text-gray-700">{questionData?.title}</h1>
                </div>
                <div className="my-4" dangerouslySetInnerHTML={{
                    __html: questionData && questionData.body ? questionData.body : ""
                }} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <img className="w-full" src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg" alt="" />
                    <img className="w-full" src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                    <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHvnK5D7DVtokGFJusppQNeLZdnaQlvwn6SFkkoyKLqvI4i67Z_5JLHQmIR-61GX9Rf_Y&usqp=CAU" alt="" />
                    <img className="w-full" src="https://cdn.pixabay.com/photo/2016/11/24/20/48/programming-1857236_640.jpg" alt="" />
                    <img className="w-full" src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                    <img className="w-full" src="https://as2.ftcdn.net/v2/jpg/02/18/72/77/1000_F_218727724_ogFtvbGlr92YNwnCMmthutcwcWJ2Lfxz.jpg" alt="" />
                </div>

                <div className="my-6">
                    <ul className="flex gap-2 flex-wrap">
                        {
                            questionData?.selected?.map((tag, index) => <li className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 text-sm py-1 text-gray-400 rounded-full font-medium cursor-pointer" key={index}>{tag}</li>)
                        }
                    </ul>
                    <div>

                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Answers</h2>
                <AnswerDetails questionId={questionData?._id}></AnswerDetails>
            </section>

            <form className="mt-8" onSubmit={handlePostAnswer}>
                <h3 className="text-lg font-medium text-gray-700">Do you know someone who can answer? Please share this question via Email, Twitter, or Facebook.</h3>
                <h2 className="font-medium text-gray-700 text-2xl mt-4">Your Answer</h2>
                <ReactQuill
                    value={body}
                    onChange={handleQuill}
                    className="react-quill block w-full rounded-md mt-3 h-56"
                    theme="snow"
                />
                <button className="bg-button mt-16">Post Answer <FaArrowRight size={15} /></button>
            </form>
        </main>
    );
};

export default QuestionsDetails;