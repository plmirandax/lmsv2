import ChangePwdModal from '../../../components/forms/changePwd';
import ResetPwdModal from '../../../components/forms/resetPwd';
import { prisma } from '../../../lib/prisma';
import React from 'react';

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
            return <div>Invalid token.</div>;
        }

        return <ChangePwdModal resetPasswordToken={searchParams.token as string} />;
    } else {
        return <ResetPwdModal />;
    }
};

export default ResetPasswordPage;
