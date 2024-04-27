package util;

import java.security.MessageDigest;
import java.util.Base64;

public class MaHoa {
    public static String Encode(String str) {
        String salt = "adsdkwms@3#sddd;>AsdSADaCCsdsa<he,o2.qesaaaedkfr.>.<-+-";
        str += salt;
        String result = null;
        try {
            byte[] dataBytes = str.getBytes("UTF-8");
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] mdBytes = md.digest(dataBytes);
            result = Base64.getEncoder().encodeToString(mdBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(Encode("123"));
    }
}
