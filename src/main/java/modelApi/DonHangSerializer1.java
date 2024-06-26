package modelApi;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.ChiTietDonHang;
import model.DonHang;

public class DonHangSerializer1 implements JsonSerializer<DonHang>{

	public static final SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
	@Override
	public JsonElement serialize(DonHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		
//		final JsonObject jsonKhachHang = new JsonObject();
//		jsonKhachHang.addProperty("idKhachHang", src.getKhachHang().getId());
//		jsonKhachHang.addProperty("tenKhachHang", src.getKhachHang().getTen());
		
//		jsonObject.add("khachHang", jsonKhachHang);
		
		jsonObject.addProperty("tinhTrang", src.getTinhTrang().getMessage());
		
		final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(src.getThoiGianDatHang()));
        jsonObject.add("thoiGianDatHang", jsonDate);
		
        jsonObject.addProperty("tongTien", src.getTongTien());
        
        jsonObject.addProperty("diaChiGiaoHang", src.getDiaChiGiaoHang());
        
        
        JsonObject listChiTietDonHang= new JsonObject();
        JsonObject ctdh;  
        int cnt = 0;
//        for(ChiTietDonHang c : src.getListCTDH()) {
//        	cnt++;
//        	ctdh = new JsonObject();
//        	ctdh.addProperty("tenSach", c.getSach().getTen());
//        	ctdh.addProperty("soLuong", c.getSoLuong());  
//        	ctdh.addProperty("urlImage", c.getSach().getUrlImage());
//        	listChiTietDonHang.add("ChiTietDonHang" + cnt, ctdh);
//        }
        System.out.println(cnt);
//        jsonObject.add("listChiTietDonHang", listChiTietDonHang);
        jsonObject.addProperty("soDienThoai", src.getSdtNguoiNhan());
        jsonObject.addProperty("tenNguoiNhan", src.getTenNguoiNhan());
        jsonObject.addProperty("trangThai", src.getTinhTrang().getMessage());
//        jsonObject.add("listCTDH", context.serialize(src.getListCTDH()));
        return jsonObject;
	}

}
