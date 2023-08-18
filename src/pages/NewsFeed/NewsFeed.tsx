import { useLoaderData } from "react-router-dom";


const NewsFeed = () => {
    const data = useLoaderData();

    return (
       <main className="px-3 py-12 md:px-8 md:py-32 lg:px-32">
        {/* {
            data?.map(ques => <div>
                hi
            </div>)
        } */}
       </main> 
    );
};

export default NewsFeed;