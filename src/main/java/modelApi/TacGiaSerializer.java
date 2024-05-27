package modelApi;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.TacGia;
import model.TheLoai;

public class TacGiaSerializer implements JsonSerializer<TacGia> {
	@Override
	public JsonElement serialize(TacGia tacGia, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty("id",tacGia.getId());
		jsonObject.addProperty("ten", tacGia.getTen());
		
		return jsonObject;
	}
}
