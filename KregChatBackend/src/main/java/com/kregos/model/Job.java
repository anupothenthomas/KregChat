package com.kregos.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "k_jobs")
public class Job 
{
	private String id;
	private String ownerId;
	private String description;
	private String title;
	private String date;
	private boolean approved = false;

	
	public boolean isApproved() {
		return approved;
	}
	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	private List<String> applicants = new ArrayList<String>();
	
	public List<String> getApplicants() {
		return applicants;
	}
	public void setApplicants(List<String> applicants) {
		this.applicants = applicants;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public Job() {
		super();
	}
}


