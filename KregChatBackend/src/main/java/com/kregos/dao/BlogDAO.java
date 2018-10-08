package com.kregos.dao;

import java.util.List;

import com.kregos.model.Blog;

public interface BlogDAO 
{
	public void create(Blog blog);
	 
    public void update(Blog blog);
 
    public void delete(Blog blog);
 
    public void deleteAll();
 
    public Blog find(Blog blog);
 
    public List<Blog> findAll();

}
