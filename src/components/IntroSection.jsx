import video1 from "../assets/profile-pictures/video1.mp4";
import video2 from "../assets/profile-pictures/video2.mov";

const IntroSection = () => {
  return (
    <div className="relative flex flex-col items-center mt-6 lg:mt-12">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide ml-12">
        HireAI: AI-Driven Skill Fitment
        <span className="bg-gradient-to-r from-purple-500 to-orange-700 text-transparent bg-clip-text">
          {" "}
          for Precise Recruitment
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Unlock smarter hiring and elevate your recruitment process with our AI-powered ATS. Start today and match the right talent with precision and ease!
      </p>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/3 border border-purple-700 shadow-purple-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/3 border border-purple-700 shadow-purple-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Updated Content Section */}
      <div className="mt-12 max-w-3xl mx-auto text-center p-6 bg-neutral-900 bg-opacity-80 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-3xl font-semibold text-purple-400">
          What We Offer:
        </h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-300">
          <li className="flex items-center">
            <span>
              <strong>AI-Powered Skill Matching:</strong> Automatically assess candidate skills against job requirements with remarkable accuracy.
            </span>
          </li>
          <li className="flex items-center">
            <span>
              <strong>Data-Driven Insights:</strong> Make informed hiring decisions with in-depth analytics and skill fitment reports.
            </span>
          </li>
          <li className="flex items-center">
            <span>
              <strong>Faster Recruitment Cycles:</strong> Reduce time-to-hire and focus on top talent, thanks to our intelligent system.
            </span>
          </li>
        </ul>
        <p className="mt-8 text-xl font-bold text-purple-400">
          Join the Future of Recruitment Today!
        </p>
        <p className="mt-4 text-lg text-gray-400">
          Sign up and discover how HireAI can transform your talent acquisition strategy!
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
