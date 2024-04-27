package model;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

public class SachAPI {
	private String id = "1";
	
	public SachAPI() {
		
	}
	public SachAPI(Sach s) {
		
	}
}
