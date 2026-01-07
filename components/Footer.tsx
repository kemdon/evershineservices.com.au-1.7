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
              阿德莱德最值得信赖的房产服务提供商。超过10年的专业经验，
              为您提供优质的清洁、手艺人和园艺服务。
            </p>
            <p className="text-gray-400">
              服务地区：南澳大利亚阿德莱德及周边地区
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">我们的服务</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/cleaning"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  清洁服务
                </Link>
              </li>
              <li>
                <Link
                  href="/services/handyman"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  手艺人服务
                </Link>
              </li>
              <li>
                <Link
                  href="/services/gardening"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  园艺服务
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  博客
                </Link>
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
