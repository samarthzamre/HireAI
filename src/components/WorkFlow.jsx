import { CheckCircle2 } from "lucide-react";
import resume from "../assets/profile-pictures/resume.png";
import { checklistItems } from "../constants";

const WorkFlow = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-6 tracking-wide text-center">
        Streamline Your {" "}
        <span className="bg-gradient-to-r from-purple-500 to-orange-700 text-transparent bg-clip-text">
          Recruitment Process
        </span>
      </h2>
      <div className="flex flex-wrap justify-center mt-2">
        <div className="p-2 w-full lg:w-1/2 mt-2">
          <img
            src={resume}
            alt="Code"
            className="sm:mt-3 sm:w-full lg:h-[600px] sm:h-[500px]"
          />
        </div>
        <div className="pt-12 w-full lg:w-1/2 mt-3">
          {checklistItems.map((item, index) => {
            return (
              <div key={index} className="flex mb-12">
                <div className="text-blue-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                  <CheckCircle2 />
                </div>
                <div>
                  <h5 className="mt-1 mb-2 text-xl">
                    {item.title}
                  </h5>
                  <p className="text-md text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
