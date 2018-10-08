package com.kregos.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.kregos.model.Forum;

@Repository("ForumDAO")
@Qualifier("ForumDAO")
@Component
public class ForumDAOImpl implements ForumDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	public ForumDAOImpl() {
		super();
		System.out.println("Implementing ForumDAO");
	}

	final String COLLECTION = "k_forum";

	public void create(Forum forum) {
		// TODO Auto-generated method stub
		mongoTemplate.insert(forum);
	}

	public void update(Forum forum) {
		// TODO Auto-generated method stub
		mongoTemplate.save(forum);
	}

	public void delete(Forum forum) {
		System.out.println(forum.getId());
		Query query = new Query(Criteria.where("_id").is(forum.getId()));
		mongoTemplate.remove(query, forum.getClass());

	}

	public void deleteAll() {
		// TODO Auto-generated method stub
		mongoTemplate.remove(new Query(), COLLECTION);
	}

	public Forum find(Forum forum) {
		Query query = new Query(Criteria.where("_id").is(forum.getId()));
		return mongoTemplate.findOne(query, Forum.class, COLLECTION);
	}

	public List<Forum> findAll() {
		// TODO Auto-generated method stub
		return (List<Forum>) mongoTemplate.findAll(Forum.class);
	}
}
