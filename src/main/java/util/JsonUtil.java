package util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import model.TheLoai;
import modelApi.*;

public class JsonUtil {
    private static JsonUtil instance;
    private GsonBuilder gb;
    private Gson gson;
    public static JsonUtil getInstance()
    {
        if (instance == null)
        {
            instance = new JsonUtil();
        }
        return instance;
    }
    private JsonUtil()
    {
        gb = new GsonBuilder();
        gb.registerTypeAdapter(model.Sach.class, new SachSerializer());
        gb.registerTypeAdapter(model.TheLoai.class, new TheLoaiSerializer());
        gb.registerTypeAdapter(model.DonHang.class, new DonHangSerializer());
        gb.registerTypeAdapter(model.ChiTietGioHang.class, new ChiTietGioHangSerializer());
        gb.registerTypeAdapter(model.ChiTietDonHang.class, new ChiTietDonHangSerializer());
        gb.registerTypeAdapter(model.DiaChiGiaoHang.class, new DiaChiGiaoHangSerializer());
        gb.registerTypeAdapter(model.DanhGia.class, new DanhGiaSerializer());
        
        gson = gb.create();
    }
    public String jsonToString (Object ob)
    {
    	return gson.toJson(ob);
    }
    public <T> T toModel(Class<T> c, String json)
    {
        return new Gson().fromJson(json, c);
    }
}
