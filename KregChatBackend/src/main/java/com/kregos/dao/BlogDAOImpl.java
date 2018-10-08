package com.kregos.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.kregos.model.Blog;

@Repository("BlogDAO")
@Qualifier("BlogDAO")
@Component
public class BlogDAOImpl implements BlogDAO
{
	@Autowired
    MongoTemplate mongoTemplate;
	
	public BlogDAOImpl() {
		super();
	
		System.out.println("Implementing BlogDAO");
	}
	
final String COLLECTION = "k_blog";
	
	public void create(Blog Blog) {
		// TODO Auto-generated method stub
		 mongoTemplate.insert(Blog);
	}

	public void update(Blog Blog) {
		// TODO Auto-generated method stub
		mongoTemplate.save(Blog);
	}

	public void delete(Blog blog) {
		// TODO Auto-generated method stub
		
		System.out.println( blog.getId() );
		
		Query query = new Query(Criteria.where("_id").is(blog.getId()));
		
		mongoTemplate.remove( query , blog.getClass() );
	}

	public void deleteAll() {
		// TODO Auto-generated method stub
		 mongoTemplate.remove(new Query(), COLLECTION);
	}

	public Blog find(Blog blog) {
		Query query = new Query(Criteria.where("_id").is(blog.getId()));
        return mongoTemplate.findOne(query, Blog.class, COLLECTION);
	}

	public List<Blog> findAll() {
		// TODO Auto-generated method stub
		return (List <Blog> ) mongoTemplate.findAll(Blog.class);
	}


}
