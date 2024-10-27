import React from 'react';
import { aboutus, abouticon } from '../constants';

const AboutUs = () => {
  return (
    <div className="mt-2 tracking-wide ml-6 mr-6">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20 font-semibold">
        About Us
      </h2>
      <div className="flex flex-wrap -mx-4">
        {aboutus.map((about, index) => (
          <div
            key={index}
            className="w-full px-4 lg:w-1/2 xl:w-1/3 mb-8"
          >
            <div className="group relative rounded-lg p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-border bg-[length:400%_400%] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:translate-x-[-4px] hover:translate-y-[-4px] hover:z-20">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col lg:h-[310px]">
                <div className="flex flex-col items-center py-6 flex-grow">
                  <div className="text-4xl mb-4 group-hover:text-purple-600">
                    {abouticon[index] && React.cloneElement(abouticon[index].icon, {
                      className: "transition-colors duration-300"
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mx-2 text-center transition-colors duration-300 ease-in-out group-hover:text-purple-600">
                    {about.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mx-4 py-2 lg:my-2 transition-transform duration-300 ease-in-out sm:py-2 text-center group-hover:text-white ">
                  {about.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
