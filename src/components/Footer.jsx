import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ml-20">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link className="text-neutral-300 hover:text-white" to="#">
                Getting Started
              </Link>
            </li>
            <li>
              <Link className="text-neutral-300 hover:text-white" to="/workflow">
                Workflow
              </Link>
            </li>
            <li>
              <Link className="text-neutral-300 hover:text-white" to="/aboutus">
                About us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link className="text-neutral-300 hover:text-white" to="/features">
                Features
              </Link>
            </li>
            <li>
              <Link className="text-neutral-300 hover:text-white" to="/services">
                Our services
              </Link>
            </li>
            <li>
              <Link className="text-neutral-300 hover:text-white" to="/faq">
                FAQ's
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="font-semibold">Email:</span>
              <span className="ml-2 text-neutral-300">infor@gmail.com</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold">Contact:</span>
              <span className="ml-2 text-neutral-300">+91-1234567890</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold">Address:</span>
              <span className="ml-2 text-neutral-300">SSGMCE, SBI Colony</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
