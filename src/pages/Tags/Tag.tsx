import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Tag = () => {
  const { data: tags = {}, isLoading } = useQuery([], async () => {
    const res = await fetch('http://localhost:5000/tags');
    const data = await res.json();
    return data;
  });

  return (
    <main>
      <div>
        <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Tags</span>
        <h2 className='text-3xl font-semibold text-gray-700 leading-snug mb-2 mt-4 w-full md:w-96'>Here are all the tags that used the questions</h2>
      </div>
      <section className="flex flex-wrap gap-4 mt-8">
        {isLoading ? (
          <div className="animate-pulse flex flex-wrap gap-4">
            <progress className="progress h-7 rounded-full md:w-20" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-16" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-24" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-28" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-20" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-24" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-16" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-14" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-20" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-28" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-14" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-20" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-16" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-24" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-28" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-20" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-24" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-16" value={0} max="100"></progress>
            <progress className="progress h-7 rounded-full md:w-14" value={0} max="100"></progress>
          </div>
        ) : (
          tags?.map((tag:any) => (
            <Link to={`/ tagged?tag=${tag.name}`}>
              <p className="hover:bg-indigo-50 hover:border-[#02B1FC] hover:text-[#33B89F] duration-200 bg-white border border-gray-400 px-3 py-1 text-gray-400 rounded-full font-medium cursor-pointer">
                {tag.name} | <span className="text-color-second">{tag.count}</span>
              </p>
            </Link>
          ))
        )}
      </section>
    </main>
  );
};

export default Tag;