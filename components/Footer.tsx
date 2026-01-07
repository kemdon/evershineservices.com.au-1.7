import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Evershine Services</h3>
            <p className="text-gray-400 mb-4">
              Adelaide's most trusted property services provider. With over 10 years of professional experience,
              we offer quality cleaning, handyman, and gardening services.
            </p>
            <p className="text-gray-400 mb-4">
              <strong>Address:</strong><br />
              239A Wright Street, Adelaide SA 5000
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong>{' '}
              <a href="tel:1300525598" className="text-blue-400 hover:text-blue-300 transition-colors">
                1300 525 598
              </a>
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cleaning"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cleaning Services
                </Link>
              </li>
              <li>
                <Link
                  href="/handyman"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Handyman Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gardening"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gardening Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Why Us
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/EvershineServicesADL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/evershineservicesadl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Evershine Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
