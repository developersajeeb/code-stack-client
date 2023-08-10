import { FaHtml5,FaJava,FaReact,FaNodeJs,FaCss3Alt } from "react-icons/fa";
const Discover = () => {
    return (






        <>
            <h1 className="text-3xl text-center text-indigo-800 font-medium">I work in...</h1>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 lg:grid-cols-5 gap-8'>
                <div className="card w-48 bg-base-300 shadow-2xl rounded-lg hover:scale-105 duration-300 mt-8">
                    <figure className="px-10 pt-10">
                        <p className="text-6xl text-teal-400"><FaHtml5></FaHtml5></p>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-indigo-800">HTML5</h2>
                        <div className="card-actions">
                        <button className="btn btn-primary mt-3">Discover</button>
                        </div>
                    </div>
                </div>

                <div className="card w-48 bg-base-300 shadow-2xl rounded-lg hover:scale-105 duration-300 mt-8">
                    <figure className="px-10 pt-10">
                        <p className="text-6xl text-teal-400"><FaCss3Alt></FaCss3Alt></p>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-indigo-800">CSS3</h2>
                        <div className="card-actions">
                        <button className="btn btn-primary mt-3">Discover</button>
                        </div>
                    </div>
                </div>



                <div className="card w-48 bg-base-300 shadow-2xl rounded-lg hover:scale-105 duration-300 mt-8">
                    <figure className="px-10 pt-10">
                        <p className="text-6xl text-teal-400"><FaJava></FaJava></p>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-indigo-800">Javascript</h2>
                        <div className="card-actions">
                        <button className="btn btn-primary mt-3">Discover</button>
                        </div>
                    </div>
                </div>


                <div className="card w-48 bg-base-300 shadow-2xl rounded-lg hover:scale-105 duration-300 mt-8">
                    <figure className="px-10 pt-10">
                        <p className="text-6xl text-teal-400"><FaReact></FaReact></p>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-indigo-800">React JS</h2>
                        <div className="card-actions">
                        <button className="btn btn-primary mt-3">Discover</button>
                        </div>
                    </div>
                </div>





                <div className="card w-48 bg-base-300 shadow-2xl rounded-lg hover:scale-105 duration-300 mt-8">
                    <figure className="px-10 pt-10">
                        <p className="text-6xl text-teal-400"><FaNodeJs></FaNodeJs></p>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-indigo-800">Node JS</h2>
                        <div className="card-actions">
                        <button className="btn btn-primary mt-3">Discover</button>
                        </div>
                    </div>


                    
                </div>




            </div>

        </>
    );
};

export default Discover;