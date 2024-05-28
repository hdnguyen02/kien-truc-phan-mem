package com.ktpm.sendmail;

public interface IEmailService {
    boolean sendSimpleMail(EmailDetails details);
    boolean sendMailWithAttachment(EmailDetails details);
}
