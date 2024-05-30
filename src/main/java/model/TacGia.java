package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
public class TacGia {
	
	@Id
	@GeneratedValue(generator = "my-generator")
    @GenericGenerator(name = "my-generator", 
      parameters =@Parameter(name = "prefix", value = "TG"), 
      strategy = "model.MyIDGenerator")
	@Column(name = "Id")
	String id;
	
	@Column(name = "Ten_tac_gia")
	String ten;
	
	@Column(name = "Trang_thai")
	Boolean status = false;

	@OneToMany(mappedBy = "tacGia", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	List<Sach> listSach;
	
	public TacGia() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getTen() {
		return ten;
	}


	public void setTen(String ten) {
		this.ten = ten;
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
		return "TacGia [id=" + id + ", ten=" + ten + "]";
	}
	
	
}
