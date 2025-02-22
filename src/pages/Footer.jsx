const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 rounded-t-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Split Expense App</h2>
          <p className="text-sm text-gray-400">
            Simplifying shared expenses, one split at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row items-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white transition-all duration-300"
          >
            <i className="fab fa-instagram text-3xl"></i>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white transition-all duration-300"
          >
            <i className="fab fa-github text-3xl"></i>
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-white transition-all duration-300"
          >
            <i className="fab fa-linkedin text-3xl"></i>
          </a>
        </div>

        {/* Credits */}
        <div className="text-sm text-gray-400 mt-4 md:mt-0">
          © 2025 Split Expense App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
