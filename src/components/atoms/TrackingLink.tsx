'use client';
import Link, { LinkProps } from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { AnchorHTMLAttributes } from 'react';

type TrackingLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  eventName: string;
  eventParams?: Record<string, any>;
};

export default function TrackingLink({ href, eventName, eventParams, children, className, ...rest }: TrackingLinkProps) {
  return (
    <Link 
      href={href} 
      onClick={() => sendGAEvent('event', eventName, eventParams || {})}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}
