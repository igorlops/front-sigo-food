import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BreadcrumbProps {
    data_breadcrumb: Array<{
        link: string;
        label:string
    }>
}
export function Breadcrumb({data_breadcrumb}:BreadcrumbProps) {
    return (
            <div role="presentation" className='bg-gray-100 p-3 rounded-sm my-5'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/dashboard/">
                        Dashboard
                    </Link>
                    {data_breadcrumb && data_breadcrumb.map((breadcrumb, index) => (
                        <Link
                        key={index}
                            underline="hover"
                            color="inherit"
                            href={`/dashboard/${breadcrumb.link}`}
                        >
                            {breadcrumb.label}
                        </Link>
                    ))}
                </Breadcrumbs>
            </div>
    )
}