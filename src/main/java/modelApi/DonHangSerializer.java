package modelApi;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.DonHang;

public class DonHangSerializer implements JsonSerializer<DonHang>{

	public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	@Override
	public JsonElement serialize(DonHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		
//		final JsonObject jsonKhachHang = new JsonObject();
//		jsonKhachHang.addProperty("idKhachHang", src.getKhachHang().getId());
//		jsonKhachHang.addProperty("tenKhachHang", src.getKhachHang().getTen());
		
//		jsonObject.add("khachHang", jsonKhachHang);
		
		jsonObject.addProperty("tinhTrang", src.getTinhTrang().toString());
		
		final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(src.getThoiGianDatHang()));
        jsonObject.add("thoiGianDatHang", jsonDate);
		
        jsonObject.addProperty("tongTien", src.getTongTien());
        
        jsonObject.addProperty("diaChiGiaoHang", src.getDiaChiGiaoHang());
//        jsonObject.add("listCTDH", context.serialize(src.getListCTDH()));
        return jsonObject;
	}

}
