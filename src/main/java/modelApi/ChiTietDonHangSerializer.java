package modelApi;
import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.*;
public class ChiTietDonHangSerializer implements JsonSerializer<ChiTietDonHang> 
{

	@Override
	public JsonElement serialize(ChiTietDonHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		
		final JsonObject jsonDonHang = new JsonObject();
		jsonDonHang.addProperty("idDonHang", src.getDonHang().getId());
		
		jsonObject.add("khachHang", jsonDonHang);
		
		final JsonObject jsonSach = new JsonObject();
		jsonSach.addProperty("idSach", src.getSach().getId());
		jsonSach.addProperty("tenSach", src.getSach().getTen());
		jsonSach.addProperty("urlImage", src.getSach().getUrlImage());
		jsonObject.add("sach", jsonSach);
		
		jsonObject.addProperty("giaBan", src.getGiaBan());
		jsonObject.addProperty("soLuong", src.getSoLuong());
		jsonObject.addProperty("thanhTien", src.getThanhTien());
		return jsonObject;
	}
}