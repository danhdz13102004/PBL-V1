package model;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
@Entity
public class DiaChiGiaoHang {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "AD"), 
      strategy = "model.MyIDGenerator")
	@Column(name="Id")
	private String id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Id_khach_hang")	
	private User khachHang;
	
	@Column(name = "Dia_chi")
	private String diaChi;
	
	@Column(name = "Trang_thai")
	boolean status = false;

	public DiaChiGiaoHang()
	{
		
	}
	
	public String getId()
	{
		return this.id;
	}
	
	public void setId(String id)
	{
		this.id=id;
	}
	public User getKhachHang()
	{
		return this.khachHang;
	}
	public void setKhachHang(User khachHang)
	{
		this.khachHang = khachHang;
	}
	
	public String getDiaChi()
	{
		return this.diaChi;
	}
	
	public void setDiaChi(String diaChi)
	{
		this.diaChi = diaChi;
	}

	public boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(boolean status)
    {
        this.status = status;
    }
}
