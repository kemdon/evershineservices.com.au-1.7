"use client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery } from "../../tina/__generated__/types";

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

  // Define custom components for HTML elements
  const components = {
    // Render div elements with className support
    div: (props: any) => {
      const { className, children, ...rest } = props;
      return <div className={className} {...rest}>{children}</div>;
    },
    // Render a elements with className support
    a: (props: any) => {
      const { href, className, children, ...rest } = props;
      return <a href={href} className={className} {...rest}>{children}</a>;
    },
    // Render span elements with className support
    span: (props: any) => {
      const { className, children, ...rest } = props;
      return <span className={className} {...rest}>{children}</span>;
    },
  };

  return (
    <div data-tina-field={tinaField(data.page, "body")}>
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
