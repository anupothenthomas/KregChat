package com.kregos.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kregos.model.Forum;

@Repository
public interface ForumDAO 
{
	public void create(Forum forum);
	 
    public void update(Forum forum);
 
    public void delete(Forum forum);
 
    public void deleteAll();
 
    public Forum find(Forum forum);
 
    public List<Forum> findAll();

}