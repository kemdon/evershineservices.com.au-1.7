const testimonials = [
  {
    name: "D. Johnson",
    service: "地毯清洁",
    content: "我雇佣Evershine清洗我的地毯，他们在4小时内完成了工作，而且做得非常好。",
  },
  {
    name: "David K",
    service: "租约结束清洁",
    content: "在我和伴侣搬到墨尔本之前，我们请Evershine为我们的出租物业做租约结束清洁。而且，我们仅在一周后就全额拿回了押金！谢谢Evershine服务！",
  },
  {
    name: "Scott O",
    service: "租约结束清洁",
    content: "Evershine救了我的命！！！选择Evershine是我做过的最好的决定！",
  },
  {
    name: "Damian J. J",
    service: "办公室清洁",
    content: "工作做得非常出色，谢谢你Evershine。",
  },
  {
    name: "匿名客户",
    service: "园艺服务",
    content: "我老爸说：'儿子，你的花园终于成为房子的一部分了！'谢谢Evershine。",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            客户评价
          </h2>
          <p className="text-xl text-gray-600">
            听听我们的客户怎么说
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 relative hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-4 left-8">
                <svg
                  className="w-8 h-8 text-primary-600 fill-current"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8v-6l-10 10 10 10v-6c8 0 14 2 18 6-2-8-8-14-18-14z" />
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary-600">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-primary-50 px-6 py-3 rounded-full">
            <svg
              className="w-6 h-6 text-primary-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
                <span className="text-gray-700 font-semibold">
                  客户满意度：100%
                </span>
          </div>
        </div>
      </div>
    </section>
  );
}
