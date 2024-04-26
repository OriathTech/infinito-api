import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
        authMethod: 'LOGIN'
    }
});

export const sendConfirmationMail = async (token, email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Infinito - Confirmar Email",
            html: `
                <p>Haz clic en el siguiente enlace para Confirmar el Regitro:</p>
                <a href="${process.env.PUBLIC_FRONT_URL}/confirmation?token=${token}">Confirmar Email</a>
            `,
            attachments: []
        })

    } catch (error) {
        throw error;
    }
}

export const sendResetMail = async (token, email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Infinito - Recuperación de contraseña",
            html: `
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${process.env.PUBLIC_FRONT_URL}/reset?token=${token}">Restablecer contraseña</a>
            `,
            attachments: []
        })

    } catch (error) {
        throw error;
    }
}