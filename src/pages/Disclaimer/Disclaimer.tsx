import {  FaInfoCircle } from "react-icons/fa";

const Disclaimer = () => {
    return (

        <div className="hero min-h-screen  p-15  shadow-slate-400  ">
            <div className="hero-content ">
                <div className='relative  p-10 '>
                    <div className="border-spacing-14 shadow-2xl  p-10">
                       <h1 className=" text-gray-400 text-4xl mt-2 mb-4">Disclaimer for CodeStack</h1>
                        <div className="divider text-gray-500"><FaInfoCircle size={50} /></div>
                        <p className="text-sm mb-4">If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at alaminsust95@gmail.com. Our Disclaimer was generated with the help of the Free Disclaimer Generator.</p>
                        <p className="text-lg mb-4">Disclaimers for CodeStack</p>
                        <p className="text-sm mb-4">
                        All the information on this website - infocodestack@gmail.com - is published in good faith and for general information purpose only. codeStack does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (codeStack), is strictly at your own risk. codeStack will not be liable for any losses and/or damages in connection with the use of our website.  </p>

                        <p className="text-sm mb-4">From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.</p>

                        <p className="text-sm mb-4">Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.</p>

                        <p className="text-sm mb-4">Consent</p>

                        <p className="text-sm mb-4">By using our website, you hereby consent to our disclaimer and agree to its terms.</p>

                        <p className="text-sm mb-4">Update</p>

                        <p className="text-sm mb-4">Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
                    </div>
                </div>



  
            </div>
        </div>
    );
};

export default Disclaimer;