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

//        final JsonObject jsonSach = new JsonObject();
//		jsonSach.addProperty("idSach", src.getSach().getId());
//		jsonSach.addProperty("tenSach", src.getSach().getTen());
//        jsonObject.add("sach", jsonSach);

        jsonObject.addProperty("soSao", src.getSoSao());
        jsonObject.addProperty("binhLuan", src.getBinhLuan());
        
        jsonObject.addProperty("tenKhachHangDanhGia", src.getCtDonHang().getDonHang().getKhachHang().getTen());

//        final JsonObject jsonKhachHang = new JsonObject();
//		jsonKhachHang.addProperty("idKhachHang", src.getKhachHang().getId());
//		jsonKhachHang.addProperty("tenKhachHang", src.getKhachHang().getTen());
//        jsonObject.add("khachHang", jsonKhachHang);

        final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(src.getThoiGian()));
        jsonObject.add("thoiGian", jsonDate);
        return jsonObject;
    }
}