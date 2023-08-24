import { BsQuestionCircle } from "react-icons/bs";



const NewsFeed = () => {

    return (
        <main className="px-0 lg:px-6">
            <section className="md:flex justify-between items-end">
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                    <h2 className='text-2xl font-medium text-gray-800 mt-4 mb-4 md:mb-0'>Ask A Public Question For Solve Your Issus</h2>
                </div>
                <div>
                    <button className="bg-button">Ask Question <BsQuestionCircle /></button>
                </div>
            </section>
        </main>
    );
};

export default NewsFeed;