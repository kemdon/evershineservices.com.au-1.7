const partners = [
  { name: "Belle Property", logo: "🏠" },
  { name: "Harcourts", logo: "🏢" },
  { name: "DG", logo: "🔷" },
  { name: "Other Partners", logo: "⭐" },
];

export default function Partners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            我们的合作伙伴和客户
          </h2>
          <p className="text-xl text-gray-600">
            让我们看看我们知名的客户
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{partner.logo}</div>
                <p className="text-gray-700 font-medium">{partner.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            我们与多家房地产公司和物业管理公司建立了长期合作关系
          </p>
        </div>
      </div>
    </section>
  );
}
