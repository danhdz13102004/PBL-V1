package modelApi;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;

import com.google.gson.*;

import model.Sach;

public class SachSerializer implements JsonSerializer<Sach> {
 
    public static final SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    @Override
    public JsonElement serialize(Sach sach, Type typeOfSrc, JsonSerializationContext context) {
        final JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", sach.getId());
        jsonObject.addProperty("ten", sach.getTen());
        jsonObject.addProperty("soLuongNhap", sach.getSoLuongNhap());
        jsonObject.addProperty("soLuongBan", sach.getSoLuongBan());
        jsonObject.addProperty("moTa", sach.getMoTa());
        jsonObject.addProperty("soSaoTB", sach.getSoSaoTB());
        jsonObject.addProperty("soTrang", sach.getSoTrang());
        jsonObject.addProperty("lanXuatBan", sach.getLanXuatBan());
        jsonObject.addProperty("phanTramGiamGia", sach.getPhanTramGiamGia());
        jsonObject.addProperty("urlImage", sach.getUrlImage());
        jsonObject.addProperty("giaBan", sach.getGiaBan());
        jsonObject.addProperty("giaNhap", sach.getGiaNhap());
        // Write custom Date Serializer
        final JsonPrimitive jsonDate = new JsonPrimitive(sdf.format(sach.getNgayThem()));
        jsonObject.add("ngayThem", jsonDate);

        final JsonObject jsonTheLoai = new JsonObject();
        jsonTheLoai.addProperty("idTheLoai", sach.getTheLoai().getId());
        jsonTheLoai.addProperty("tenTheLoai", sach.getTheLoai().getTenTheLoai());
        jsonObject.add("theLoai", jsonTheLoai);
        
        final JsonObject jsonTacGia = new JsonObject();
        jsonTacGia.addProperty("idTacGia", sach.getTacGia().getId());
        jsonTacGia.addProperty("tenTacGia", sach.getTacGia().getTen());
        jsonObject.add("tacGia", jsonTacGia);
        
        final JsonObject jsonNxb = new JsonObject();
        jsonNxb.addProperty("idNxb", sach.getNxb().getId());
        jsonNxb.addProperty("tenTacGia", sach.getNxb().getTenNxb());
        jsonObject.add("nxb", jsonNxb);
        
        final JsonObject jsonCtGiamGia = new JsonObject();
        jsonCtGiamGia.addProperty("idCtGiamGia", sach.getCtGiamGia().getId());
        jsonCtGiamGia.addProperty("tenCtGiamGia", sach.getCtGiamGia().getName());
        jsonCtGiamGia.addProperty("mucGiam", sach.getCtGiamGia().getMucGiam());
        jsonObject.add("ctGiamGia", jsonCtGiamGia);
        
        // Write custom Array Serializer
        //jsonObject.add("listDanhGia",context.serialize(sach.getListDanhGia()));
//        jsonObject.add("listChiTietGioHang", context.serialize(sach.getListChiTietGioHang()));
//        jsonObject.add("listChiTietDonHang", context.serialize(sach.getListChiTietDonHang()));
        jsonObject.addProperty("status", sach.isStatus());
        return jsonObject;
    }
}
