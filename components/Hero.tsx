import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            阿德莱德最专业的房产服务
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            清洁服务 · 手艺人服务 · 园艺服务
          </p>
          <p className="text-lg mb-12 text-primary-50 max-w-3xl mx-auto">
            超过10年的专业经验，为您提供最优质的房产服务。
            我们致力于让您的房产焕然一新。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cleaning"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              了解我们的服务
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              关于我们
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 md:h-24 text-gray-50 fill-current"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path d="M0,22L60,21.3C120,21,240,19,360,18.7C480,18,600,19,720,21.3C840,24,960,27,1080,28C1200,29,1320,27,1380,26L1440,25L1440,54L1380,54C1320,54,1200,54,1080,54C960,54,840,54,720,54C600,54,480,54,360,54C240,54,120,54,60,54L0,54Z"></path>
        </svg>
      </div>
    </section>
  );
}
