package com.kregos.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.kregos.model.Users;

@Repository("UsersDAO")
@Qualifier("UsersDAO")
@Component
public class UsersDAOImpl implements UsersDAO {
	@Autowired
	MongoTemplate mongoTemplate;

	public UsersDAOImpl() {
		super();
		System.out.println("Implementing UsersDAO...");
	}

	public final String COLLECTION = "k_users";

	public void create(Users users) {
		mongoTemplate.insert(users);
	}

	public void update(Users users) {
		mongoTemplate.save(users);
	}

	public void delete(Users users) 
	{
		System.out.println(users.getId());
		Query query = new Query(Criteria.where("_id").is(users.getId()));
		mongoTemplate.remove(query, users.getClass());
	}

	public void deleteAll() {
		mongoTemplate.remove(new Query(), COLLECTION);
	}

	public Users find(Users users) {
		Query query = new Query(Criteria.where("_id").is(users.getId()));
		
		Users u = mongoTemplate.findOne(query, Users.class, COLLECTION);
		
		if( u == null ) {
			query = new Query(Criteria.where("email").is(users.getEmail()));
			
		    return mongoTemplate.findOne(query, Users.class, COLLECTION);
		}
				
		return u;
	}

	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return (List<Users>) mongoTemplate.findAll(Users.class);
	}

}
