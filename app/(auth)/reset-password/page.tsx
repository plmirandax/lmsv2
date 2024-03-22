import ChangePwdModal from '../../../components/forms/changePwd';
import ResetPwdModal from '../../../components/forms/resetPwd';
import { prisma } from '../../../lib/prisma';
import React from 'react';
import Link from 'next/link'; // import Link from next/link

interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    if (searchParams.token) {
        const user = await prisma.user.findUnique({
            where: {
                resetPasswordToken: searchParams.token as string,
            },
        });
        if (!user) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    Invalid token.
                    <Link href="/signin"><a>Go back to sign in</a></Link> {/* add a link to go back to the sign in page */}
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ChangePwdModal resetPasswordToken={searchParams.token as string} />
                <Link href="/login"><a>Go back to sign in</a></Link> {/* add a link to go back to the sign in page */}
            </div>
        );
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ResetPwdModal />
                <Link href="/login"><a>Go back to sign in</a></Link> {/* add a link to go back to the sign in page */}
            </div>
        );
    }
};

export default ResetPasswordPage;