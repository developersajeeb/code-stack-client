import { FaArrowRight } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const image_hosting_token = import.meta.env.VITE_Image_API;

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    aboutMe: string;
    age: number;
    city: string;
    country: string;
    facebookURL: URL;
    gender: string;
    githubURL: URL;
    portfolioURL: URL;
    twitterURL: URL;
    selected: string[];
}

const EditProfile = () => {
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const userData = useLoaderData() as UserInfo | undefined;
    const [image, setImage] = useState<File | null>(null);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;
    const [selected, setSelected] = useState(["Web Development"]);

    const handleUpdateDetails = async (event: { preventDefault: () => void; target: any; }) => {

        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const age = form.age.value;
        const gender = form.gender.value;
        const portfolioURL = form.portfolioURL.value;
        const country = form.country.value;
        const city = form.city.value;
        const facebookURL = form.facebookURL.value;
        const twitterURL = form.twitterURL.value;
        const githubURL = form.githubURL.value;
        const aboutMe = form.aboutMe.value;

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        });

        const imgResponse = await response.json();
        const imgURL = imgResponse?.data?.display_url || '';
        console.log(imgURL);

        const personalData = { name, imgURL, age, gender, portfolioURL, country, city, facebookURL, twitterURL, githubURL, selected, aboutMe }
        fetch(`https://code-stack-server.vercel.app/user/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Update Successfully!');
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
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Edit Profile</span>
                <h2 className='text-3xl font-semibold text-gray-800 leading-snug mb-2 mt-4 w-full md:w-80'>Enhance Your Account With Perfect Details</h2>
            </div>
            <form onSubmit={handleUpdateDetails} className="mt-10">
                <div className="mb-6">
                    <label htmlFor="image" className="block text-gray-600 mb-2">Upload Your Profile Photo</label>
                    <input className="cursor-pointer file:cursor-pointer relative m-0 block w-full min-w-0 rounded-md border py-3 px-5 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] hover:file:bg-[#02B1FC] hover:file:text-white border-gray-300 file:bg-indigo-50 file:font-medium file:rounded-md" type="file" name="image" id="image"
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setImage(selectedFile);
                            }
                        }} />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-600' htmlFor="name">Your Name</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="text" name="name" id="" placeholder="Your name" defaultValue={userData?.name} />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="age">Your Age</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="number" name="age" id="" placeholder="Age" defaultValue={userData?.age} />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="gender">Gender</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="text" name="gender" id="" placeholder="Gender" defaultValue={userData?.gender} />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-600' htmlFor="email">Your Email</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="email" name="email" id="" placeholder="Your Email" defaultValue={userData?.email} disabled />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="portfolioURL">Portfolio URL</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="url" name="portfolioURL" id="" placeholder="Your Portfolio" defaultValue={userData?.portfolioURL?.toString()} />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-600' htmlFor="country">Country</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="text" name="country" id="" placeholder="Country" defaultValue={userData?.country} />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="city">City/State</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="text" name="city" id="" placeholder="City or State" defaultValue={userData?.city} />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-600' htmlFor="facebookURL">Facebook Profile URL</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="url" name="facebookURL" id="" placeholder="Facebook Profile URL" defaultValue={userData?.facebookURL?.toString()} />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="twitterURL">Twitter Profile URL</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="url" name="twitterURL" id="" placeholder="Twitter Profile URL" defaultValue={userData?.twitterURL?.toString()} />
                    </div>
                    <div>
                        <label className='block text-gray-600' htmlFor="githubURL">GitHub Profile URL</label>
                        <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="url" name="githubURL" id="" placeholder="GitHub Profile URL" defaultValue={userData?.githubURL?.toString()} />
                    </div>
                </div>
                <div>
                    <label className='block text-gray-600 mb-2' htmlFor="skills">Skills</label>
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="skills"
                        placeHolder="Type your skills & hit enter"
                    />
                </div>
                <div className="my-6">
                    <label className='block text-gray-600' htmlFor="aboutMe">About</label>
                    <textarea className="border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm" name="aboutMe" id="" cols={30} rows={6} placeholder="About Yourself" defaultValue={userData?.aboutMe}></textarea>
                </div>

                <button className="bg-button">Update <FaArrowRight size={15} /></button>
            </form>
        </main>
    );
};

export default EditProfile;