import Link from "next/link";

const services = [
  {
    title: "清洁服务",
    description: "专业的清洁服务，包括租约结束清洁、商业清洁和售前清洁。超过5年的行业经验，确保您能顺利拿回押金。",
    icon: "🧹",
    link: "/services/cleaning",
    features: ["租约结束清洁", "商业/企业清洁", "售前清洁", "地毯清洁"],
  },
  {
    title: "手艺人服务",
    description: "经验丰富的手艺人团队，满足您的各种需求。没有太小的活，我们使用顶级配件，像对待自己的财产一样照顾您的房产。",
    icon: "🔧",
    link: "/services/handyman",
    features: ["一般维修", "家具组装", "油漆服务", "小型装修"],
  },
  {
    title: "园艺服务",
    description: "把草坪修剪的时间留给家人。生活已经很忙碌，为什么还要在园艺上花费数小时？让Evershine的专业园丁为您服务。",
    icon: "🌿",
    link: "/services/gardening",
    features: ["草坪修剪", "花园维护", "修剪整形", "杂草清除"],
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            我们的专业服务
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            在Evershine，我们提供全方位的房产服务，满足您的各种需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8"
            >
              <div className="text-6xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Link
                  href={service.link}
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  了解更多
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
