const forgetPasswordEmailTemplate = ({ name, otp }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password. Use the OTP below to reset it:
        </p>
        <div style="font-size: 24px; font-weight: bold; padding: 15px; background: #f4f4f4; color: #333; text-align: center; border-radius: 4px;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #777; margin-top: 20px;">
          If you didn't request this, you can safely ignore this email. This OTP will expire in 10 minutes.
        </p>
        <p style="font-size: 14px; color: #999;">Thanks, <br/>Your App Team</p>
      </div>
    `;
  };
  

export default forgetPasswordEmailTemplate