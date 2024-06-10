package modelApi;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.gson.*;

import model.Sach;

public class SachSerializer implements JsonSerializer<Sach> {
 
    public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    @Override
    public JsonElement serialize(Sach sach, Type typeOfSrc, JsonSerializationContext context) {
        final JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", sach.getId());
        jsonObject.addProperty("ten", sach.getTen());
        jsonObject.addProperty("soLuongNhap", sach.getSoLuongNhap());
        jsonObject.addProperty("soLuongBan", sach.getSoLuongBan());
        jsonObject.addProperty("moTa", sach.getMoTa());
        jsonObject.addProperty("soSaoTB", sach.getSoSaoTB());
        jsonObject.addProperty("soTrang", sach.getSoTrang());
        jsonObject.addProperty("lanXuatBan", sach.getLanXuatBan());
        jsonObject.addProperty("urlImage", sach.getUrlImage());
        jsonObject.addProperty("giaBan", sach.getGiaBan());
        jsonObject.addProperty("giaNhap", sach.getGiaNhap());
        // Write custom Date Serializer
        final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(sach.getNgayThem()));
        jsonObject.add("ngayThem", jsonDate);

        final JsonObject jsonTheLoai = new JsonObject();
        jsonTheLoai.addProperty("idTheLoai", sach.getTheLoai().getId());
        jsonTheLoai.addProperty("tenTheLoai", sach.getTheLoai().getTenTheLoai());
        jsonObject.add("theLoai", jsonTheLoai);
        
        final JsonObject jsonTacGia = new JsonObject();
        jsonTacGia.addProperty("idTacGia", sach.getTacGia().getId());
        jsonTacGia.addProperty("tenTacGia", sach.getTacGia().getTen());
        jsonObject.add("tacGia", jsonTacGia);
        
        final JsonObject jsonNxb = new JsonObject();
        jsonNxb.addProperty("idNxb", sach.getNxb().getId());
        jsonNxb.addProperty("tenTacGia", sach.getNxb().getTenNxb());
        jsonObject.add("nxb", jsonNxb);
        

        if(sach.getCtGiamGia().getId().equals("123")) {
        	jsonObject.addProperty("phanTramGiamGia",0);        	
        }
        else {
        	Date t = new Date();
        	Timestamp tm = new Timestamp(t.getTime());
        	System.out.println(sach.getCtGiamGia().getNgayBatDau());
        	System.out.println(t.compareTo(sach.getCtGiamGia().getNgayBatDau()));
        	
        	System.out.println(sach.getCtGiamGia().getNgayKetThuc());
        	System.out.println(t.compareTo(sach.getCtGiamGia().getNgayKetThuc()));
        	System.out.println(sach.getCtGiamGia().getMucGiam());
        	if( (t.compareTo(sach.getCtGiamGia().getNgayBatDau()) >= 0) && (t.compareTo(sach.getCtGiamGia().getNgayKetThuc()) <=0) ) {
        		jsonObject.addProperty("phanTramGiamGia",sach.getCtGiamGia().getMucGiam());  
        	}
        	else {
        		jsonObject.addProperty("phanTramGiamGia",0); 
        	}
        	
        }
 
        return jsonObject;
    }
}
