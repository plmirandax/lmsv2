import { prisma } from '../../../lib/prisma';
import React from 'react';
import Link from 'next/link'; // import Link from next/link

interface VerifyEmailPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {

    if (searchParams.token) {
        const tenant = await prisma.tenant.findUnique({
            where: {
                emailVerificationToken: searchParams.token as string,
            },
        });
        if (!tenant) {
            return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Invalid token</div>;
        }

        await prisma.tenant.update({
            where: {
                emailVerificationToken: searchParams.token as string,
            },
            data: {
                emailVerified: true,
                emailVerificationToken: null
            }
        })

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>
                    Email verified for <b>{tenant.email}</b>!
                </h1>
                <Link href="/login"><a>Go back to sign in</a></Link> {/* add a link to go back to the sign in page */}
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Verify Email</h1>
                No email verification token found. Check your email.
                <Link href="/login"><a>Go back to sign in</a></Link> {/* add a link to go back to the sign in page */}
            </div>
        )
    }
};

export default VerifyEmailPage;