'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmail } from '../email/sendEmail'
import { VerifyEmailEmailTemplate } from '../../../../providers/email-templates/verify-email-email'


export const signUp = async (name: string, email: string, password: string,
     contactNo: string, address: string, tenantImage: string) => {
    const user = await prisma.tenant.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return 'User with that email already exists.';
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const createdUser = await prisma.tenant.create({
        data: {
            name,
            email,
            passwordHash,
            contactNo,
            address,
            tenantImage
        },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await prisma.tenant.update({
        where: {
            id: createdUser.id
        },
        data: {
            emailVerificationToken: emailVerificationToken,
        }
    })

    await sendEmail({
        from: 'RD Realty Development Corporation <no-reply@rdhardware.net>',
        to: [email],
        subject: 'Verify your email address',
        react: VerifyEmailEmailTemplate({email, emailVerificationToken}) as React.ReactElement
    });

    return "Successfully created new user!";
};
