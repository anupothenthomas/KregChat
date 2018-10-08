package com.kregos.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kregos.model.Job;

@Repository
public interface JobDAO 
{
	public void create(Job job);
	public void update(Job job);
	public void delete(Job job);
	public void deleteAll();
	public Job find(Job job);
	public List<Job> findAll();
}
