package modelApi;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.Date;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.ChiTietGioHang;
import model.Sach;

public class ChiTietGioHangSerializer implements JsonSerializer<ChiTietGioHang>{

	@Override
	public JsonElement serialize(ChiTietGioHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		final JsonObject jsonSach = new JsonObject();
		jsonSach.addProperty("idSach", src.getSach().getId());
		jsonSach.addProperty("tenSach", src.getSach().getTen());
		jsonSach.addProperty("urlImage", src.getSach().getUrlImage());
		Sach sach = src.getSach();
		if(sach.getCtGiamGia().getId().equals("123")) {
			jsonSach.addProperty("phanTramGiamGia",0);        	
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
        		jsonSach.addProperty("phanTramGiamGia",sach.getCtGiamGia().getMucGiam());  
        	}
        	else {
        		jsonSach.addProperty("phanTramGiamGia",0); 
        	}
        }
//		jsonSach.addProperty("phamTramGiamGia", src.getSach().getPhanTramGiamGia());
		jsonSach.addProperty("giaBan", src.getSach().getGiaBan());
		jsonObject.add("sach", jsonSach);
		jsonObject.addProperty("status", src.isStatus());;
		jsonObject.addProperty("soLuong", src.getSoLuong());;
		return jsonObject;
	}

}
