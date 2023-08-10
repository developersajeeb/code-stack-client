import search from '../../../public/search.png';
import analyze from '../../../public/analyze.png';
import apply from '../../../public/apply.jpg';
const Statistics = () => {
    return (
        <div className="mb-10 mx-auto shadow-lg p-10 grid grid-cols-3 gap-10">
            <div className='bg-slate-100 rounded-xl'>
                <div className='flex items-center justify-between bg-orange-500 px-10 py-5 rounded-t-xl'>
                    <h3 className='text-4xl font-bold text-white'>Find</h3>
                    <img src={search} alt="" className='h-20' />
                </div>
                <div className='px-4 py-6 space-y-2'>
                    <h4 className='font-medium text-2xl'>How to deploy Next.js App...</h4>
                    <p>Introduction: Netlify is a development tool used by frontend developers to...</p>
                </div>
            </div>
            <div className='bg-slate-100 rounded-xl'>
                <div className='flex items-center justify-between bg-green-600 px-10 py-5 rounded-t-xl'>
                    <h3 className='text-4xl font-bold text-white'>Analyze</h3>
                    <img src={analyze} alt="" className='h-20' />
                </div>
                <div className='px-4 py-6 space-y-2'>
                    <h4 className='font-medium text-2xl'>Analyze all solutions</h4>
                    <p>Thoroughly examine various approaches to understand, evaluate, and select...</p>
                </div>
            </div>
            <div className='bg-slate-100 rounded-xl'>
                <div className='flex items-center justify-between bg-sky-600 px-10 py-5 rounded-t-xl'>
                    <h3 className='text-4xl font-bold text-white'>Apply</h3>
                    <img src={apply} alt="" className='h-20' />
                </div>
                <div className='px-4 py-6 space-y-2'>
                    <h4 className='font-medium text-2xl'>Applying optimal solutions</h4>
                    <p>Implement chosen code or options to address challenges effectively and...</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;