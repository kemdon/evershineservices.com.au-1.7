"use client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery } from "../../tina/__generated__/types";
import Link from "next/link";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: { page: PageQuery["page"] };
}

export default function ClientPage(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  const buttonLabels = new Set([
    "返回首页",
    "查看服务",
    "了解更多",
    "立即联系我们",
    "获取免费报价",
  ]);

  const getText = (children: any): string => {
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(getText).join("");
    }
    return "";
  };

  // Define custom components for markdown elements
  const components = {
    // Render h1 with hero styling if it's the first heading
    h1: (props: any) => {
      const { children } = props;
      const text = typeof children === "string" ? children : children?.[0];
      const heroMap: Record<string, { gradient: string; icon?: string }> = {
        "专业清洁服务": { gradient: "from-blue-500 to-blue-700", icon: "🧹" },
        "专业园艺服务": { gradient: "from-green-500 to-green-700", icon: "🌿" },
        "专业手艺人服务": { gradient: "from-orange-500 to-orange-700", icon: "🔧" },
        "关于 Evershine Services": { gradient: "from-primary-600 to-primary-800" },
      };
      if (text === '欢迎来到 Evershine Services') {
        return (
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 mb-8 -mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">{children}</h1>
          </div>
        );
      }
      if (text && heroMap[text]) {
        const hero = heroMap[text];
        return (
          <div className={`bg-gradient-to-r ${hero.gradient} text-white rounded-xl p-10 mb-8 -mt-2`}>
            {hero.icon ? (
              <div className="text-5xl mb-4 text-center">{hero.icon}</div>
            ) : null}
            <h1 className="text-3xl md:text-4xl font-bold text-center">{children}</h1>
          </div>
        );
      }
      return <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>;
    },
    // Render h2
    h2: (props: any) => {
      const { children } = props;
      const text = typeof children === 'string' ? children : children?.[0];
      const isServicesSection = text === '我们的专业服务';
      const isTestimonials = text === '客户评价';
      const isPartners = text === '我们的合作伙伴';
      const isWhyUs = text === '为什么选择 Evershine？';
      const isAdelaideService = text === '阿德莱德最专业的房产服务';

      if (isServicesSection || isTestimonials || isPartners || isWhyUs) {
        return (
          <div className={`py-16 ${isWhyUs ? 'bg-gray-50' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{children}</h2>
                {isTestimonials && <p className="text-xl text-gray-600">听听我们的客户怎么说</p>}
              </div>
            </div>
          </div>
        );
      }
      if (isAdelaideService) {
        return (
          <div className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">{children}</h2>
            </div>
          </div>
        );
      }
      return <h2 className="text-3xl font-bold text-gray-900 mb-4">{children}</h2>;
    },
    // Render h3
    h3: (props: any) => {
      const { children } = props;
      const text = typeof children === 'string' ? children : children?.[0];

      // Check if it's a service title
      if (text?.includes('清洁服务') || text?.includes('手艺人服务') || text?.includes('园艺服务')) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-primary-500">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">
                    {text?.includes('清洁') && '🧹'}
                    {text?.includes('手艺人') && '🔧'}
                    {text?.includes('园艺') && '🌿'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{children}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Check if it's a testimonial author
      if (text?.includes('D. Johnson') || text?.includes('David K') || text?.includes('Scott O') || text?.includes('Damian') || text?.includes('匿名客户')) {
        return <h3 className="text-lg font-semibold text-primary-600 mt-4">{children}</h3>;
      }

      return <h3 className="text-2xl font-bold text-gray-900 mb-4">{children}</h3>;
    },
    // Render paragraphs
    p: (props: any) => {
      const { children } = props;
      const text = typeof children === 'string' ? children : '';

      // Special styling for hero subtitle
      if (text.includes('清洁服务 · 手艺人服务')) {
        return <p className="text-xl md:text-2xl text-center text-primary-100 mb-4">{children}</p>;
      }

      // CTA paragraph
      if (text.includes('立即联系我们')) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center p-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">{children}</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        );
      }

      // Partner intro paragraph
      if (text.includes('我们与多家房地产公司')) {
        return <p className="text-center text-gray-600 mt-6 text-lg">{children}</p>;
      }

      return <p className="text-gray-700 mb-4">{children}</p>;
    },
    // Render lists
    ul: (props: any) => {
      const childText = props?.children?.[0]?.props?.children || '';
      // Check if it's the partners list
      if (typeof childText === 'string' && childText.includes('Belle Property')) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {props.children}
            </div>
          </div>
        );
      }
      // Check if it's the "Why Choose Us" list
      if (typeof childText === 'string' && childText.includes('丰富经验')) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {props.children}
            </div>
          </div>
        );
      }
      return <ul className="space-y-2 mb-6">{props.children}</ul>;
    },
    li: (props: any) => {
      const { children } = props;
      const childString = typeof children === 'string' ? children : '';

      // Check if it's a partner item
      if (childString.includes('Belle Property') || childString.includes('Harcourts') || childString.includes('DG') || childString.includes('其他合作伙伴')) {
        return (
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">
              {childString.includes('Belle') && '🏠'}
              {childString.includes('Harcourts') && '🏢'}
              {childString.includes('DG') && '🔷'}
              {childString.includes('其他') && '⭐'}
            </div>
            <div className="font-semibold text-gray-900">{children}</div>
          </div>
        );
      }

      // Check if it's a "Why Choose Us" feature
      if (childString.includes('丰富经验') || childString.includes('专业团队') || childString.includes('全方位服务') ||
          childString.includes('客户至上') || childString.includes('快速响应') || childString.includes('合理定价')) {
        return (
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary-500">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div>{children}</div>
            </div>
          </div>
        );
      }

      return (
        <li className="flex items-start text-gray-700">
          <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{children}</span>
        </li>
      );
    },
    // Render blockquotes for testimonials
    blockquote: (props: any) => {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 relative hover:shadow-lg transition-all border border-primary-100">
            <div className="absolute -top-4 left-8">
              <svg className="w-10 h-10 text-primary-500 fill-current" viewBox="0 0 32 32">
                <path d="M10 8v-6l-10 10 10 10v-6c8 0 14 2 18 6-2-8-8-14-18-14z" />
              </svg>
            </div>
            <div className="pt-4 pl-8 text-gray-700 italic text-lg leading-relaxed">{props.children}</div>
          </div>
        </div>
      );
    },
    // Render horizontal rules
    hr: (props: any) => {
      return <hr className="my-16 border-t-2 border-gray-200" />;
    },
    // Render strong
    strong: (props: any) => {
      const childText = typeof props?.children === 'string' ? props.children : '';
      // Check if it's the customer satisfaction rating
      if (childText.includes('客户满意度：100%')) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 text-center border-2 border-yellow-200">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-yellow-700">{props.children}</div>
            </div>
          </div>
        );
      }
      // Check if it's "服务项目：" label
      if (childText.includes('服务项目：')) {
        return <strong className="font-bold text-gray-900 block text-lg mb-3">{props.children}</strong>;
      }
      return <strong className="font-bold text-gray-900">{props.children}</strong>;
    },
    a: (props: any) => {
      const href = props?.url ?? props?.href ?? "";
      const text = getText(props?.children);
      const isButton = buttonLabels.has(text);
      const className = isButton
        ? "inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        : "text-primary-600 hover:text-primary-700 underline";
      const isExternal = href.startsWith("http");

      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {props.children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          className={className}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {props.children}
        </a>
      );
    },
  };

  return (
    <div data-tina-field={tinaField(data.page, "body")} className="prose prose-lg max-w-none">
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
