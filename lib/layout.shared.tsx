import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src="/assets/odoo-logo.svg"
            style={{ height: 28, width: 28, objectFit: 'contain', marginRight: 8, verticalAlign: 'middle' }}
          />
          <span>Odoo Pesantren</span>
        </>
      ),
    },
  };
}
