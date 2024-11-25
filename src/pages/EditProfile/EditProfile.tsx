import { FaArrowRight } from "react-icons/fa";
import { TagsInput } from "react-tag-input-component";
import { useState, useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { ErrorMessage } from "@hookform/error-message";
import { InputTextarea } from "primereact/inputtextarea";

const image_hosting_token = import.meta.env.VITE_Image_API;

const EditProfile = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [gender, setGender] = useState<string>('');
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const [image, setImage] = useState<File | null>(null);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            age: '',
            gender: '',
            portfolioURL: '',
            country: '',
            city: '',
            facebookURL: '',
            twitterURL: '',
            githubURL: '',
            selected: [],
            aboutMe: '',
        }
    });

    const { data: userData = [], refetch } = useQuery([user?.email], async () => {
        const res = await fetch(`http://localhost:5000/user?email=${user?.email}`);
        const data = await res.json();
        return data;
    });

    const onSubmit = async (formData: any) => {
        const { name, age, gender, portfolioURL, country, city, facebookURL, twitterURL, githubURL, aboutMe, selected } = formData;

        // Handling image upload
        if (image) {
            const uploadFormData = new FormData();
            uploadFormData.append('image', image);

            const response = await fetch(image_hosting_url, {
                method: 'POST',
                body: uploadFormData
            });

            const imgResponse = await response.json();
            formData.imgURL = imgResponse?.data?.display_url || '';
        }

        const personalData = { name, age, gender, portfolioURL, country, city, facebookURL, twitterURL, githubURL, selected, aboutMe };

        fetch(`http://localhost:5000/user/${user?.email}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success('Update Successfully!');
                } else {
                    toast.error('Error, Please try again!');
                }
            });
    };

    useEffect(() => {
        if (userData) {
            setValue('name', userData?.name);
            setValue('age', userData?.age);
            setValue('gender', userData?.gender);
            setValue('portfolioURL', userData?.portfolioURL);
            setValue('country', userData?.country);
            setValue('city', userData?.city);
            setValue('facebookURL', userData?.facebookURL);
            setValue('twitterURL', userData?.twitterURL);
            setValue('githubURL', userData?.githubURL);
            setValue('selected', userData?.selected);
            setValue('aboutMe', userData?.aboutMe);
        }
    }, [userData, setValue]);

    return (
        <main>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Edit Profile</span>
                <h2 className='text-xl md:text-3xl font-semibold text-gray-800 mb-2 mt-4'>Enhance Your Account With Perfect Details</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <div className="mb-6">
                    <label htmlFor="image" className="block text-gray-500 mb-2 text-sm font-medium">Upload Your Profile Photo</label>
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
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="name">Your Name<span className="text-red-500">*</span></label>
                        <InputText
                            className="!w-full"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Your name"
                        />
                        <p className="text-red-500 text-sm">{errors.name?.message}</p>
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="age">Your Age</label>
                        <Controller
                            name="age"
                            control={control}
                            rules={{ required: 'Age is required' }}
                            render={({ field }) => (
                                <>
                                    <InputNumber
                                        {...field}
                                        value={Number(field.value)} // Convert value to number
                                        min={1}
                                        max={100}
                                        className="!w-full"
                                        placeholder="Your age"
                                        onChange={(e) => field.onChange(e.value)}
                                    />
                                    <ErrorMessage errors={errors} name="age" as={<p className="text-red-500 text-sm" />} />
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="gender">Gender</label>
                        {/* <input className='border-2 border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-2 text-sm' type="text" name="gender" id="" placeholder="Gender" defaultValue={userData?.gender} /> */}
                        <div className="flex flex-wrap gap-3">
                            <div className="flex align-items-center">
                                <RadioButton inputId="gender1" name="gender" value="Male" onChange={(e: RadioButtonChangeEvent) => setGender(e.value)} checked={gender === 'Male'} />
                                <label htmlFor="gender1" className="ml-2">Male</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="gender2" name="gender" value="Female" onChange={(e: RadioButtonChangeEvent) => setGender(e.value)} checked={gender === 'Female'} />
                                <label htmlFor="gender2" className="ml-2">Female</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="gender3" name="gender" value="Other" onChange={(e: RadioButtonChangeEvent) => setGender(e.value)} checked={gender === 'Other'} />
                                <label htmlFor="gender3" className="ml-2">Other</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="email">Your Email</label>
                        <InputText
                            className="!w-full"
                            value={userData?.email}
                            disabled
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="portfolioURL">Portfolio URL</label>
                        <InputText
                            className="!w-full"
                            {...register('portfolioURL')}
                            placeholder="Your portfolio"
                            type="url"
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="country">Country</label>
                        <InputText
                            className="!w-full"
                            {...register('country')}
                            placeholder="Your country"
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="city">City/State</label>
                        <InputText
                            className="!w-full"
                            {...register('city')}
                            placeholder="Your city"
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="facebookURL">Facebook Profile URL</label>
                        <InputText
                            className="!w-full"
                            {...register('facebookURL')}
                            placeholder="Facebook profile url"
                            type="url"
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="twitterURL">Twitter Profile URL</label>
                        <InputText
                            className="!w-full"
                            {...register('twitterURL')}
                            placeholder="Twitter profile url"
                            type="url"
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="githubURL">GitHub Profile URL</label>
                        <InputText
                            className="!w-full"
                            {...register('githubURL')}
                            placeholder="GitHub profile url"
                            type="url"
                        />
                    </div>
                </div>
                <div>
                    <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="skills">Skills</label>
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="skills"
                        placeHolder="Type your skills & hit enter"
                    />
                </div>
                <div className="my-6">
                    <label className='block text-gray-500 text-sm font-medium mb-1' htmlFor="aboutMe">About Yourself</label>
                    <InputTextarea
                        className="!w-full"
                        {...register('aboutMe')}
                        placeholder="About yourself"
                        rows={5}
                    />
                </div>

                <button className="bg-button">Update <FaArrowRight size={15} /></button>
            </form>
        </main>
    );
};

export default EditProfile;