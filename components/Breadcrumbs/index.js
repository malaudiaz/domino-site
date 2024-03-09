import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function Breadcrumbs({breadcrumbs}){
    return (
      <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
          !breadcrumb.active ? (<BreadcrumbItem key={index}>
            <Link href={breadcrumb.href}>
              {breadcrumb.label}
            </Link>
          </BreadcrumbItem>) : (
          <BreadcrumbItem className='block text-sm font-medium' active key={index}>
            {breadcrumb.label}
          </BreadcrumbItem>)
        ))}
      </Breadcrumb>
    );
};
