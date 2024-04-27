package util;

import java.util.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class Email {
	static final String from = "testmail131004@gmail.com";
	static final String password = "ivrsnlcgwkiembcw";
	public Email() {
		
	}
	public static void abc() {
		
	}
	public static boolean sendEmail(String to,String tieuDe,String noiDung) {
		System.out.println(to + " " + tieuDe + " " + noiDung);
		Properties  props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com"); // SMTP HOST
		props.put("mail.smtp.port", "587"); // TLS 587 SSL 465
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		
		Authenticator auth = new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				// TODO Auto-generated method stub
				return new PasswordAuthentication(from, password);
			}
			
		};
		
		Session session = Session.getInstance(props,auth);
		
		MimeMessage msg = new MimeMessage(session);
		try {
			msg.addHeader("Content-type", "text/HTML; charset=UTF8");
			
			msg.setFrom(from);
			
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to,false));
			
			msg.setSubject(tieuDe);
			
			msg.setSentDate(new Date());
			
		//	msg.setReplyTo(InternetAddress.parse(from,false)) Quy định email nhận phản hồi
			// Nội dung
			msg.setContent(noiDung,"text/HTML; charset=UTF8");
			
			Transport.send(msg);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static void main(String[] args) {
		sendEmail("ngovandanh12345679@gmail.com", System.currentTimeMillis() + "Heheboi", "Đây là phần nội dung!");
 	}
}
