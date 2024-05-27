package modelApi;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.ChiTietGioHang;
import model.ChuongTrinhGiamGia;

public class ChuongTrinhGiamGiaSerializer implements JsonSerializer<ChuongTrinhGiamGia>{
	
	public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	@Override
	public JsonElement serialize(ChuongTrinhGiamGia src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty("id", src.getId());
		
		final JsonPrimitive start = new JsonPrimitive(sdf.format(src.getNgayBatDau()));
		final JsonPrimitive end = new JsonPrimitive(sdf.format(src.getNgayKetThuc()));
		
		jsonObject.add("start", start);
		jsonObject.add("end", end);
		
		jsonObject.addProperty("mucGiam", src.getMucGiam());
		jsonObject.addProperty("name", src.getName());
		
		return jsonObject;
	}

}