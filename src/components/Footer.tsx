
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">TarkVayu</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              India's first hyperlocal AQI forecast tool serving rural and small-town communities with real-time air quality data and health advisories.
            </p>
            <p className="text-sm text-gray-400">
              Breathe It. Beat It. Track It.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/forecast" className="hover:text-white transition-colors">Forecast</a></li>
              <li><a href="/health" className="hover:text-white transition-colors">Health Advisory</a></li>
              <li><a href="/trends" className="hover:text-white transition-colors">Historical Trends</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>support@tarkvayu.in</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TarkVayu. All rights reserved. | Powered by CPCB & Satellite Data</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
