package modelApi;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.TheLoai;

public class TheLoaiSerializer implements JsonSerializer<TheLoai> {

	@Override
	public JsonElement serialize(TheLoai theLoai, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty("id",theLoai.getId());
		jsonObject.addProperty("ten", theLoai.getTenTheLoai());
		
		return jsonObject;
	}
	
}
