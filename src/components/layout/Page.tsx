import * as React from 'react';
import clsx from 'clsx';

export default function Page({ children, className, container = true }: { children: React.ReactNode; className?: string; container?: boolean }) {
  return <div className={clsx('pt-20 md:pt-24', container && 'container mx-auto px-4', className)}>{children}</div>;
}

