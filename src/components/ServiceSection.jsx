import { services } from "../constants";

const ServiceSection = () => {
  return (
    <section className="py-16 mt-2 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            What we offer
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          {services.map((option, index) => (
            <div
              key={index}
              className="w-full px-4 lg:w-1/2 xl:w-1/3 sm:w-1/2 mb-8"
            >
              <div className="group relative rounded-lg p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-border transition-transform duration-300 ease-in-out transform hover:translate-x-[-12px] hover:translate-y-[-12px] hover:z-20 lg:h-[220px]">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col min-h-full">
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400">
                      {option.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {option.services.map((service, ServiceIndex) => (
                        <li
                          key={ServiceIndex}
                          className="flex items-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes gradient-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-border 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;
