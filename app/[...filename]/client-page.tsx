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

  // Define custom components for markdown elements
  const components = {
    // Render h1 with hero styling if it's the first heading
    h1: (props: any) => {
      const { children } = props;
      const text = typeof children === 'string' ? children : children?.[0];
      if (text === '欢迎来到 Evershine Services') {
        return (
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 mb-8 -mt-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">{children}</h1>
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

      if (isServicesSection || isTestimonials || isPartners || isWhyUs) {
        return (
          <div className={`py-16 ${isWhyUs ? 'bg-gray-50' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{children}</h2>
              </div>
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
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
                <div className="text-6xl mb-4 text-center">
                  {text?.includes('清洁') && '🧹'}
                  {text?.includes('手艺人') && '🔧'}
                  {text?.includes('园艺') && '🌿'}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{children}</h3>
              </div>
            </div>
          </div>
        );
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:800">
            <div className="text-center p-6 bg-primary-50 rounded-lg">
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

      return <p className="text-gray-700 mb-4">{children}</p>;
    },
    // Render lists
    ul: (props: any) => {
      return <ul className="space-y-2 mb-6">{props.children}</ul>;
    },
    li: (props: any) => {
      const { children } = props;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-8">
                <svg className="w-8 h-8 text-primary-600 fill-current" viewBox="0 0 32 32">
                  <path d="M10 8v-6l-10 10 10 10v-6c8 0 14 2 18 6-2-8-8-14-18-14z" />
                </svg>
              </div>
              <div className="pt-4">
                <p className="text-gray-700 mb-6 italic">{props.children}</p>
              </div>
            </div>
          </div>
        </div>
      );
    },
    // Render horizontal rules
    hr: (props: any) => {
      return <hr className="my-12 border-gray-200" />;
    },
    // Render strong
    strong: (props: any) => {
      return <strong className="font-bold text-gray-900">{props.children}</strong>;
    },
  };

  return (
    <div data-tina-field={tinaField(data.page, "body")} className="prose prose-lg max-w-none">
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
