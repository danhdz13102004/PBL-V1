package util;

import com.google.gson.*;
import java.util.*;
import java.io.*;
import javax.servlet.http.*;;
public class HttpUtil {
    private static HttpUtil instance;
    public static HttpUtil getInstance()
    {
        if (instance == null)
        {
            instance = new HttpUtil();
        }
        return instance;
    }
    
    public String jsonStringOf(BufferedReader br)
    {
        StringBuilder sbuilder = new StringBuilder();
        String line;
        try {
            while ((line = br.readLine())!=null) {
                sbuilder.append(line);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return sbuilder.toString();
    }

    public void writeToResp(HttpServletResponse resp, String data) throws IOException
    {
        PrintWriter out = resp.getWriter();
        out.print(data);
        out.flush();
    }
}
