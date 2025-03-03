const Footer = () => {
    return (
      <footer className="bg-black text-white pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Tech Solutions</h3>
              <p className="text-gray-400">
                Transforming your ideas into digital reality
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-300 transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Twitter icon SVG */}
                  </svg>
                </a>
                {/* Add other social icons similarly */}
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Contact</a></li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition hover:underline">Partners</a></li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 py-8">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Tech Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;