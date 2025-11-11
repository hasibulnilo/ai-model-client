import { Link } from 'react-router-dom';
import { Facebook, X, Instagram, Mail } from 'lucide-react';
import { LuCpu } from 'react-icons/lu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 rounded-xl mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-white">
            <LuCpu size={25} />
            <span className="text-xl font-bold text-white">AI Model Inventory Manager</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/models" className="text-gray-200 hover:text-blue-100">All Models</Link></li>
            <li><Link to="/add-model" className="text-gray-200 hover:text-blue-100">Add Model</Link></li>
            <li><Link to="/profile" className="text-gray-200 hover:text-blue-100">Profile</Link></li>
            <li><Link to="/auth/login" className="text-gray-200 hover:text-blue-100">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Learning Blog</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Guides</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">AI Tips</Link></li>
            <li><Link to="/resources" className="text-gray-200 hover:text-blue-100">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Discussion Forums</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Study Groups</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Events & Workshops</Link></li>
            <li><Link to="/" className="text-gray-200 hover:text-blue-100">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-100">
              <Facebook size={24} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-100">
              <X size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-100">
              <Instagram size={24} />
            </a>
          </div>
          <div>
            <a 
              href="mailto:support@aimodelmanager.com" 
              className="flex items-center text-gray-200 hover:text-blue-100"
            >
              <Mail size={18} className="mr-2" /> support@aimodelmanager.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-300 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-200">
          © {currentYear} AI Model Inventory Manager. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-blue-100 mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-blue-100">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;