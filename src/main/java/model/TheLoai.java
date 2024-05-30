package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
public class TheLoai {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "TL"), 
      strategy = "model.MyIDGenerator")
	@Column(name ="Id")
	String id;
	
	@Column(name = "Ten_the_loai")
	String tenTheLoai;
	
	@Column(name = "Trang_thai")
	Boolean status = false;

	@OneToMany(mappedBy = "theLoai", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	List<Sach> listSach;
	
	public TheLoai() {
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTenTheLoai() {
		return tenTheLoai;
	}

	public void setTenTheLoai(String tenTheLoai) {
		this.tenTheLoai = tenTheLoai;
	}

	public Boolean isStatus()
    {
        return this.status;
    }

    public void setStatus(Boolean status)
    {
        this.status = status;
    }

	@Override
	public String toString() {
		return "TheLoai [id=" + id + ", tenTheLoai=" + tenTheLoai + "]";
	}
	
	
}
