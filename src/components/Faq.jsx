import { useState } from "react";
import { faq } from "../constants";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-6xl p-4 mt-10">
      <div className="text-3xl text-white font-semibold mb-8">
        Frequently Asked Questions
      </div>
      <div className="py-12">
        {faq.map((item, index) => (
          <div key={index} className="item px-6 py-6">
            <a
              href="#"
              className="flex items-center justify-between"
              onClick={(e) => {
                e.preventDefault();
                handleToggle(index);
              }}
            >
              <h4
                className={`font-medium transition-colors duration-300 ease-in-out ${
                  openIndex === index ? "text-purple-500" : "text-white hover:text-purple-500"
                }`}
              >
                {item.question}
              </h4>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            {openIndex === index && (
              <div className="mt-3 text-slate-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
