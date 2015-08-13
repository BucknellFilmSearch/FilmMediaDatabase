#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging in web server environment
import cgitb
cgitb.enable()

__author__ = 'justi_000'

import pyzmail

def sendEmail(content, senderEmailAddress, senderName):
    sender = (u'Justin Eyster', 'justin@filmtvsearch.net')
    recipients = ['jchunter@bucknell.edu', 'jde012@bucknell.edu', 'dah054@bucknell.edu']
    subject = u'Feedback Report'
    text_content = u'Sender Name: ' + senderName + ', Sender Email Address: ' + senderEmailAddress + ', Content: ' + \
                   content
    prefered_encoding = 'iso-8859-1'
    text_encoding = 'iso-8859-1'

    payload, mail_from, rcpt_to, msg_id=pyzmail.compose_mail(\
            sender, \
            recipients, \
            subject, \
            prefered_encoding, \
            (text_content, text_encoding), \
            html=None)

    smtp_host = 'mail.filmtvsearch.net'
    smtp_port = 26
    smtp_mode = 'tls'
    smtp_login = 'justin@filmtvsearch.net'
    smtp_password = 'BucknellDH17837!'

    ret=pyzmail.send_mail(payload, mail_from, rcpt_to, smtp_host, \
            smtp_port=smtp_port, smtp_mode=smtp_mode, \
            smtp_login=smtp_login, smtp_password=smtp_password)