package modelApi;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.DanhGia;

public class DanhGiaSerializer implements JsonSerializer<DanhGia> {
    public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    @Override
    public JsonElement serialize(DanhGia src, Type typeOfSrc, JsonSerializationContext context) {
        // TODO Auto-generated method stub
        final JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		
//		final JsonObject jsonCTDonHang = new JsonObject();
//		jsonCTDonHang.addProperty("idCTDonHang", src.getCtDonHang().getId());
//		jsonObject.add("ChiTietDonHang", jsonCTDonHang);
		
        jsonObject.addProperty("soSao", src.getSoSao());
        jsonObject.addProperty("binhLuan", src.getBinhLuan());

        

        final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(src.getThoiGian()));
        jsonObject.add("thoiGian", jsonDate);
        return jsonObject;
    }
}
