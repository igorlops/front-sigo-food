import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Home, NavigateNext } from '@mui/icons-material';
import { Box } from '@mui/material';

interface BreadcrumbProps {
    data_breadcrumb: Array<{
        link: string;
        label: string;
    }>;
}

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
    bgLight: '#fafaf9',
};

export function Breadcrumb({ data_breadcrumb }: BreadcrumbProps) {
    return (
        <Box
            role="presentation"
            sx={{
                bgcolor: colors.bgLight,
                p: 2,
                borderRadius: 2,
                my: 3,
                border: '1px solid rgba(30, 58, 138, 0.1)',
                boxShadow: '0 2px 8px rgba(30, 58, 138, 0.05)',
            }}
        >
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNext fontSize="small" sx={{ color: colors.primaryBlue }} />}
            >
                <Link
                    underline="hover"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: colors.primaryBlue,
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            color: colors.accentYellow,
                            transform: 'translateX(2px)',
                        },
                    }}
                    href="/dashboard/"
                >
                    <Home fontSize="small" />
                    Dashboard
                </Link>

                {data_breadcrumb && data_breadcrumb.map((breadcrumb, index) => {
                    const isLast = index === data_breadcrumb.length - 1;
                    return (
                        <Link
                            key={index}
                            underline="hover"
                            sx={{
                                color: isLast ? colors.accentYellow : colors.primaryBlue,
                                fontWeight: isLast ? 600 : 500,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: colors.accentYellow,
                                    transform: 'translateX(2px)',
                                },
                            }}
                            href={`/dashboard/${breadcrumb.link}`}
                        >
                            {breadcrumb.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
}