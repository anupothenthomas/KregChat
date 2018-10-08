package com.kregos.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "k_forum")
public class Forum {

	private String id;
	private String title;
	private String category;
	private String description;
	private String date;
	private String ownerId;

	private boolean approved = false;

	private List<ForumComment> comments = new ArrayList<ForumComment>();

	public List<ForumComment> getComments() {
		return comments;
	}

	public void setComments(List<ForumComment> comments) {
		this.comments = comments;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Forum() {
		super();
	}
}
