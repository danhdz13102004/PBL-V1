package modelApi;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.ChiTietGioHang;

public class ChiTietGioHangSerializer implements JsonSerializer<ChiTietGioHang>{

	@Override
	public JsonElement serialize(ChiTietGioHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		final JsonObject jsonSach = new JsonObject();
		jsonSach.addProperty("idSach", src.getSach().getId());
		jsonSach.addProperty("tenSach", src.getSach().getTen());
		jsonSach.addProperty("urlImage", src.getSach().getUrlImage());
		jsonSach.addProperty("phamTramGiamGia", src.getSach().getPhanTramGiamGia());
		jsonSach.addProperty("giaBan", src.getSach().getGiaBan());
		jsonObject.add("sach", jsonSach);
		jsonObject.addProperty("status", src.isStatus());;
		jsonObject.addProperty("soLuong", src.getSoLuong());;
		return jsonObject;
	}

}
