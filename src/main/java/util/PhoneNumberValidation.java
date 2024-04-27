package util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneNumberValidation {
    public static boolean isPhoneNumberValid(String phoneNumber) {
    	if(phoneNumber.length() == 10) {
    		for(char c : phoneNumber.toCharArray()) {
    			if(!Character.isDigit(c)) return false;
    		}
    		return true;
    	}
    	else if(phoneNumber.length() == 12) {
    		if(phoneNumber.charAt(0) != '+') return false;
    		for(int i = 1; i< 12 ;i++) {
    			if(!Character.isDigit(phoneNumber.charAt(i))) return false;
    		}
    		return true;
    	}
    	
    	return false;
    }

    public static void main(String[] args) {
       
    }
}
