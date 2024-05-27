package modelApi;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.NhaXuatBan;
import model.TheLoai;

public class NhaXuatBanSerializer implements JsonSerializer<NhaXuatBan> {
	@Override
	public JsonElement serialize(NhaXuatBan nhaXuatBan, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty("id",nhaXuatBan.getId());
		jsonObject.addProperty("ten", nhaXuatBan.getTenNxb());
		
		return jsonObject;
	}
}
