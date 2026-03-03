const MDXComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />,
  p: (props: any) => <p className="text-text-secondary leading-[1.8] mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-text-secondary mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-1" {...props} />,
  code: (props: any) => <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono text-accent" {...props} />,
  pre: (props: any) => <pre className="bg-white/[0.03] border border-white/[0.08] p-4 rounded overflow-x-auto mb-4 font-mono text-sm" {...props} />,
  a: (props: any) => <a className="text-accent hover:underline" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary mb-4" {...props} />,
};

export default MDXComponents;
