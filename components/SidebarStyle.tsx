'use client';

import React from 'react';

export default function SidebarStyle() {
  const css = `
/* Sidebar custom styles injected at runtime to avoid Turbopack CSS parsing bugs */
[data-sidebar-placeholder] {
  --fd-sidebar-bg: #ffffff;
}

#nd-sidebar {
  background: var(--fd-sidebar-bg);
  border-right: 1px solid rgba(16,24,40,0.04);
}

/* Section headings (separators) */
[data-sidebar-placeholder] p {
  color: #0f5132;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-top: 18px;
  margin-bottom: 6px;
  padding-inline-start: 8px;
}

/* Link items styling */
[data-sidebar-placeholder] a[data-active="true"] {
  color: #0f5132;
  background-color: rgba(16,145,90,0.06);
}

/* Thin left accent for active item */
[data-sidebar-placeholder] a[data-active="true"]::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background: #10b981;
  border-radius: 2px;
}

/* Make sure item padding doesn't collide with accent */
[data-sidebar-placeholder] a {
  position: relative;
}

/* Icons color and size */
[data-sidebar-placeholder] svg {
  color: #3f4b45;
}

/* Slightly reduce spacing to match compact design */
[data-sidebar-placeholder] a,
[data-sidebar-placeholder] button {
  padding-top: 6px;
  padding-bottom: 6px;
}
`;

  return (
    <style dangerouslySetInnerHTML={{ __html: css }} />
  );
}