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
                    <Link href="/signin"><a>Go back to sign in</a></Link>
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ChangePwdModal resetPasswordToken={searchParams.token as string} />
                <Link href="/"><p>Go back to sign in</p></Link>
            </div>
        );
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ResetPwdModal />
                <Link href="/"><p>Go back to sign in</p></Link>
            </div>
        );
    }
};

export default ResetPasswordPage;