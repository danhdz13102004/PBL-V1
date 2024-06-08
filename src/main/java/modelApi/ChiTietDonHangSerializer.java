package modelApi;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import model.*;
public class ChiTietDonHangSerializer implements JsonSerializer<ChiTietDonHang> 
{
	public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	@Override
	public JsonElement serialize(ChiTietDonHang src, Type typeOfSrc, JsonSerializationContext context) {
		final JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		
		final JsonObject jsonDonHang = new JsonObject();
		jsonDonHang.addProperty("idDonHang", src.getDonHang().getId());
		jsonDonHang.addProperty("thoiGianDatHang", sdf.format(src.getDonHang().getThoiGianDatHang()));
		jsonObject.add("donHang", jsonDonHang);
		
		final JsonObject jsonSach = new JsonObject();
		jsonSach.addProperty("idSach", src.getSach().getId());
		jsonSach.addProperty("tenSach", src.getSach().getTen());
		jsonSach.addProperty("giaBan", src.getSach().getGiaBan());
		jsonSach.addProperty("soSaoTB", src.getSach().getSoSaoTB());
		jsonSach.addProperty("urlImage", src.getSach().getUrlImage());
		jsonObject.add("sach", jsonSach);
		
//		final JsonObject jsonDanhGia = new JsonObject();
//		jsonDanhGia.addProperty("soSao", src.getDanhGia().getSoSao());
//		jsonDanhGia.addProperty("binhLuan", src.getDanhGia().getBinhLuan());
		jsonObject.add("danhGia", context.serialize(src.getDanhGia()));
		
		
		jsonObject.addProperty("giaBan", src.getGiaBan());
		jsonObject.addProperty("soLuong", src.getSoLuong());
		jsonObject.addProperty("status", src.isStatus());
		return jsonObject;
	}
}