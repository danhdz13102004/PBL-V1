package modelApi;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.DiaChiGiaoHang;

public class DiaChiGiaoHangSerializer implements JsonSerializer<DiaChiGiaoHang>  {

    @Override
    public JsonElement serialize(DiaChiGiaoHang src, Type typeOfSrc, JsonSerializationContext context) {
        final JsonObject jsonObject = new JsonObject();
		
		jsonObject.addProperty("id",src.getId());
		jsonObject.addProperty("diaChi", src.getDiaChi());
		jsonObject.addProperty("tenNguoiNhan", src.getTenNguoiNhan());
		jsonObject.addProperty("soDienThoai", src.getSoDienThoai());
		return jsonObject;
    }
    
}